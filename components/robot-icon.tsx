'use client';

export function RobotIcon({ className = '', animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={`${className} ${animated ? 'animate-bounce' : ''}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <rect x="30" y="20" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" rx="4" />

      {/* Eyes */}
      <circle cx="38" cy="32" r="4" fill="currentColor" className={animated ? 'animate-pulse' : ''} />
      <circle cx="62" cy="32" r="4" fill="currentColor" className={animated ? 'animate-pulse' : ''} />

      {/* Mouth */}
      <line x1="38" y1="50" x2="62" y2="50" stroke="currentColor" strokeWidth="2" />

      {/* Body */}
      <rect x="25" y="65" width="50" height="35" fill="none" stroke="currentColor" strokeWidth="2" rx="4" />

      {/* Chest panel */}
      <rect x="35" y="75" width="30" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />

      {/* Arms */}
      <line x1="25" y1="80" x2="10" y2="80" stroke="currentColor" strokeWidth="2" />
      <line x1="75" y1="80" x2="90" y2="80" stroke="currentColor" strokeWidth="2" />

      {/* Hands */}
      <circle cx="10" cy="80" r="3" fill="currentColor" />
      <circle cx="90" cy="80" r="3" fill="currentColor" />

      {/* Legs */}
      <line x1="40" y1="100" x2="40" y2="115" stroke="currentColor" strokeWidth="2" />
      <line x1="60" y1="100" x2="60" y2="115" stroke="currentColor" strokeWidth="2" />

      {/* Feet */}
      <circle cx="40" cy="115" r="2.5" fill="currentColor" />
      <circle cx="60" cy="115" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function SmallRobotIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 70"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <rect x="18" y="12" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" rx="2" />

      {/* Eyes */}
      <circle cx="23" cy="20" r="2.5" fill="currentColor" />
      <circle cx="37" cy="20" r="2.5" fill="currentColor" />

      {/* Body */}
      <rect x="15" y="40" width="30" height="25" fill="none" stroke="currentColor" strokeWidth="1.5" rx="2" />

      {/* Chest */}
      <rect x="22" y="45" width="16" height="10" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
