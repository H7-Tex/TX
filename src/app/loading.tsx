'use client';
import { Terminal } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-green-500 flex items-center justify-center">
      <div className="text-center">
        <Terminal size={64} className="mx-auto mb-4 animate-pulse" />
        <div className="font-mono">
          <p className="text-xl mb-2">Loading H7Tex...</p>
          <div className="flex justify-center gap-1">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
