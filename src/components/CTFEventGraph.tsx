'use client';
import { useState, useMemo, useEffect } from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

// CTFTime API interface
interface CTFTimeResult {
  event_id: number;
  place: number;
  points: number;
  rating_points: number;
  team_id?: number;
  team?: {
    id: number;
  };
}

const TEAM_ID = 281844;
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export default function CTFEventGraph() {
  const [events2024, setEvents2024] = useState<CTFTimeResult[]>([]);
  const [events2025, setEvents2025] = useState<CTFTimeResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<'2024' | '2025' | 'all'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'place' | 'points'>('rating');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Fetch 2024 results
        const url2024 = `https://ctftime.org/api/v1/results/2024/`;
        const response2024 = await fetch(`${CORS_PROXY}${encodeURIComponent(url2024)}`);
        const data2024 = await response2024.json() as CTFTimeResult[];
        const h7tex2024 = data2024.filter((e: CTFTimeResult) => e.team_id === TEAM_ID || e.team?.id === TEAM_ID);
        
        // Fetch 2025 results
        const url2025 = `https://ctftime.org/api/v1/results/2025/`;
        const response2025 = await fetch(`${CORS_PROXY}${encodeURIComponent(url2025)}`);
        const data2025 = await response2025.json() as CTFTimeResult[];
        const h7tex2025 = data2025.filter((e: CTFTimeResult) => e.team_id === TEAM_ID || e.team?.id === TEAM_ID);
        
        setEvents2024(h7tex2024.slice(0, 10)); // Top 10 from 2024
        setEvents2025(h7tex2025.slice(0, 10)); // Top 10 from 2025
      } catch (err) {
        console.error('Failed to fetch CTF results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // Combine and filter events
  const allEvents = useMemo(() => {
    let combined = [];
    if (selectedYear === 'all') {
      combined = [...events2024, ...events2025];
    } else if (selectedYear === '2024') {
      combined = events2024;
    } else {
      combined = events2025;
    }
    return combined;
  }, [events2024, events2025, selectedYear]);

  // Sort events
  const sortedEvents = useMemo(() => {
    return [...allEvents].sort((a, b) => {
      if (sortBy === 'rating') return b.rating_points - a.rating_points;
      if (sortBy === 'place') return a.place - b.place;
      return b.points - a.points;
    });
  }, [allEvents, sortBy]);

  // Calculate max values for scaling
  const maxRating = useMemo(() => 
    Math.max(...allEvents.map(e => e.rating_points), 1), [allEvents]);
  const maxPoints = useMemo(() => 
    Math.max(...allEvents.map(e => e.points), 1), [allEvents]);

  const getPlaceColor = (place: number) => {
    if (place === 1) return 'bg-yellow-400';
    if (place === 2) return 'bg-gray-400';
    if (place === 3) return 'bg-orange-400';
    return 'bg-green-400';
  };

  const getPlaceTextColor = (place: number) => {
    if (place === 1) return 'text-yellow-400';
    if (place === 2) return 'text-gray-400';
    if (place === 3) return 'text-orange-400';
    return 'text-green-400';
  };

  if (loading) {
    return (
      <section className="py-12">
        <h2 className="text-2xl font-mono mb-4 text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-400" />
          Top CTF Performances
        </h2>
        <div className="bg-gray-900 p-6 rounded-lg border border-green-800 animate-pulse">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (allEvents.length === 0) {
    return (
      <section className="py-12">
        <h2 className="text-2xl font-mono mb-4 text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-400" />
          Top CTF Performances
        </h2>
        <div className="bg-gray-900 p-6 rounded-lg border border-green-800">
          <p className="text-gray-400 text-center">No performance data available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-mono mb-4 text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-400" />
          Top CTF Performances ({allEvents.length} events)
        </h2>
        
        {/* Year filter */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={() => setSelectedYear('all')}
            className={`px-4 py-2 rounded font-mono text-sm ${
              selectedYear === 'all' 
                ? 'bg-green-500 text-black' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All Years
          </button>
          <button
            onClick={() => setSelectedYear('2024')}
            className={`px-4 py-2 rounded font-mono text-sm ${
              selectedYear === '2024' 
                ? 'bg-green-500 text-black' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            2024
          </button>
          <button
            onClick={() => setSelectedYear('2025')}
            className={`px-4 py-2 rounded font-mono text-sm ${
              selectedYear === '2025' 
                ? 'bg-green-500 text-black' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            2025
          </button>
        </div>
        
        {/* Sort controls */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSortBy('rating')}
            className={`px-4 py-2 rounded font-mono text-sm ${
              sortBy === 'rating' 
                ? 'bg-green-500 text-black' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Sort by Rating
          </button>
          <button
            onClick={() => setSortBy('place')}
            className={`px-4 py-2 rounded font-mono text-sm ${
              sortBy === 'place' 
                ? 'bg-green-500 text-black' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Sort by Place
          </button>
          <button
            onClick={() => setSortBy('points')}
            className={`px-4 py-2 rounded font-mono text-sm ${
              sortBy === 'points' 
                ? 'bg-green-500 text-black' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Sort by Points
          </button>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-900 p-6 rounded-lg border border-green-800">
        <div className="space-y-4">
          {sortedEvents.map((event, index) => {
            const ratingBarWidth = (event.rating_points / maxRating) * 100;
            const pointsBarWidth = (event.points / maxPoints) * 100;
            
            return (
              <div
                key={`${event.event_id}-${index}`}
                className="bg-black p-4 rounded transition-colors hover:bg-gray-800"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Trophy className={`w-5 h-5 ${getPlaceTextColor(event.place)}`} />
                    <span className="font-mono text-white">Event #{event.event_id}</span>
                  </div>
                  <span className={`font-mono font-bold ${getPlaceTextColor(event.place)}`}>
                    #{event.place}
                  </span>
                </div>
                
                {/* Rating bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Rating Points</span>
                    <span>{event.rating_points.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div
                      className={`${getPlaceColor(event.place)} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${ratingBarWidth}%` }}
                    ></div>
                  </div>
                </div>

                {/* Points bar */}
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Total Points</span>
                    <span>{event.points.toFixed(0)}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div
                      className="bg-blue-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${pointsBarWidth}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
