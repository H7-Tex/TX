'use client';

const VisualEffects = () => {
  return (
    <>
      {/* Retro terminal-style background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* Scanline effect */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.08) 50%, transparent 50%)',
            backgroundSize: '100% 4px',
            animation: 'scanline 8s linear infinite'
          }}
        />
        
        {/* CRT screen curvature subtle effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.2) 100%)'
          }}
        />
        
        {/* Terminal grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0, 255, 0, 0.15) 1px, transparent 1px),
              linear-gradient(rgba(0, 255, 0, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Subtle corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-green-900 opacity-30" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-green-900 opacity-30" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-green-900 opacity-30" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-green-900 opacity-30" />
        
        {/* Ambient glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500 rounded-full mix-blend-screen filter blur-[150px] opacity-[0.08]" 
        />
      </div>
      
      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }
      `}</style>
    </>
  );
};

export default VisualEffects;
