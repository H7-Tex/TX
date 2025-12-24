'use client';

import { useState } from 'react';

interface CTFEvent {
  name: string;
  points: number;
  ratingPoints: number;
  place: number;
  date: string;
}

const parseEvents = (): CTFEvent[] => {
  return [
    {
      name: "World Wide CTF 2024",
      points: 1578.0,
      ratingPoints: 5.085,
      place: 37,
      date: "2024-11",
    },
    {
      name: "OSCTF",
      points: 7310.0,
      ratingPoints: 17.74,
      place: 9,
      date: "2024-07",
    },
    {
      name: "Z3R0 D4Y CTF",
      points: 3930.0,
      ratingPoints: 32.839,
      place: 3,
      date: "2024-10",
    },
  ];
};

export default function CTFTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<CTFEvent | null>(null);
  const events = parseEvents();

  return (
    <section className="py-12 relative">
      <h2 className="text-2xl font-mono mb-8 text-white text-center">CTF Journey</h2>
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute h-full w-0.5 bg-green-800 left-4 md:left-1/2 md:-translate-x-1/2" />

          {/* Events */}
          {events.map((event, index) => (
            <div
              key={event.name}
              className={`relative mb-8 md:mb-12 pl-12 md:pl-0 ${
                index % 2 === 0
                  ? 'md:text-right md:pr-8 md:ml-0 md:mr-[50%]'
                  : 'md:text-left md:pl-8 md:ml-[50%] md:mr-0'
              }`}
            >
              <div
                className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <h3 className="text-lg font-mono text-green-400">{event.name}</h3>
                <p className="text-sm text-gray-400">Place: #{event.place}</p>
                <p className="text-sm text-gray-400">Points: {event.points}</p>
              </div>

              {/* Timeline dot - desktop only */}
              <div className="absolute w-3 h-3 bg-green-500 rounded-full top-1/2 -translate-y-1/2 left-4 md:left-1/2 md:-translate-x-1/2 hidden md:block" />

              {/* Timeline dot - mobile only */}
              <div className="absolute w-2 h-2 bg-green-500 rounded-full top-1/2 -translate-y-1/2 left-4 md:hidden" />
            </div>
          ))}
        </div>
      </div>

      {/* Event details popup */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-mono text-green-400 mb-4">{selectedEvent.name}</h3>
            <p className="text-gray-300">Place: #{selectedEvent.place}</p>
            <p className="text-gray-300">Points: {selectedEvent.points}</p>
            <p className="text-gray-300">Rating Points: {selectedEvent.ratingPoints}</p>
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-4 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
