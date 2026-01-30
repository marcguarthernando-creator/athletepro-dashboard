import React, { useState, useRef, useEffect } from 'react';

interface RichTextEditorProps {
    value: string; // HTML string
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string; // Container class
    minHeight?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    placeholder = 'Escriba aquí...',
    className = '',
    minHeight = 'h-32'
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false
    });

    // Sync external value changes to contentEditable
    useEffect(() => {
        if (contentRef.current && contentRef.current.innerHTML !== value) {
            if (!isFocused) {
                contentRef.current.innerHTML = value;
            }
        }
    }, [value, isFocused]);

    const checkFormats = () => {
        if (!isFocused) return;
        setActiveFormats({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline')
        });
    };

    useEffect(() => {
        document.addEventListener('selectionchange', checkFormats);
        return () => document.removeEventListener('selectionchange', checkFormats);
    }, [isFocused]);

    const handleInput = () => {
        if (contentRef.current) {
            onChange(contentRef.current.innerHTML);
        }
    };

    const executeCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        if (contentRef.current) {
            contentRef.current.focus();
            onChange(contentRef.current.innerHTML);
            checkFormats();
        }
    };

    return (
        <div className={`relative overflow-hidden rounded-xl border transition-all ${isFocused ? 'border-primary shadow-lg shadow-primary/10' : 'border-white/5'} ${className}`}>
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-white/5 bg-white/5">
                <ToolbarButton
                    icon="format_bold"
                    onClick={() => executeCommand('bold')}
                    isActive={activeFormats.bold}
                    tooltip="Negrita"
                />
                <ToolbarButton
                    icon="format_italic"
                    onClick={() => executeCommand('italic')}
                    isActive={activeFormats.italic}
                    tooltip="Cursiva"
                />
                <ToolbarButton
                    icon="format_underlined"
                    onClick={() => executeCommand('underline')}
                    isActive={activeFormats.underline}
                    tooltip="Subrayado"
                />
            </div>

            {/* Editor */}
            <div
                ref={contentRef}
                contentEditable
                onInput={handleInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    setIsFocused(false);
                }}
                onKeyUp={checkFormats}
                onMouseUp={checkFormats}
                className={`w-full ${minHeight} p-4 text-sm text-white outline-none bg-[#0a0d10] overflow-y-auto leading-relaxed normal-case`}
                style={{ minHeight: '120px' }} // Fallback
            ></div>

            {/* Placeholder overlay if empty */}
            {!value && !isFocused && (
                <div
                    className="absolute top-[52px] left-4 text-gray-700 text-sm pointer-events-none"
                    onClick={() => contentRef.current?.focus()}
                >
                    {placeholder}
                </div>
            )}
        </div>
    );
};

const ToolbarButton = ({ icon, label, onClick, tooltip, isActive }: { icon?: string, label?: string, onClick: () => void, tooltip: string, isActive?: boolean }) => (
    <button
        type="button"
        onClick={(e) => { e.preventDefault(); onClick(); }}
        title={tooltip}
        className={`p-1.5 rounded-lg transition-colors flex items-center justify-center min-w-[32px] ${isActive
            ? 'bg-blue-500/20 text-blue-400'
            : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
    >
        {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
        {label && <span className="text-xs font-bold">{label}</span>}
    </button>
);

export default RichTextEditor;
