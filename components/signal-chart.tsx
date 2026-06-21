'use client';

import { useEffect, useState } from 'react';

interface SignalChartProps {
  title: string;
  height?: string;
}

export function SignalChart({ title, height = 'h-48' }: SignalChartProps) {
  const [signals, setSignals] = useState<number[]>([]);

  useEffect(() => {
    // Generate initial signals
    const initialSignals = Array.from({ length: 20 }, () => Math.random() * 100);
    setSignals(initialSignals);

    // Update signals periodically
    const interval = setInterval(() => {
      setSignals(prev => {
        const newSignals = [...prev.slice(1), Math.random() * 100];
        return newSignals;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const maxSignal = Math.max(...signals, 1);
  const width = 100 / signals.length;

  return (
    <div className="w-full space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className={`${height} bg-muted/20 border border-primary/30 rounded-lg p-4 flex items-end gap-1 overflow-hidden`}>
        {signals.map((signal, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-accent via-primary to-transparent hover:from-secondary transition-all rounded-t-sm origin-bottom"
            style={{
              height: `${(signal / maxSignal) * 100}%`,
              minHeight: '2px',
              opacity: 0.8 + (0.2 * (i / signals.length)),
            }}
            title={`${signal.toFixed(1)}`}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground px-1">
        <span>0</span>
        <span className="text-accent font-semibold">Signal Strength</span>
        <span>100</span>
      </div>
    </div>
  );
}
