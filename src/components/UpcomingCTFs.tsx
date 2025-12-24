'use client';
import { useState, useEffect } from 'react';
import { Calendar, Clock, ExternalLink, TrendingUp } from 'lucide-react';

interface UpcomingCTF {
  id: number;
  title: string;
  url: string;
  start: string;
  finish: string;
  duration: {
    days: number;
    hours: number;
  };
  format: string;
  weight: number;
  onsite: boolean;
  location: string;
  participants: number;
}

// Use the same CORS proxy as the hook
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export default function UpcomingCTFs() {
  const [events, setEvents] = useState<UpcomingCTF[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingCTFs = async () => {
      try {
        console.log('[UpcomingCTFs] Loading data...');
        
        // Try cached data first (fast, no CORS!)
        try {
          const cachedResponse = await fetch('/ctftime-data.json');
          if (cachedResponse.ok) {
            const cached = await cachedResponse.json();
            console.log('[UpcomingCTFs] ✓ Using cached data');
            setEvents(cached.upcoming || []);
            setError(null);
            setLoading(false);
            return;
          }
        } catch {
          console.log('[UpcomingCTFs] No cached data');
        }
        
        // Fallback to live API (slow, unreliable)
        console.log('[UpcomingCTFs] Trying live API...');
        const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
        const now = Math.floor(Date.now() / 1000);
        const response = await fetch(`${CORS_PROXY}${encodeURIComponent(`https://ctftime.org/api/v1/events/?limit=20&start=${now}`)}`, {
          signal: AbortSignal.timeout(10000)
        });
        
        if (!response.ok) throw new Error(`API returned ${response.status}`);
        
        const data = await response.json();
        console.log('[UpcomingCTFs] Fetched:', data.length, 'events');
        
        // Filter only weighted CTFs (weight > 0) and take first 3
        const weightedEvents = data.filter((event: UpcomingCTF) => event.weight > 0);
        console.log('[UpcomingCTFs] Weighted events:', weightedEvents.length);
        
        setEvents(weightedEvents.slice(0, 3));
        setError(null);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[UpcomingCTFs] Error:', message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingCTFs();
    
    // Refresh every 10 minutes
    const interval = setInterval(fetchUpcomingCTFs, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntil = (startDate: string) => {
    const now = new Date().getTime();
    const start = new Date(startDate).getTime();
    const diff = start - now;

    if (diff < 0) return 'Live now!';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `In ${days}d ${hours}h`;
    return `In ${hours}h`;
  };

  if (loading) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg border border-green-800">
        <h3 className="text-xl font-mono mb-6 text-white flex items-center gap-2">
          <Calendar className="w-6 h-6 text-green-400" />
          Upcoming CTFs
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-800 p-4 rounded h-24"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg border border-red-500">
        <h3 className="text-xl font-mono mb-4 text-white flex items-center gap-2">
          <Calendar className="w-6 h-6 text-red-400" />
          Upcoming CTFs
        </h3>
        <p className="text-red-400 font-mono text-sm mb-2">Unable to fetch live data from CTFTime</p>
        <p className="text-gray-400 text-xs">API may be temporarily unavailable. Check <a href="https://ctftime.org/event/list/upcoming" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">CTFTime.org</a> directly.</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg border border-green-800">
        <h3 className="text-xl font-mono mb-4 text-white flex items-center gap-2">
          <Calendar className="w-6 h-6 text-green-400" />
          Upcoming CTFs
        </h3>
        <p className="text-gray-400 text-center">No upcoming events found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-green-800">
      <h3 className="text-xl font-mono mb-6 text-white flex items-center gap-2">
        <Calendar className="w-6 h-6 text-green-400" />
        Upcoming CTFs
      </h3>
      
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-black p-4 rounded border border-green-900 hover:border-green-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-white font-mono font-semibold flex-1">
                {event.title}
              </h4>
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 ml-2"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400 font-mono">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{getTimeUntil(event.start)}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(event.start)}</span>
              </div>

              {event.weight > 0 && (
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400">Weight: {event.weight.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="mt-2 flex gap-2">
              <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">
                {event.format}
              </span>
              <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">
                {event.duration.days}d {event.duration.hours}h
              </span>
              {event.onsite && (
                <span className="text-xs px-2 py-1 bg-blue-900 text-blue-300 rounded">
                  On-site
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <a
          href="https://ctftime.org/event/list/upcoming"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-300 font-mono text-sm inline-flex items-center gap-1"
        >
          View all upcoming CTFs
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
