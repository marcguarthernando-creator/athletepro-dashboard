
import React, { useState } from 'react';
import { analyzeImage, analyzeVideo } from '../services/gemini';

const Lab: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    setFileType(isImage ? 'image' : isVideo ? 'video' : null);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setLoading(true);
      try {
        if (isImage) {
          const analysis = await analyzeImage(base64, "Analyze this athlete's meal/gear. Provide health/performance feedback.");
          setResult(analysis);
        } else if (isVideo) {
          const analysis = await analyzeVideo(base64, "Analyze the athletic form in this video. Provide technical feedback for optimization.");
          setResult(analysis);
        }
      } catch (err) {
        setResult("Error processing file. Please try a smaller file or different format.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">AI Performance Lab</h1>
          <p className="text-text-secondary text-lg font-light">
            Upload your training videos for form analysis or meal photos for nutritional breakdown.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-dark border-2 border-dashed border-surface-border rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-primary transition-all">
            <span className="material-symbols-outlined text-6xl text-primary mb-4">video_library</span>
            <h3 className="text-xl font-bold mb-2">Analyze Form</h3>
            <p className="text-sm text-text-secondary mb-6">Upload a MP4/MOV video of your exercise.</p>
            <input 
              type="file" 
              accept="video/*" 
              id="video-upload" 
              className="hidden" 
              onChange={handleFileUpload}
            />
            <label htmlFor="video-upload" className="bg-primary text-background-dark px-6 py-2 rounded-lg font-bold cursor-pointer hover:bg-primary-hover">
              Select Video
            </label>
          </div>

          <div className="bg-surface-dark border-2 border-dashed border-surface-border rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-primary transition-all">
            <span className="material-symbols-outlined text-6xl text-primary mb-4">document_scanner</span>
            <h3 className="text-xl font-bold mb-2">Analyze Nutrition</h3>
            <p className="text-sm text-text-secondary mb-6">Upload a photo of your meal or supplements.</p>
            <input 
              type="file" 
              accept="image/*" 
              id="image-upload" 
              className="hidden" 
              onChange={handleFileUpload}
            />
            <label htmlFor="image-upload" className="bg-primary text-background-dark px-6 py-2 rounded-lg font-bold cursor-pointer hover:bg-primary-hover">
              Select Image
            </label>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center gap-4 py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-primary font-medium animate-pulse">Gemini is analyzing your data...</p>
          </div>
        )}

        {result && (
          <div className="bg-card-dark border border-surface-border rounded-2xl p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h2 className="text-2xl font-bold">AI Analysis</h2>
            </div>
            <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed">
              {result.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
            </div>
            <button 
              onClick={() => setResult('')}
              className="mt-6 text-sm text-text-secondary hover:text-white"
            >
              Clear Analysis
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Lab;
