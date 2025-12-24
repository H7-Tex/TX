// utils/ctftime.ts

export const TEAM_ID = 281844; // H7Tex team ID on CTFTime

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

/**
 * Fetch team information from CTFTime API
 */
export async function fetchTeamInfo(teamId: number = TEAM_ID): Promise<TeamInfo | null> {
  try {
    const response = await fetch(`https://ctftime.org/api/v1/teams/${teamId}/`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch team info: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching team info:', error);
    return null;
  }
}

/**
 * Fetch team results for a specific year
 */
export async function fetchTeamResults(year?: number): Promise<CTFTimeEvent[]> {
  try {
    const url = year 
      ? `https://ctftime.org/api/v1/results/${year}/`
      : `https://ctftime.org/api/v1/results/`;
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch results: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter for H7Tex team events
    return data.filter((event: CTFTimeEvent) => 
      event.team_id === TEAM_ID || event.team?.id === TEAM_ID
    );
  } catch (error) {
    console.error('Error fetching team results:', error);
    return [];
  }
}

/**
 * Get current year rating data
 */
export function getCurrentYearRating(teamInfo: TeamInfo | null): TeamRating | null {
  if (!teamInfo || !teamInfo.rating) return null;
  
  const currentYear = new Date().getFullYear().toString();
  return teamInfo.rating[currentYear] || teamInfo.rating['2024'] || null;
}
