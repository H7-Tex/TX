'use client';

import { useEffect, useState } from 'react';

const InceptionTimer = () => {
  const [timeSinceInception, setTimeSinceInception] = useState('');
  const BEGIN_DATE = new Date('2024-03-01T00:00:00').valueOf();

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const diff = (now - BEGIN_DATE) / 1000 / 60 / 60 / 24 / 365;
      setTimeSinceInception(diff.toFixed(11));
    };

    const intervalId = setInterval(updateTimer, 10);
    updateTimer();

    return () => clearInterval(intervalId);
  }, [BEGIN_DATE]);

  return (
    <div className="text-green-500 font-mono text-xl font-bold text-center mb-8">
      <span>{timeSinceInception}</span> years since inception!
    </div>
  );
};

export default InceptionTimer;
