'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Terminal, Menu, X } from 'lucide-react';

import Achievements from '../components/Achievements';
import VisualEffects from '../components/VisualEffects';
import InceptionTimer from '../components/InceptionTimer';
import TeamMember from '../components/TeamMember';
import AboutText from '../components/AboutText';
import CTFTimeStats from '../components/CTFTimeStats';
import UpcomingCTFs from '../components/UpcomingCTFs';
import CTFVisualChart from '../components/CTFVisualChart';

// Define team members with their roles, one-liners, and socials
const members = [
  { 
    name: 'Abu', 
    role: 'Founder',
    oneLiner: 'constantly feeling an urge to encompass.',
    socials: {
      twitter: 'https://twitter.com/abu2pwn',
      github: 'https://github.com/abuctf',
      ctftime: 'https://ctftime.org/user/184616',
      website: 'https://abu.rocks'
    }
  },
  { 
    name: 'N1sh', 
    role: 'Member',
    oneLiner: 'Web',
    socials: {
      twitter: 'https://twitter.com/n1sh',
      github: 'https://github.com/n1sh'
    }
  },
  { 
    name: 'PattuSai', 
    role: 'Member',
    oneLiner: 'Rev',
    socials: {
      github: 'https://github.com/pattusai',
      linkedin: 'https://linkedin.com/in/pattusai'
    }
  },
  { 
    name: 'MrGhost', 
    role: 'Member',
    oneLiner: 'OSINT',
    socials: {
      twitter: 'https://twitter.com/mrghost',
      github: 'https://github.com/mrghost'
    }
  },
  { 
    name: 'Rohmat', 
    role: 'Member',
    oneLiner: 'Web',
    socials: {
      github: 'https://github.com/rohmat',
      twitter: 'https://twitter.com/rohmat'
    }
  },
  { 
    name: 'SHL', 
    role: 'Member',
    oneLiner: 'Marketing',
    socials: {
      github: 'https://github.com/shl',
      linkedin: 'https://linkedin.com/in/shl'
    }
  },
  { 
    name: 'ExposedAPI', 
    role: 'Member',
    oneLiner: 'Pwn',
    socials: {
      github: 'https://github.com/exposedapi',
      twitter: 'https://twitter.com/exposedapi'
    }
  },
  { 
    name: 'Cook1e', 
    role: 'Member',
    oneLiner: 'somewhere between who I am and who I am becoming',
    socials: {
      github: 'https://github.com/cook1e',
      twitter: 'https://twitter.com/cook1e'
    }
  },
  { 
    name: 'Owatron', 
    role: 'Member',
    oneLiner: 'Web',
    socials: {
      github: 'https://github.com/owatron',
      ctftime: 'https://ctftime.org/user/owatron'
    }
  }
];

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const textToType = 'We Learn. We Hack. We Dominate.';

  // Typing Animation
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= textToType.length) {
        setTypedText(textToType.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-green-500">
      <VisualEffects />
      <Head>
        <title>H7Tex</title>
        <meta name="description" content="H7Tex - Upcoming CTF Guild" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-md border-b border-green-900/20 z-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
              <Terminal className="w-5 h-5 text-green-500 group-hover:text-green-400 transition-colors" />
              <span className="text-lg font-mono font-bold text-white group-hover:text-green-400 transition-colors">
                H7Tex
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <Link href="/ctf" className="px-4 py-2 font-mono text-sm text-gray-300 hover:text-white hover:bg-green-900/20 rounded transition-all">H7CTF</Link>
              <a href="https://ctftime.org/team/281844" target="_blank" rel="noopener noreferrer" className="px-4 py-2 font-mono text-sm text-gray-300 hover:text-white hover:bg-green-900/20 rounded transition-all">CTFTime</a>
              <a href="https://github.com/H7-Tex" target="_blank" rel="noopener noreferrer" className="px-4 py-2 font-mono text-sm text-gray-300 hover:text-white hover:bg-green-900/20 rounded transition-all">GitHub</a>
              <a href="https://www.linkedin.com/company/h7tex/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 font-mono text-sm text-gray-300 hover:text-white hover:bg-green-900/20 rounded transition-all">LinkedIn</a>
            </div>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-green-500 hover:text-green-400 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile menu - only show when open */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 animate-in slide-in-from-top duration-200">
              <div className="flex flex-col gap-1">
                <Link href="/ctf" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 font-mono text-sm text-gray-300 hover:text-white hover:bg-green-900/20 rounded transition-all">H7CTF</Link>
                <a href="https://ctftime.org/team/281844" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 font-mono text-sm text-gray-300 hover:text-white hover:bg-green-900/20 rounded transition-all">CTFTime</a>
                <a href="https://github.com/H7-Tex" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 font-mono text-sm text-gray-300 hover:text-white hover:bg-green-900/20 rounded transition-all">GitHub</a>
                <a href="https://www.linkedin.com/company/h7tex/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 font-mono text-sm text-gray-300 hover:text-white hover:bg-green-900/20 rounded transition-all">LinkedIn</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 md:py-16 relative z-10 pt-28 md:pt-32">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24 mt-8 md:mt-12">
          <h1 className="text-3xl md:text-6xl font-bold font-mono mb-4 md:mb-6">
            <span className="text-white">H7</span>Tex
          </h1>
          <div className="h-8">
            <p className="text-lg md:text-xl font-mono">{typedText}</p>
          </div>
          <InceptionTimer />
        </div>

        {/* About Section */}
        <section id="about" className="mb-12 md:mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-mono mb-4 md:mb-6 text-white">
              About Us
            </h2>
            <div className="bg-gray-900 p-4 md:p-6 rounded-lg">
              <AboutText />
            </div>
          </div>
        </section>

        {/* CTFTime Stats Section */}
        <section id="stats" className="mb-12 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <CTFTimeStats />
            </div>
            <div>
              <UpcomingCTFs />
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="mb-12 md:mb-20">
          <Achievements />
        </section>

        {/* Performance Analytics - Real-time data from CTFTime API */}
        <section id="analytics" className="mb-12 md:mb-20">
          <CTFVisualChart />
        </section>

        {/* Team Section */}
        <section id="team" className="mb-12 md:mb-20">
          <h2 className="text-xl md:text-2xl font-mono mb-4 md:mb-6 text-white">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {members.map((member) => (
              <TeamMember
                key={member.name}
                name={member.name}
                role={member.role}
                oneLiner={member.oneLiner}
                socials={member.socials}
              />
            ))}
          </div>
        </section>

        {/* CTFTime Link Section */}
        <section className="text-center">
          <a
            href="https://ctftime.org/team/281844"
            className="inline-block bg-green-500 text-black font-mono py-3 px-6
                     rounded-lg hover:bg-green-400 transition-colors duration-300"
          >
            View Us on CTFTime
          </a>
        </section>
      </main>

      <footer className="border-t border-green-800 mt-12 md:mt-20 py-6 md:py-8 relative z-10">
        <div className="container mx-auto px-4 text-center font-mono text-sm md:text-base">
          <p>&copy; 2026 H7Tex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}