'use client';
import { useCTFTimeTeam } from '../hooks/useCTFTime';
import { TrendingUp, Award, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CTFTimeStats() {
  const { teamData, loading, error } = useCTFTimeTeam();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    setLastUpdated(new Date());
  }, [teamData]);

  if (loading) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg border border-green-800">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-800 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-24 bg-gray-800 rounded"></div>
            <div className="h-24 bg-gray-800 rounded"></div>
            <div className="h-24 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !teamData) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg border border-red-500">
        <p className="text-red-400 font-mono text-center">Unable to fetch live CTFTime data</p>
        <p className="text-gray-400 text-sm mt-2 text-center">Please check back later</p>
      </div>
    );
  }

  // Use 2025 data if available, otherwise fall back to 2024
  const currentYear = new Date().getFullYear();
  const yearData = teamData.rating[currentYear.toString()] || teamData.rating['2024'];
  const isLiveData = !error && teamData;

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-green-800">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-mono text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-green-400" />
          CTFTime Statistics
        </h3>
        {!isLiveData && (
          <span className="text-xs text-yellow-400 font-mono">Cached Data</span>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Global Ranking */}
        <div className="bg-black p-4 rounded border border-green-900">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-yellow-400" />
            <p className="text-gray-400 text-sm font-mono">Global Rank</p>
          </div>
          <p className="text-3xl font-bold text-green-400">
            #{yearData?.rating_place || 'N/A'}
          </p>
        </div>

        {/* Rating Points */}
        <div className="bg-black p-4 rounded border border-green-900">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-blue-400" />
            <p className="text-gray-400 text-sm font-mono">Rating Points</p>
          </div>
          <p className="text-3xl font-bold text-green-400">
            {yearData?.rating_points?.toFixed(2) || 'N/A'}
          </p>
        </div>

        {/* Country Ranking */}
        <div className="bg-black p-4 rounded border border-green-900">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-red-400" />
            <p className="text-gray-400 text-sm font-mono">India Rank</p>
          </div>
          <p className="text-3xl font-bold text-green-400">
            #{yearData?.country_place || 'N/A'}
          </p>
        </div>
      </div>

      {teamData && (
        <div className="mt-6 pt-6 border-t border-green-900 text-center">
          <a
            href={`https://ctftime.org/team/${teamData.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-black font-mono py-2 px-4 rounded hover:bg-green-400 transition-colors text-sm"
          >
            <Users className="w-4 h-4" />
            View on CTFTime
          </a>
          <div className="text-xs text-gray-500 font-mono mt-3">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
}
