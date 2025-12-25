"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { TrendingUp, Award, Target, Calendar } from 'lucide-react';

const TEAM_ID = 281844;

// Try multiple CORS proxies
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest=',
];

// Fallback data in case API fails
const FALLBACK_DATA_2024 = [
  { event_id: '2298', title: 'INTIGRITI 1337UP LIVE CTF 2024', place: 3, points: '3930', time: 1720000000 },
  { event_id: '2284', title: 'ImaginaryCTF 2024', place: 9, points: '7310', time: 1721000000 },
  { event_id: '2267', title: 'bi0sCTF 2024', place: 18, points: '4890', time: 1719000000 },
];

const FALLBACK_DATA_2025 = [
  { event_id: '2929', title: 'VishwaCTF 2025', place: 2, points: '12500', time: 1735000000 },
  { event_id: '2945', title: 'ATC Winter Vibes Community CTF', place: 3, points: '9800', time: 1736000000 },
  { event_id: '2958', title: 'CRACCON 2025', place: 3, points: '8900', time: 1737000000 },
];

interface EventResult {
  event_id: string;
  title: string;
  place: number;
  points: string;
  time: number;
  rating_points?: number;
  organized?: boolean;
}

interface ScoreData {
  team_id: number;
  place: number;
  points: string;
  rating_points?: number; // Add rating points
}

interface EventData {
  title: string;
  scores: ScoreData[];
  time: number;
}

interface APIResponse {
  [eventId: string]: EventData;
}

export default function CTFVisualChart() {
  const [allResults, setAllResults] = useState<{[year: string]: EventResult[]}>({});
  const [loading, setLoading] = useState(true);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        console.log('[CTFVisualChart] Loading data...');
        
        // FIRST: Try cached build-time data (fast, no CORS issues!)
        try {
          const cachedResponse = await fetch('/ctftime-data.json');
          if (cachedResponse.ok) {
            const cached = await cachedResponse.json();
            console.log('[CTFVisualChart] ✓ Using cached data from:', cached.lastUpdated);
            
            // Auto-detect years from cached data
            const years = Object.keys(cached.results).map(Number).sort((a, b) => b - a);
            setAvailableYears(years);
            setAllResults(cached.results);
            setSelectedYear(years[0] || new Date().getFullYear()); // Most recent year
            
            setLoading(false);
            return; // Done!
          }
        } catch (cacheErr) {
          console.log('[CTFVisualChart] No cached data found');
        }
        
        // FALLBACK: Try live API with CORS proxies (slow, unreliable)
        console.log('[CTFVisualChart] Trying live API...');
        let data2024: APIResponse | null = null;
        let data2025: APIResponse | null = null;
        
        for (const proxy of CORS_PROXIES) {
          try {
            console.log('[CTFVisualChart] Proxy:', proxy.substring(0, 30) + '...');
            const [res2024, res2025] = await Promise.all([
              fetch(`${proxy}${encodeURIComponent('https://ctftime.org/api/v1/results/2024/')}`, { 
                signal: AbortSignal.timeout(10000) 
              }),
              fetch(`${proxy}${encodeURIComponent('https://ctftime.org/api/v1/results/2025/')}`, { 
                signal: AbortSignal.timeout(10000) 
              })
            ]);

            if (res2024.ok && res2025.ok) {
              data2024 = await res2024.json();
              data2025 = await res2025.json();
              console.log('[CTFVisualChart] ✓ Live API success');
              break;
            }
          } catch (proxyErr) {
            console.log('[CTFVisualChart] Proxy failed');
            continue;
          }
        }
        
        // LAST RESORT: Use fallback data
        if (!data2024 || !data2025) {
          console.warn('[CTFVisualChart] ⚠ Using fallback data');
          const fallbackData = {
            '2024': FALLBACK_DATA_2024,
            '2025': FALLBACK_DATA_2025
          };
          setAllResults(fallbackData);
          setAvailableYears([2025, 2024]);
          setSelectedYear(2025);
          setLoading(false);
          return;
        }
        
        console.log('[CTFVisualChart] Fetched 2024:', Object.keys(data2024).length, 'events');
        console.log('[CTFVisualChart] Fetched 2025:', Object.keys(data2025).length, 'events');

        // Filter H7Tex results
        const filter = (data: APIResponse) => {
          const results: EventResult[] = [];
          Object.entries(data).forEach(([eventId, eventData]: [string, EventData]) => {
            const score = eventData.scores?.find((s: ScoreData) => s.team_id === TEAM_ID);
            if (score) {
              results.push({
                event_id: eventId,
                title: eventData.title,
                place: score.place,
                points: score.points,
                rating_points: score.rating_points,
                time: eventData.time
              });
            }
          });
          return results.sort((a, b) => a.time - b.time);
        };

        const filtered2024 = filter(data2024);
        const filtered2025 = filter(data2025);
        
        setAllResults({
          '2024': filtered2024,
          '2025': filtered2025
        });
        setAvailableYears([2025, 2024]);
        setSelectedYear(2025);
        
        console.log('[CTFVisualChart] Filtered 2024:', filtered2024.length, 'H7Tex events');
        console.log('[CTFVisualChart] Filtered 2025:', filtered2025.length, 'H7Tex events');
      } catch (error: unknown) {
        console.error('[CTFVisualChart] Failed to fetch CTF results:', error);
        if (error instanceof Error) {
          console.error('[CTFVisualChart] Error details:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const currentResults = allResults[selectedYear] || [];
  
  // Calculate statistics (exclude organized events with place=0)
  const participatedEvents = currentResults.filter(r => r.place > 0);
  const totalEvents = participatedEvents.length;
  const avgPlace = totalEvents > 0 ? (participatedEvents.reduce((sum, r) => sum + r.place, 0) / totalEvents).toFixed(1) : '0';
  const bestPlace = totalEvents > 0 ? Math.min(...participatedEvents.map(r => r.place)) : 0;
  const top10Count = participatedEvents.filter(r => r.place <= 10).length;
  const top50Count = participatedEvents.filter(r => r.place <= 50).length;

  // Prepare chart data - sample every few events to keep chart readable
  // Sort by time first, then sample, to maintain chronological order
  // Exclude organized events (place=0) from the trend chart
  const sampleInterval = Math.max(1, Math.floor(participatedEvents.length / 30));
  const sortedResults = [...participatedEvents].sort((a, b) => a.time - b.time);
  const chartData = sortedResults
    .filter((_, index) => index % sampleInterval === 0 || index === sortedResults.length - 1)
    .map((event) => ({
      name: new Date(event.time * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullName: event.title,
      place: event.place,
      eventNum: sortedResults.indexOf(event) + 1
    }));

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload?: { fullName?: string; place?: number; eventNum?: number } }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-green-500/50 p-3 rounded-lg">
          <p className="text-white font-mono text-sm mb-2">{payload[0]?.payload?.fullName}</p>
          <p className="text-green-400 text-xs">Event #{payload[0]?.payload?.eventNum}</p>
          <p className="text-yellow-400 text-xs mt-1">Place: #{payload[0]?.payload?.place}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-mono mb-4">Performance Analytics</h2>
          <p className="text-gray-400 font-mono text-sm animate-pulse">Loading real-time data from CTFTime API...</p>
        </div>
        <div className="bg-black/40 border border-green-900/50 p-12 rounded-lg">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-mono mb-4">Performance Analytics</h2>
        <p className="text-gray-400 font-mono text-sm">Real-time data from CTFTime API</p>
      </div>

      {/* Year Toggle */}
      <div className="flex justify-center gap-2 mb-6">
        {availableYears.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-6 py-2 font-mono text-sm rounded transition-all ${
              selectedYear === year
                ? 'bg-green-900/50 text-white border border-green-500' 
                : 'bg-black/40 text-gray-400 border border-green-900/30 hover:border-green-500/50'
            }`}
          >
            {year} ({(allResults[year] || []).length})
          </button>
        ))}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
        <div className="bg-black/40 border border-green-900/50 p-3 md:p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-green-500" />
            <span className="text-gray-400 text-xs font-mono">Total Events</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-white font-mono">{totalEvents}</p>
        </div>
        
        <div className="bg-black/40 border border-yellow-900/50 p-3 md:p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-gray-400 text-xs font-mono">Best Place</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-white font-mono">#{bestPlace}</p>
        </div>
        
        <div className="bg-black/40 border border-blue-900/50 p-3 md:p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-500" />
            <span className="text-gray-400 text-xs font-mono">Avg Place</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-white font-mono">#{avgPlace}</p>
        </div>
        
        <div className="bg-black/40 border border-purple-900/50 p-3 md:p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <span className="text-gray-400 text-xs font-mono">Top 10</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-white font-mono">{top10Count}</p>
        </div>

        <div className="bg-black/40 border border-red-900/50 p-3 md:p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-red-500" />
            <span className="text-gray-400 text-xs font-mono">Top 50</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-white font-mono">{top50Count}</p>
        </div>
      </div>

      {/* Placement Trend Chart */}
      <div className="bg-black/40 border border-green-900/50 p-4 md:p-6 rounded-lg mb-6">
        <h3 className="text-xl md:text-2xl font-mono text-white mb-6">Placement Trend Over Time</h3>
        <div className="w-full">
          <ResponsiveContainer width="100%" height={300} className="md:h-[320px]">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 60, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis 
                dataKey="name" 
                stroke="#666" 
                tick={{ fill: '#999', fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#666" 
                tick={{ fill: '#999', fontSize: 12 }}
                reversed={true}
                label={{ 
                  value: 'Placement Rank', 
                  angle: -90, 
                  position: 'insideLeft', 
                  style: { fill: '#999', fontSize: 11, textAnchor: 'middle' },
                  offset: 10
                }}
                width={60}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ color: '#999', fontSize: '12px', paddingTop: '10px' }} 
                iconType="line"
              />
              <Line 
                type="monotoneX" 
                dataKey="place" 
                stroke="#00ff00" 
                strokeWidth={2.5}
                dot={{ fill: '#00ff00', r: 4 }}
                activeDot={{ r: 6 }}
                name="Placement"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="text-gray-500 text-xs font-mono mt-1 text-center">
          <p>{chartData.length} sampled events • Y-axis shows placement rank (lower number = better)</p>
        </div>
      </div>

      {/* Top 10 Performances */}
      <div className="bg-black/40 border border-green-900/50 p-4 md:p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-mono text-white">Top 10 Rating Contributors in {selectedYear}</h3>
          {availableYears.length > 1 && (
            <div className="flex gap-2">
              {availableYears.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 font-mono text-sm rounded transition-all ${
                    selectedYear === year
                      ? 'bg-green-900/50 text-white border border-green-500'
                      : 'bg-black/40 text-gray-400 border border-green-900/30 hover:border-green-500/50'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-gray-500 text-xs font-mono mb-4">Events that contributed the most rating points to your {selectedYear} score</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
          {currentResults
            .filter(e => e.rating_points && e.rating_points > 0)
            .sort((a, b) => (b.rating_points || 0) - (a.rating_points || 0))
            .slice(0, 10)
            .map((event, index) => (
              <div key={event.event_id} className="bg-black/50 border border-green-900/30 p-3 rounded flex items-center justify-between gap-3 hover:border-green-500/50 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="text-lg md:text-xl font-bold font-mono flex-shrink-0 text-green-400">
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm font-mono truncate">{event.title}</p>
                      {event.organized && (
                        <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded font-mono flex-shrink-0">ORGANIZED</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs font-mono">
                      {event.organized ? 'Organizer Bonus' : `Placement: #${event.place}`} • {new Date(event.time * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-green-400 text-lg font-mono font-bold">+{(event.rating_points || 0).toFixed(2)}</p>
                  <p className="text-gray-500 text-xs font-mono">rating pts</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
