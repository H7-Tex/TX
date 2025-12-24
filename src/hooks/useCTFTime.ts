'use client';
import { useState, useEffect } from 'react';

export interface CTFTimeEvent {
  id: number;
  ctf_id: number;
  ctf: {
    ctf_id: number;
    ctftime_url: string;
  };
  team_id?: number;
  team?: {
    id: number;
  };
  place: number;
  points: number;
  rating_points: number;
}

export interface TeamRating {
  rating_place: number;
  rating_points: number;
  country_place: number;
}

export interface TeamInfo {
  id: number;
  name: string;
  rating: {
    [year: string]: TeamRating;
  };
}

const TEAM_ID = 281844; // H7Tex team ID
// Try different CORS proxies - corsproxy.io might not be passing headers correctly
// const CORS_PROXY = 'https://corsproxy.io/?';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
// Alternative: const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export const useCTFTimeTeam = () => {
  const [teamData, setTeamData] = useState<TeamInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        console.log('[useCTFTimeTeam] Loading data...');
        
        // Try cached data first (fast, no CORS!)
        try {
          const cachedResponse = await fetch('/ctftime-data.json');
          if (cachedResponse.ok) {
            const cached = await cachedResponse.json();
            console.log('[useCTFTimeTeam] ✓ Using cached data');
            setTeamData(cached.team);
            setError(null);
            setLoading(false);
            return;
          }
        } catch {
          console.log('[useCTFTimeTeam] No cached data');
        }
        
        // Fallback to CORS proxy (slow, unreliable)
        console.log('[useCTFTimeTeam] Trying live API...');
        const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
        const response = await fetch(`${CORS_PROXY}${encodeURIComponent(`https://ctftime.org/api/v1/teams/${TEAM_ID}/`)}`, {
          signal: AbortSignal.timeout(10000)
        });
        
        if (!response.ok) throw new Error(`API returned ${response.status}`);
        
        const data = await response.json();
        console.log('[useCTFTimeTeam] ✓ Live API success');
        setTeamData(data);
        setError(null);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[useCTFTimeTeam] Error:', message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchTeamData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { teamData, loading, error };
};

export const useCTFTimeEvents = (year?: number) => {
  const [events, setEvents] = useState<CTFTimeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = year 
          ? `https://ctftime.org/api/v1/results/${year}/`
          : `https://ctftime.org/api/v1/results/`;
        
        // Try direct fetch first
        let response;
        try {
          response = await fetch(apiUrl, {
            headers: { 'User-Agent': 'H7/1.0' },
            cache: 'no-store'
          });
          if (!response.ok) throw new Error('Direct fetch failed');
        } catch {
          // Fallback to CORS proxy
          response = await fetch(`${CORS_PROXY}${encodeURIComponent(apiUrl)}`);
        }
        
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        
        // Filter for H7Tex team events
        const h7texEvents = data.filter((event: CTFTimeEvent) => 
          event.team_id === TEAM_ID || event.team?.id === TEAM_ID
        );
        
        setEvents(h7texEvents);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [year]);

  return { events, loading, error };
};
