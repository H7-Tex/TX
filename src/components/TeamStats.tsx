'use client';
import { TrendingUp, Users, Trophy, Target } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  color: string;
}

function AnimatedStat({ icon, label, value, suffix = '', color }: StatProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-black p-6 rounded border border-green-900 hover:border-green-500 transition-all duration-300">
      <div className={`flex items-center gap-3 mb-3 ${color}`}>
        {icon}
        <span className="text-sm text-gray-400 font-mono">{label}</span>
      </div>
      <div className="text-3xl font-bold font-mono text-white">
        {displayValue.toLocaleString()}
        <span className="text-green-400">{suffix}</span>
      </div>
    </div>
  );
}

export default function TeamStats() {
  return (
    <section className="mb-12 md:mb-20">
      <h2 className="text-2xl font-mono mb-8 text-white text-center flex items-center justify-center gap-2">
        <TrendingUp className="w-6 h-6 text-green-400" />
        Team Statistics
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedStat
          icon={<Trophy className="w-6 h-6" />}
          label="CTFs Participated"
          value={400}
          suffix="+"
          color="text-yellow-400"
        />
        
        <AnimatedStat
          icon={<Target className="w-6 h-6" />}
          label="India Rank"
          value={7}
          suffix=""
          color="text-green-400"
        />
        
        <AnimatedStat
          icon={<Users className="w-6 h-6" />}
          label="Active Members"
          value={9}
          suffix=""
          color="text-blue-400"
        />
        
        <AnimatedStat
          icon={<TrendingUp className="w-6 h-6" />}
          label="Days Active"
          value={Math.floor((Date.now() - new Date('2024-02-01').getTime()) / (1000 * 60 * 60 * 24))}
          suffix=""
          color="text-purple-400"
        />
      </div>
    </section>
  );
}
