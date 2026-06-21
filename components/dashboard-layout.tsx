'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/auth-context';
import { RobotIcon, SmallRobotIcon } from '@/components/robot-icon';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [signalBars, setSignalBars] = useState<number>(0);
  const [selectedVolatility, setSelectedVolatility] = useState<string>('V25');

  const volatilityOptions = [
    'V10',
    'V25',
    'V50',
    'V75',
    'V100',
    'V10 (1s)',
    'V25 (1s)',
    'V50 (1s)',
    'V75 (1s)',
    'V100 (1s)',
  ];

  useEffect(() => {
    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Animate signal bars
    const signalInterval = setInterval(() => {
      setSignalBars(prev => (prev + 1) % 4);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(signalInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background grid-background text-foreground">
      {/* Header */}
      <header className="border-b border-primary/30 bg-card/40 backdrop-blur-sm p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 text-primary">
              <RobotIcon />
            </div>
            <div>
              <h1 className="text-xl font-bold neon-flicker">TACTICAL ANALYSIS TOOL</h1>
              <p className="text-xs text-muted-foreground">Advanced AI Analysis for Deriv Digit Markets</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Volatility Dropdown */}
            <select
              value={selectedVolatility}
              onChange={(e) => setSelectedVolatility(e.target.value)}
              className="px-3 py-2 bg-input border border-primary rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
            >
              {volatilityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map(i => (
                  <div
                    key={i}
                    className={`w-1.5 h-3 rounded-sm transition-all ${
                      i <= signalBars ? 'bg-accent glow-red' : 'bg-muted'
                    }`}
                  ></div>
                ))}
              </div>
              <span className="text-muted-foreground">CONNECTED</span>
            </div>

            {/* Clock */}
            <div className="text-sm font-mono border border-primary/30 px-3 py-1.5 rounded bg-muted/20">
              {currentTime}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse glow-red"></div>
              <span>AI ONLINE</span>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="px-4 py-2 bg-destructive/20 border border-destructive rounded-md text-destructive hover:bg-destructive/30 transition-all text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/30 bg-card/40 backdrop-blur-sm mt-12 p-6">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 text-muted-foreground">
              <SmallRobotIcon />
            </div>
            <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-transparent"></div>
          </div>
          <p className="text-foreground font-semibold">© 2026 Tactical Analysis Tool. All Rights Reserved.</p>
          <p className="text-sm text-muted-foreground">AI-Powered Market Analysis Dashboard</p>
        </div>
      </footer>
    </div>
  );
}
