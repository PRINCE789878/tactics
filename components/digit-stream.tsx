'use client';

import { useState, useEffect } from 'react';

interface DigitStreamProps {
  latestDigit?: number | null;
}

export function DigitStream({ latestDigit }: DigitStreamProps) {
  const [digits] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  return (
    <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
      {digits.map(digit => (
        <div key={digit} className="relative">
          <button
            className={`w-full aspect-square rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center ${
              digit === latestDigit
                ? 'bg-accent border-2 border-accent text-background scale-110 glow-red-intense animate-pulse'
                : 'bg-card border-2 border-primary/30 text-foreground hover:border-primary hover:glow-red hover:scale-105'
            }`}
          >
            {digit}
          </button>
        </div>
      ))}
    </div>
  );
}

export function DigitCursor({ digit, isActive }: { digit: number | null; isActive: boolean }) {
  return (
    <div className={`transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
      <div className="flex items-center gap-3 p-3 bg-card border-glow rounded-lg">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-accent bg-accent/10 flex items-center justify-center font-bold text-lg text-accent glow-red">
            {digit}
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-accent animate-pulse glow-red" style={{animationDuration: '1s'}}></div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Latest Digit</p>
          <p className="text-sm font-semibold text-foreground">Stream Active</p>
        </div>
      </div>
    </div>
  );
}
