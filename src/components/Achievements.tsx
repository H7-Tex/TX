// components/Achievements.tsx
'use client';
import { Trophy, Target, Flag, Medal } from 'lucide-react';
import { JSX, useState } from 'react';

interface Achievement {
  icon: JSX.Element;
  title: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    icon: <Trophy className="w-8 h-8 text-yellow-400" />,
    title: "Peak Rank #4",
    description: "National Rankings on CTFTime"
  },
  {
    icon: <Medal className="w-8 h-8 text-blue-400" />,
    title: "CyberTrail 2024 Winner",
    description: "Secured 1st place, winning 40k INR"
  },
  {
    icon: <Medal className="w-8 h-8 text-blue-400" />,
    title: "VishwaCTF Runner-Up 2024",
    description: "Finished 2nd place, earning 25k INR"
  },
  {
    icon: <Medal className="w-8 h-8 text-purple-400" />,
    title: "Pentathon 2025 2nd Place",
    description: "Runner-up, earning ₹1.5 Lakh INR"
  },
  {
    icon: <Trophy className="w-8 h-8 text-yellow-400" />,
    title: "GenCys 2025 - 1st & 2nd Place",
    description: "Secured both 1st and 2nd place, winning ₹3 Lakh INR"
  },
  {
    icon: <Trophy className="w-8 h-8 text-green-400" />,
    title: "DSCI Hackathon 2025 Runner-Up",
    description: "Achieved 2nd place, earning ₹1.5 Lakh INR"
  },
  {
    icon: <Medal className="w-8 h-8 text-orange-400" />,
    title: "Flag Hunter 2.0 - 2nd Place",
    description: "Runner-up, earning $750 + EWPTX certification"
  },
  {
    icon: <Medal className="w-8 h-8 text-cyan-400" />,
    title: "SANS CTF 2nd Place",
    description: "Secured 2nd place, winning SEC275 certification"
  },
];

export default function Achievements() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12">
      <h2 className="text-2xl font-mono mb-8 text-white text-center">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={`${achievement.title}-${index}`}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className={`bg-gray-900 border-2 p-6 rounded-lg h-full flex flex-col items-center text-center transition-all duration-300 ${
              hoveredIndex === index 
                ? 'border-green-500 scale-105 bg-gray-800' 
                : 'border-gray-800 hover:border-green-700'
            }`}>
              <div className="mb-4">
                {achievement.icon}
              </div>
              <h3 className="text-lg font-mono mb-2">{achievement.title}</h3>
              <p className="text-sm text-gray-400">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}