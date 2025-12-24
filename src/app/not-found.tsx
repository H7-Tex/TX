'use client';
import Link from 'next/link';
import { Terminal, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [glitchText, setGlitchText] = useState('404');

  useEffect(() => {
    const interval = setInterval(() => {
      const chars = ['4', '0', '4', '@', '#', '$', '%'];
      const glitch = Array(3).fill(0).map(() => 
        chars[Math.floor(Math.random() * chars.length)]
      ).join('');
      setGlitchText(glitch);
      
      setTimeout(() => setGlitchText('404'), 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="mb-8">
          <Terminal size={64} className="mx-auto mb-4" />
          <h1 className="text-6xl md:text-8xl font-mono font-bold mb-4">
            {glitchText}
          </h1>
          <h2 className="text-2xl md:text-3xl font-mono mb-2">Page Not Found</h2>
          <p className="text-gray-400 font-mono mb-8">
            The page you&apos;re looking for doesn&apos;t exist in this dimension.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green-500 text-black font-mono py-3 px-6 rounded-lg hover:bg-green-400 transition-colors"
          >
            <Home size={20} />
            Return to Homepage
          </Link>
          
          <div className="font-mono text-sm text-gray-500">
            <p>$ cd /home</p>
            <p className="animate-pulse">_</p>
          </div>
        </div>
      </div>
    </div>
  );
}
