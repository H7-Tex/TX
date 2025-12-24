'use client';
import Link from 'next/link';
import { ArrowLeft, Trophy, Users, Globe, Mail } from 'lucide-react';

interface Sponsor {
  name: string;
  description: string;
  url: string;
  tier: 'platinum' | 'gold' | 'silver';
}

const sponsors2025: Sponsor[] = [
  {
    name: 'OffSec',
    description: 'Global leader in offensive security training and certifications, with hands-on cybersecurity education.',
    url: 'https://www.offsec.com/',
    tier: 'platinum'
  },
  {
    name: 'Parrot CTFs',
    description: 'Leading platform for hands-on CTF challenges and cybersecurity skill development.',
    url: 'https://parrot-ctfs.com/',
    tier: 'platinum'
  },
  {
    name: 'Jsmon',
    description: 'JavaScript security scanning platform for detecting vulnerabilities, secrets, and sensitive information in real-time.',
    url: 'https://jsmon.sh/',
    tier: 'platinum'
  },
  {
    name: 'EC-Council',
    description: 'World\'s largest cybersecurity certification body with renowned programs like CEH, CHFI, and ECSA.',
    url: 'https://www.eccouncil.org/',
    tier: 'platinum'
  },
  {
    name: 'OtterSec',
    description: 'Cybersecurity and Web3 specialists focused on blockchain consulting and audits.',
    url: 'https://osec.io/',
    tier: 'gold'
  },
  {
    name: 'Altered Security',
    description: 'Advanced offensive security training pushing the boundaries of practical skills.',
    url: 'https://www.alteredsecurity.com/',
    tier: 'gold'
  },
  {
    name: 'CyberWarFare Labs',
    description: 'Advanced cyber attack and detection learning platform with real-world simulations.',
    url: 'https://www.cyberwarfare.live/',
    tier: 'silver'
  },
  {
    name: 'XYZ',
    description: 'Domain and digital infrastructure provider empowering innovators to build securely.',
    url: 'https://gen.xyz/',
    tier: 'silver'
  },
  {
    name: 'Caido',
    description: 'Modern web security testing platform for efficient application testing and debugging.',
    url: 'https://caido.io/',
    tier: 'silver'
  },
  {
    name: 'SecLance',
    description: 'Penetration testing services with internship opportunities for top H7CTF teams.',
    url: 'https://www.seclance.com/',
    tier: 'silver'
  }
];

const sponsors2024: Sponsor[] = [
  {
    name: 'OffSec',
    description: 'Global leader in offensive security training and certifications.',
    url: 'https://www.offsec.com/',
    tier: 'platinum'
  },
  {
    name: 'Altered Security',
    description: 'Advanced offensive security training.',
    url: 'https://www.alteredsecurity.com/',
    tier: 'gold'
  },
  {
    name: 'Interview Cake',
    description: 'Coding interview preparation platform.',
    url: 'https://www.interviewcake.com/',
    tier: 'gold'
  },
  {
    name: 'XYZ',
    description: 'Domain and digital infrastructure provider.',
    url: 'https://gen.xyz/',
    tier: 'gold'
  }
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'platinum': return 'border-gray-300 bg-gradient-to-br from-gray-800 to-gray-900';
    case 'gold': return 'border-yellow-500 bg-gradient-to-br from-yellow-900/20 to-gray-900';
    case 'silver': return 'border-gray-500 bg-gradient-to-br from-gray-700/20 to-gray-900';
    default: return 'border-green-500';
  }
};

export default function H7CTFPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-gray-300">
      <nav className="border-b border-green-900/20 bg-black/40 backdrop-blur-md py-4">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="font-mono">Back to Home</span>
          </Link>
          <h1 className="text-xl font-mono text-white font-bold">H7CTF</h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-teal-400" />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono">
              <span className="text-white">H7</span><span className="text-teal-400">CTF</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl lg:text-2xl font-mono mb-4">
            National-Level Cybersecurity Challenge
          </p>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-4">
            An annual CTF competition organized by H7Tex, bringing together the brightest minds 
            in cybersecurity from across India and around the world.
          </p>
        </div>

        {/* H7CTF 2025 */}
        <section className="mb-12 md:mb-16">
          <div className="bg-gray-900/30 border border-blue-900/30 rounded-lg p-4 md:p-6 lg:p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl md:text-3xl font-mono text-white flex items-center gap-2">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                H7CTF 2025
              </h2>
              <a 
                href="https://www.abu.rocks/docs/dev/h7ctf25-infrastructure/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-900/20 border border-blue-500/40 rounded font-mono text-sm hover:bg-blue-900/40 hover:border-blue-400 transition-all text-blue-300"
              >
                📄 Infrastructure Writeup
              </a>
            </div>
            
            <div className="space-y-4 text-gray-300 font-mono text-sm md:text-base mb-8">
              <p>
                H7CTF 2025, organized by H7Tex and hosted by the <strong>Department of Networking and Communications (NWC), School of Computing, SRM Institute of Science and Technology (SRMIST)</strong>, Kattankulathur, marked the culmination of a nationwide cybersecurity journey.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 my-6">
                <div className="bg-black/40 border border-gray-700 p-3 md:p-4 rounded text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <p className="text-2xl font-bold text-white">3,500+</p>
                  <p className="text-sm text-gray-400">Participants</p>
                </div>
                <div className="bg-black/40 border border-teal-900/30 p-3 md:p-4 rounded text-center">
                  <Globe className="w-8 h-8 mx-auto mb-2 text-teal-400" />
                  <p className="text-2xl font-bold text-white">25+</p>
                  <p className="text-sm text-gray-400">Countries</p>
                </div>
                <div className="bg-black/40 border border-yellow-900/30 p-3 md:p-4 rounded text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <p className="text-2xl font-bold text-white">₹14Cr+</p>
                  <p className="text-sm text-gray-400">Prize Pool</p>
                </div>
              </div>

              <p>
                The event was graced by <strong>Thiru Md. Shakeel Akhter, I.P.S. (Retd.), State Chief Information Commissioner, Government of Tamil Nadu</strong>, highlighting the importance of experiential cybersecurity learning and responsible digital innovation.
              </p>
            </div>

            {/* Winners */}
            <div className="bg-black/50 p-4 md:p-6 rounded border border-green-900/30 mb-8">
              <h3 className="text-lg md:text-xl font-mono mb-4 text-blue-300">🏆 Top 5 Teams</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-900/30 to-transparent rounded border border-yellow-600/20">
                  <span className="text-2xl">🥇</span>
                  <div>
                    <p className="text-yellow-300 font-bold">Vavval Squad</p>
                    <p className="text-gray-400">Amrita Vishwa Vidyapeetham - ₹3L + ₹25K Cash</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-gray-600/20 to-transparent rounded border border-gray-500/20">
                  <span className="text-2xl">🥈</span>
                  <div>
                    <p className="text-gray-200 font-bold">r00t_R3bE1z</p>
                    <p className="text-gray-400">SRM Valliammai Engineering College - ₹1.9L + ₹15K Cash</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-orange-900/20 to-transparent rounded border border-orange-600/20">
                  <span className="text-2xl">🥉</span>
                  <div>
                    <p className="text-orange-300 font-bold">libbabel.so</p>
                    <p className="text-gray-400">IIT Kharagpur - ₹1.8L + ₹10K Cash</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-black/30 border border-gray-700/30 rounded">
                  <span className="text-xl">4️⃣</span>
                  <div>
                    <p className="text-white font-bold">PrivateUser</p>
                    <p className="text-gray-400">SRMIST, Kattankulathur - ₹1.65L</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-black/30 border border-gray-700/30 rounded">
                  <span className="text-xl">5️⃣</span>
                  <div>
                    <p className="text-white font-bold">NOVA</p>
                    <p className="text-gray-400">Kumaraguru College of Technology - ₹60K</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sponsors 2025 */}
            <div className="mb-8">
              <h3 className="text-2xl font-mono mb-6 text-gray-300">Sponsors 2025</h3>
              
              {/* Platinum */}
              <div className="mb-6">
                <h4 className="text-base md:text-lg font-mono mb-4 text-gray-100">Platinum Sponsors</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {sponsors2025.filter(s => s.tier === 'platinum').map((sponsor) => (
                    <a
                      key={sponsor.name}
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${getTierColor('platinum')} border-2 p-4 md:p-6 rounded-lg hover:scale-105 transition-transform`}
                    >
                      <h5 className="text-lg md:text-xl font-bold text-white mb-2">{sponsor.name}</h5>
                      <p className="text-sm text-gray-400">{sponsor.description}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Gold */}
              <div className="mb-6">
                <h4 className="text-base md:text-lg font-mono mb-4 text-gray-300">Gold Sponsors</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {sponsors2025.filter(s => s.tier === 'gold').map((sponsor) => (
                    <a
                      key={sponsor.name}
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${getTierColor('gold')} border-2 p-4 md:p-6 rounded-lg hover:scale-105 transition-transform`}
                    >
                      <h5 className="text-lg md:text-xl font-bold text-white mb-2">{sponsor.name}</h5>
                      <p className="text-sm text-gray-400">{sponsor.description}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Silver */}
              <div className="mb-6">
                <h4 className="text-base md:text-lg font-mono mb-4 text-gray-400">Silver Sponsors</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {sponsors2025.filter(s => s.tier === 'silver').map((sponsor) => (
                    <a
                      key={sponsor.name}
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${getTierColor('silver')} border-2 p-4 md:p-6 rounded-lg hover:scale-105 transition-transform`}
                    >
                      <h5 className="text-lg md:text-xl font-bold text-white mb-2">{sponsor.name}</h5>
                      <p className="text-sm text-gray-400">{sponsor.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* H7CTF 2024 */}
        <section className="mb-12 md:mb-16">
          <div className="bg-gray-900/30 border border-purple-900/30 rounded-lg p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl md:text-3xl font-mono text-white flex items-center gap-2">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
                H7CTF 2024
              </h2>
              <a 
                href="https://www.abu.rocks/docs/dev/h7ctf24-infrastructure/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800/30 border border-gray-500/50 rounded font-mono text-sm hover:bg-gray-700/50 hover:border-gray-400 transition-all text-gray-300"
              >
                📄 Infrastructure Writeup
              </a>
            </div>
            
            <div className="space-y-4 text-gray-300 font-mono text-sm md:text-base mb-8">
              <p>
                H7CTF International 2024 was our inaugural global cybersecurity event, pushing participants 
                and organizers to the limit. With support from our amazing sponsors, we offered <strong>₹3.5 Lakhs ($4200)</strong> worth of prizes!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 my-6">
                <div className="bg-black/40 p-3 md:p-4 rounded border border-blue-900/30 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <p className="text-2xl font-bold text-blue-400">2,000+</p>
                  <p className="text-sm text-gray-400">Global Participants</p>
                </div>
                <div className="bg-black/40 p-3 md:p-4 rounded border border-yellow-900/30 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <p className="text-2xl font-bold text-yellow-400">₹3.5L</p>
                  <p className="text-sm text-gray-400">Prize Pool</p>
                </div>
              </div>
            </div>

            {/* Winners 2024 */}
            <div className="bg-black/50 p-4 md:p-6 rounded border border-purple-900/30 mb-8">
              <h3 className="text-lg md:text-xl font-mono mb-4 text-purple-300">🏆 Winners</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h4 className="text-lg font-mono mb-4 text-purple-300">Online Event</h4>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-900/30 to-transparent rounded border border-yellow-600/20">
                      <span className="text-xl font-bold text-yellow-300">1st</span>
                      <p className="text-yellow-300 font-bold">BITSkrieg</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-600/20 to-transparent rounded border border-gray-500/20">
                      <span className="text-xl font-bold text-gray-200">2nd</span>
                      <p className="text-gray-200 font-bold">0bug</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-900/20 to-transparent rounded border border-orange-600/20">
                      <span className="text-xl font-bold text-orange-300">3rd</span>
                      <p className="text-orange-300 font-bold">Cryptonite</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-mono mb-4 text-purple-300">Onsite Event</h4>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-900/30 to-transparent rounded border border-yellow-600/20">
                      <span className="text-xl font-bold text-yellow-300">1st</span>
                      <p className="text-yellow-300 font-bold">mu5k3733r5</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-600/20 to-transparent rounded border border-gray-500/20">
                      <span className="text-xl font-bold text-gray-200">2nd</span>
                      <p className="text-gray-200 font-bold">H4CK_077</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-900/20 to-transparent rounded border border-orange-600/20">
                      <span className="text-xl font-bold text-orange-300">3rd</span>
                      <p className="text-orange-300 font-bold">Moriarty</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sponsors 2024 */}
            <div className="mb-8">
              <h3 className="text-2xl font-mono mb-6 text-blue-400">Sponsors 2024</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {sponsors2024.map((sponsor) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${getTierColor(sponsor.tier)} border-2 p-4 md:p-6 rounded-lg hover:scale-105 transition-transform`}
                  >
                    <h5 className="text-lg md:text-xl font-bold text-white mb-2">{sponsor.name}</h5>
                    <p className="text-sm text-gray-400">{sponsor.description}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center">
              <a 
                href="https://github.com/H7-Tex/H7CTF-2024" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-black font-mono py-2 px-6 rounded hover:bg-blue-400 transition-colors"
              >
                View 2024 Challenges & Write-ups
              </a>
            </div>
          </div>
        </section>

        {/* CTF Hosting Services */}
        <section className="mb-12 md:mb-16">
          <div className="bg-gray-900/30 border border-teal-900/30 rounded-lg p-6 md:p-8 text-center">
            <Mail className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-teal-400" />
            <h2 className="text-xl md:text-2xl font-mono mb-4 text-white">
              Need CTF Hosting Services?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We specialize in providing complete CTF infrastructure and challenge development services. 
              From planning to execution, we&apos;ve got you covered.
            </p>
            <div className="space-y-2 text-sm text-gray-400 mb-6">
              <p>✓ Infrastructure Setup & Management</p>
              <p>✓ Challenge Development (All Categories)</p>
              <p>✓ Platform Configuration & Support</p>
              <p>✓ Onsite & Online Events</p>
            </div>
            <a 
              href="mailto:abu@h7tex.com"
              className="inline-block bg-teal-900/30 border border-teal-500/50 text-white font-mono py-3 px-8 rounded-lg hover:bg-teal-900/50 hover:border-teal-400 transition-all"
            >
              Contact: abu@h7tex.com
            </a>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center py-8 md:py-12 px-4">
          <h2 className="text-2xl md:text-3xl font-mono mb-4 text-white">
            See you at H7CTF 2026! 🚀
          </h2>
          <p className="text-gray-400 mb-6">
            Stay tuned for our biggest event yet
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-900/30 border border-blue-500/50 text-white font-mono py-3 px-6 rounded-lg hover:bg-blue-900/50 hover:border-blue-400 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <footer className="border-t border-green-900/20 bg-black/40 backdrop-blur-md py-8">
        <div className="container mx-auto px-4 md:px-6 text-center font-mono text-sm text-gray-400">
          <p>&copy; 2026 H7Tex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
