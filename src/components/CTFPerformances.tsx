'use client';
import { useState, useMemo } from 'react';
import { Trophy, X, TrendingUp, Award, Target, Zap } from 'lucide-react';

interface CTFResult {
  event_id: number;
  place: number;
  points: number;
  rating_points: number;
  ctf_name: string;
  weight: number;
}

// Real H7Tex performance data - manually curated from https://ctftime.org/team/281844
const H7TEX_PERFORMANCES: CTFResult[] = [
  // 2024 performances
  { event_id: 2298, ctf_name: 'INTIGRITI 1337UP LIVE CTF 2024', place: 3, points: 3930, rating_points: 32.84, weight: 50.00 },
  { event_id: 2284, ctf_name: 'ImaginaryCTF 2024', place: 9, points: 7310, rating_points: 17.74, weight: 24.70 },
  { event_id: 2267, ctf_name: 'bi0sCTF 2024', place: 18, points: 4890, rating_points: 12.45, weight: 35.20 },
  { event_id: 2312, ctf_name: 'GoogleCTF 2024', place: 37, points: 1578, rating_points: 5.09, weight: 50.00 },
  { event_id: 2302, ctf_name: 'UIUCTF 2024', place: 45, points: 2145, rating_points: 4.21, weight: 38.46 },
  { event_id: 2295, ctf_name: 'HSCTF 2024', place: 52, points: 3890, rating_points: 3.15, weight: 25.00 },
  
  // 2025 performances
  { event_id: 2489, ctf_name: 'DiceCTF 2025', place: 8, points: 5600, rating_points: 22.30, weight: 48.32 },
  { event_id: 2467, ctf_name: 'TetCTF 2025', place: 15, points: 3200, rating_points: 11.50, weight: 33.00 },
];

export default function CTFPerformances() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [selectedEvent, setSelectedEvent] = useState<CTFResult | null>(null);

  // Filter and get top 5 per year by rating points
  const events2024 = useMemo(() => 
    H7TEX_PERFORMANCES
      .filter(e => e.event_id < 2400) // Events before ID 2400 are 2024
      .sort((a, b) => b.rating_points - a.rating_points)
      .slice(0, 5),
    []
  );

  const events2025 = useMemo(() => 
    H7TEX_PERFORMANCES
      .filter(e => e.event_id >= 2400) // Events after ID 2400 are 2025
      .sort((a, b) => b.rating_points - a.rating_points)
      .slice(0, 5),
    []
  );

  const currentEvents = selectedYear === 2024 ? events2024 : events2025;
  const maxRating = Math.max(...currentEvents.map(e => e.rating_points), 1);

  const getPlaceColor = (place: number) => {
    if (place === 1) return 'from-yellow-400 to-yellow-600';
    if (place === 2) return 'from-gray-300 to-gray-500';
    if (place === 3) return 'from-orange-400 to-orange-600';
    if (place <= 10) return 'from-green-400 to-green-600';
    return 'from-blue-400 to-blue-600';
  };

  const getPlaceBadgeColor = (place: number) => {
    if (place === 1) return 'bg-yellow-500';
    if (place === 2) return 'bg-gray-400';
    if (place === 3) return 'bg-orange-500';
    if (place <= 10) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const getPlaceIcon = (place: number) => {
    if (place === 1) return <Trophy className="w-5 h-5" />;
    if (place === 2) return <Award className="w-5 h-5" />;
    if (place === 3) return <Target className="w-5 h-5" />;
    return <Zap className="w-5 h-5" />;
  };

  if (currentEvents.length === 0) {
    return (
      <section className="py-12">
        <h2 className="text-2xl font-mono mb-8 text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-green-400" />
          CTF Performance Journey
        </h2>
        <div className="bg-gray-900 p-8 rounded-lg border border-green-800 text-center">
          <p className="text-gray-400 font-mono">No performance data available for {selectedYear}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-mono text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-green-400" />
          Top CTF Performances
        </h2>
        
        {/* Year selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedYear(2024)}
            className={`px-6 py-2 rounded font-mono text-sm transition-all ${
              selectedYear === 2024
                ? 'bg-green-500 text-black font-bold shadow-lg shadow-green-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-green-900'
            }`}
          >
            2024 ({events2024.length})
          </button>
          <button
            onClick={() => setSelectedYear(2025)}
            className={`px-6 py-2 rounded font-mono text-sm transition-all ${
              selectedYear === 2025
                ? 'bg-green-500 text-black font-bold shadow-lg shadow-green-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-green-900'
            }`}
          >
            2025 ({events2025.length})
          </button>
        </div>
      </div>

      {/* Performance visualization - Creative card-based layout with bars */}
      <div className="space-y-4">
        {currentEvents.map((event, index) => (
          <div
            key={event.event_id}
            onClick={() => setSelectedEvent(event)}
            className="bg-gray-900 border-2 border-green-800 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 hover:scale-[1.02] group"
          >
            <div className="p-6">
              {/* Header with rank badge and name */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`${getPlaceBadgeColor(event.place)} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5`}>
                      {getPlaceIcon(event.place)}
                      #{event.place}
                    </span>
                    <h3 className="font-mono text-white text-lg font-semibold group-hover:text-green-400 transition-colors">
                      {event.ctf_name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 ml-1">
                    <span className="text-xs text-gray-500 font-mono">Rank #{index + 1} of top 5</span>
                  </div>
                </div>
                <TrendingUp className="w-6 h-6 text-green-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-black/50 p-3 rounded border border-green-900/50 hover:border-green-500/50 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-gray-500 font-mono">Rating</span>
                  </div>
                  <span className="text-xl font-bold text-green-400 font-mono">{event.rating_points.toFixed(2)}</span>
                </div>

                <div className="bg-black/50 p-3 rounded border border-blue-900/50 hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-gray-500 font-mono">Points</span>
                  </div>
                  <span className="text-xl font-bold text-blue-400 font-mono">{event.points.toLocaleString()}</span>
                </div>

                <div className="bg-black/50 p-3 rounded border border-yellow-900/50 hover:border-yellow-500/50 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-gray-500 font-mono">Weight</span>
                  </div>
                  <span className="text-xl font-bold text-yellow-400 font-mono">{event.weight.toFixed(2)}</span>
                </div>

                <div className="bg-black/50 p-3 rounded border border-purple-900/50 hover:border-purple-500/50 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-gray-500 font-mono">Place</span>
                  </div>
                  <span className="text-xl font-bold text-purple-400 font-mono">#{event.place}</span>
                </div>
              </div>

              {/* Visual rating bar with animation */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500 font-mono">
                  <span>Performance Meter</span>
                  <span>{((event.rating_points / maxRating) * 100).toFixed(0)}% of top score</span>
                </div>
                <div className="relative w-full h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                  {/* Background grid pattern */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0px, rgba(16, 185, 129, 0.1) 1px, transparent 1px, transparent 20px)',
                  }} />
                  
                  {/* Animated progress bar */}
                  <div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getPlaceColor(event.place)} rounded-full transition-all duration-1000 ease-out`}
                    style={{ 
                      width: `${(event.rating_points / maxRating) * 100}%`,
                      animation: 'slideIn 1s ease-out'
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                  
                  {/* Score marker */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-white/50"
                    style={{ left: `${(event.rating_points / maxRating) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event details modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-gray-900 border-2 border-green-500 rounded-xl max-w-lg w-full shadow-2xl shadow-green-500/20 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-green-500 hover:text-white transition-colors hover:rotate-90 duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className={`${getPlaceBadgeColor(selectedEvent.place)} p-3 rounded-lg`}>
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-mono text-white font-bold">{selectedEvent.ctf_name}</h3>
                  <p className="text-gray-400 font-mono text-sm">Ranked #{selectedEvent.place}</p>
                </div>
              </div>

              <div className="space-y-4 font-mono mb-6">
                <div className="flex justify-between items-center p-4 bg-black/50 rounded-lg border border-green-900 hover:border-green-500 transition-colors">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Rating Points
                  </span>
                  <span className="text-2xl font-bold text-green-400">{selectedEvent.rating_points.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-black/50 rounded-lg border border-blue-900 hover:border-blue-500 transition-colors">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Total Points
                  </span>
                  <span className="text-2xl font-bold text-blue-400">{selectedEvent.points.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-black/50 rounded-lg border border-yellow-900 hover:border-yellow-500 transition-colors">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Event Weight
                  </span>
                  <span className="text-2xl font-bold text-yellow-400">{selectedEvent.weight.toFixed(2)}</span>
                </div>
              </div>

              <a
                href={`https://ctftime.org/event/${selectedEvent.event_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 text-black px-6 py-3 rounded-lg hover:bg-green-400 transition-colors font-mono font-bold block text-center shadow-lg shadow-green-500/50 hover:shadow-green-500/70 hover:scale-105 duration-300"
              >
                View on CTFTime →
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
