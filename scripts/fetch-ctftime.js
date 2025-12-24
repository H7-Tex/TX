// Script to fetch CTFTime data at build time (no CORS issues!)
const fs = require('fs');
const https = require('https');

const TEAM_ID = 281844;

// Add delay between requests to avoid rate limiting
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchData(url) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Request timeout after 120s'));
    }, 120000); // 120 second timeout
    
    https.get(url, {
      headers: { 'User-Agent': 'H7/1.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        clearTimeout(timeout);
        
        // Check if response is HTML (error page) instead of JSON
        if (data.trim().startsWith('<!DOCTYPE') || data.trim().startsWith('<html')) {
          reject(new Error('API returned HTML error page (likely no data available)'));
          return;
        }
        
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Invalid JSON response: ${e.message}`));
        }
      });
    }).on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

async function main() {
  console.log('Fetching CTFTime data...');
  
  try {
    // Fetch team info
    console.log('- Team info...');
    const team = await fetchData(`https://ctftime.org/api/v1/teams/${TEAM_ID}/`);
    
    // Filter H7Tex events and calculate rating points
    const filter = async (data) => {
      const results = [];
      const entries = Object.entries(data);
      const organizedEvents = ['H7CTF', 'H7CTF 2024', 'H7CTF 2025', 'H7CTF International']; // Events we organized
      
      console.log(`  Calculating ratings for ${entries.filter(([, e]) => e.scores?.find(s => s.team_id === TEAM_ID)).length} participated events...`);
      
      let processed = 0;
      for (const [eventId, eventData] of entries) {
        const ourScore = eventData.scores?.find(s => s.team_id === TEAM_ID);
        const isOrganized = organizedEvents.some(org => eventData.title.includes(org));
        
        if (ourScore || isOrganized) {
          processed++;
          if (processed % 10 === 0) {
            console.log(`    Progress: ${processed}/${entries.length}`);
          }
          
          let calculatedRating = 0;
          let ourPlace = ourScore?.place || 0;
          let ourPoints = ourScore ? parseFloat(ourScore.points) : 0;
          
          // Fetch event weight
          try {
            // Add small delay to avoid rate limiting (50ms between requests)
            await delay(50);
            
            const eventInfo = await fetchData(`https://ctftime.org/api/v1/events/${eventId}/`);
            const weight = eventInfo.weight || 0;
            
            if (isOrganized) {
              // For organized CTFs: we get 2x the winner's rating points
              // Winner's rating = (1 + 1) * w = 2w (perfect score + 1st place)
              // Organizer bonus = 2 * 2w = 4w
              calculatedRating = 4 * weight;
              console.log(`    ${eventData.title} (organized): +${calculatedRating.toFixed(2)} pts (organizer bonus)`);
            } else if (ourScore && weight > 0 && ourPoints > 0) {
              // Regular participation: calculate rating
              const firstPlaceScore = eventData.scores?.find(s => s.place === 1);
              const bestPoints = firstPlaceScore ? parseFloat(firstPlaceScore.points) : ourPoints;
              
              const pointsCoef = ourPoints / bestPoints;
              const placeCoef = 1 / ourPlace;
              calculatedRating = (pointsCoef + placeCoef) * weight;
            }
          } catch (err) {
            // If event API fails, skip rating calculation
          }
          
          // Only add if we have a score or it's organized
          if (ourScore || isOrganized) {
            results.push({
              event_id: eventId,
              title: eventData.title,
              place: ourPlace || 0,
              points: ourScore?.points || '0',
              rating_points: calculatedRating,
              time: eventData.time,
              organized: isOrganized
            });
          }
        }
      }
      return results;
    };
    
    // Dynamically fetch all available years (2024, 2025, 2026, etc.)
    const currentYear = new Date().getFullYear();
    const years = [currentYear - 1, currentYear, currentYear + 1]; // Last year, current, next
    
    const allResults = {};
    
    for (const year of years) {
      try {
        console.log(`- ${year} results...`);
        // Add delay between year fetches to avoid rate limiting
        if (year !== years[0]) {
          await delay(2000); // 2 second delay between years
        }
        const data = await fetchData(`https://ctftime.org/api/v1/results/${year}/`);
        const filtered = await filter(data);
        if (filtered.length > 0) {
          allResults[year] = filtered;
          console.log(`  Found ${filtered.length} events in ${year}`);
        }
      } catch (err) {
        console.log(`  No data for ${year} (${err.message})`);
        // Continue with other years even if one fails
      }
    }
    
    // Fetch upcoming events
    console.log('- Upcoming events...');
    const now = Math.floor(Date.now() / 1000);
    const upcoming = await fetchData(`https://ctftime.org/api/v1/events/?limit=20&start=${now}`);
    const weightedUpcoming = upcoming.filter(e => e.weight > 0).slice(0, 3);
    
    console.log(`Found ${weightedUpcoming.length} upcoming weighted CTFs`);
    
    // Save to public directory
    const output = {
      team,
      results: allResults,
      upcoming: weightedUpcoming,
      lastUpdated: new Date().toISOString()
    };
    
    // Save even with partial data
    fs.writeFileSync('public/ctftime-data.json', JSON.stringify(output, null, 2));
    console.log('✓ Data saved to public/ctftime-data.json');
    
    // Warn if we're missing critical data
    if (Object.keys(allResults).length === 0) {
      console.warn('⚠ Warning: No results data fetched for any year');
    }
    
  } catch (error) {
    console.error('Error fetching data:', error.message);
    
    // Try to save whatever data we have
    if (fs.existsSync('public/ctftime-data.json')) {
      console.log('→ Using existing cached data');
      process.exit(0); // Exit successfully with cached data
    } else {
      process.exit(1); // Only fail if no cached data exists
    }
  }
}

main();
