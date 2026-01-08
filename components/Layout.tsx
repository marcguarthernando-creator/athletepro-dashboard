
import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen w-full bg-background-dark text-white overflow-hidden font-display">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-surface-border bg-background-dark z-20">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsSidebarOpen(true)} className="p-1 -ml-1 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-primary block">menu</span>
            </button>
            <img src="/healthtrack-logo.png" alt="Health Track" className="h-8 w-auto object-contain" />
          </div>
          <div className="size-8 rounded-full bg-surface-border overflow-hidden">
            <img className="w-full h-full object-cover" src="https://picsum.photos/seed/user/100/100" />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
