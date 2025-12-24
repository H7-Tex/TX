import React, { useState, useEffect, useCallback } from 'react';

const AboutText = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const content = "It all started back in February 2024, inspired by Plaid Parliament of Pwning (PPP) dominating DEF CON. Fast forward 10 months, and here we are ranked #7 in India, with over 400 CTFs under our belt. Our dream? To become a powerhouse in the International CTF scene. But enough about us. Why not drop by our Discord? Let’s chat, exchange ideas, or even team up - we’d love to hear your story. Find your way to our Discord and say hello!";

  const typeText = useCallback(async () => {
    let currentText = '';
    
    for (const char of content) {
      currentText += char;
      setDisplayText(currentText);
      // Add a small random delay for natural typing
      await new Promise(resolve => setTimeout(resolve, Math.random() * 15 + 25));
    }
    setIsTypingComplete(true);
  }, []);

  useEffect(() => {
    typeText();
    return () => {
      setDisplayText('');
      setIsTypingComplete(false);
    };
  }, [typeText]);

  return (
    <div className="font-mono text-sm md:text-base text-gray-300">
      {displayText}
      <span 
        className="inline-block w-2.5 h-5 ml-0.5 bg-gray-300 align-middle"
        style={{
          animation: 'blink 1s step-end infinite',
          opacity: isTypingComplete ? 1 : 0
        }}
      />
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default AboutText;