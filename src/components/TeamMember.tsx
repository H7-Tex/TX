// components/TeamMember.tsx
'use client';
import { useState } from 'react';
import { X, Github, Twitter, Linkedin, Trophy, Globe } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  oneLiner: string;
  socials: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    ctftime?: string;
    website?: string;
  };
}

const TeamMember = ({ name, role, oneLiner, socials }: TeamMemberProps) => {
  const [showPopup, setShowPopup] = useState(false);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'ctftime':
        return <Trophy className="w-5 h-5" />;
      case 'website':
        return <Globe className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={`bg-gray-900 border-2 border-green-800 p-6 rounded-lg font-mono 
                   transition-all duration-300 cursor-pointer
                   hover:border-green-500 hover:bg-gray-800 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20`}
        onClick={() => setShowPopup(true)}
      >
        <h3 className="text-xl mb-2 text-white">{name}</h3>
        <p className="text-green-400">{role}</p>
        <p className="text-xs text-gray-500 mt-2 opacity-70 hover:opacity-100 transition-opacity">
          Click for more info →
        </p>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setShowPopup(false)}
        >
          <div 
            className="bg-gray-900 border-2 border-green-500 p-8 rounded-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-green-500 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Member info */}
            <div className="font-mono">
              <h3 className="text-2xl mb-2 text-white">{name}</h3>
              <p className="text-green-400 mb-4">{role}</p>
              
              {/* One-liner */}
              <div className="mb-6 p-4 bg-black rounded border border-green-800">
                <p className="text-gray-300 italic">&quot;{oneLiner}&quot;</p>
              </div>

              {/* Social links */}
              <div className="flex gap-4 justify-center">
                {Object.entries(socials).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black hover:bg-green-900 p-3 rounded-lg transition-colors border border-green-800 hover:border-green-500"
                    aria-label={platform}
                  >
                    {getSocialIcon(platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamMember;