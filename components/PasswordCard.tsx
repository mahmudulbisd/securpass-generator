
import React, { useState } from 'react';

interface Options {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

interface PasswordCardProps {
  password: string;
  length: number;
  setLength: (val: number) => void;
  options: Options;
  toggleOption: (key: keyof Options) => void;
  onGenerate: () => void;
  error: string | null;
}

export const PasswordCard: React.FC<PasswordCardProps> = ({
  password,
  length,
  setLength,
  options,
  toggleOption,
  onGenerate,
  error
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const syncLength = (val: string) => {
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setLength(Math.min(Math.max(num, 8), 16));
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
      <h1 className="text-2xl font-bold text-white mb-2 text-center">SecurPass</h1>
      <p className="text-slate-400 text-sm text-center mb-8">Create strong passwords instantly</p>

      {/* Password Display */}
      <div className="relative mb-6">
        <div className="w-full bg-slate-950/80 border border-slate-700 rounded-2xl p-4 pr-16 min-h-[64px] flex items-center break-all shadow-inner">
          <span className="text-xl sm:text-2xl font-mono text-indigo-400 font-semibold tracking-wider">
            {password || '••••••••'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all active:scale-95 group"
          title="Copy to clipboard"
        >
          {copied ? (
            <span className="text-green-400 text-xs font-bold">Copied!</span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          )}
        </button>
      </div>

      {/* Length Selector */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center">
          <label className="text-slate-300 font-medium">Password Length</label>
          <input
            type="number"
            min="8"
            max="16"
            value={length}
            onChange={(e) => syncLength(e.target.value)}
            className="w-16 bg-slate-800 border border-slate-700 rounded-lg py-1 px-2 text-center text-indigo-400 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
        <input
          type="range"
          min="8"
          max="16"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest px-1">
          <span>8 chars</span>
          <span>12 chars</span>
          <span>16 chars</span>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {[
          { id: 'uppercase', label: 'Uppercase', desc: 'A-Z' },
          { id: 'lowercase', label: 'Lowercase', desc: 'a-z' },
          { id: 'numbers', label: 'Numbers', desc: '0-9' },
          { id: 'symbols', label: 'Symbols', desc: '!@#$%' }
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => toggleOption(opt.id as keyof Options)}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
              options[opt.id as keyof Options]
                ? 'bg-indigo-500/10 border-indigo-500/50 text-white'
                : 'bg-slate-800/40 border-slate-700 text-slate-500'
            }`}
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
              options[opt.id as keyof Options] ? 'bg-indigo-500' : 'bg-slate-700'
            }`}>
              {options[opt.id as keyof Options] && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 14.14L8 15.414l-3.707-3.707a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div>
              <div className="text-sm font-semibold">{opt.label}</div>
              <div className="text-[10px] opacity-60">{opt.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center font-medium animate-pulse">
          {error}
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-900/40 transition-all active:scale-[0.98] active:brightness-110 flex items-center justify-center gap-2 group"
      >
        <span>Generate Password</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  );
};
