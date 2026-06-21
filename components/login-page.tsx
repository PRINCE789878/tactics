'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/auth-context';
import { RobotIcon } from '@/components/robot-icon';
import Link from 'next/link';

export function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!termsAccepted) {
      setError('Please accept the Terms and Conditions');
      return;
    }

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    
    // Simulate a brief delay for "robot scanning"
    setTimeout(() => {
      if (login(username, password)) {
        // Redirect will happen automatically via useAuth in layout
        window.location.href = '/dashboard';
      } else {
        setError('Invalid credentials');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleWhatsAppAccess = () => {
    const phoneNumber = '+254100737377';
    const message = 'Hello, I need access to the Tactical Analysis Tool';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background grid-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 right-10 w-40 h-40 border border-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 border border-secondary rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header with Robot */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 mb-4 text-primary animate-bounce">
            <RobotIcon animated={true} />
          </div>
          
          <h1 className="text-4xl font-bold text-center text-foreground mb-2 neon-flicker">
            TACTICAL ANALYSIS TOOL
          </h1>
          
          <p className="text-sm text-center text-muted-foreground mb-8">
            Advanced AI Analysis for Deriv Digit Markets
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5 border-glow p-6 rounded-lg bg-card/50 backdrop-blur-sm">
          {/* Username */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2 bg-input border border-primary rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground"></p>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 bg-input border border-primary rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground"></p>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3 p-3 bg-muted/30 rounded-md">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 border border-primary rounded accent-primary cursor-pointer"
              disabled={isLoading}
            />
            <label htmlFor="terms" className="text-sm text-foreground cursor-pointer">
              I agree to the Terms and Conditions
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-destructive/20 border border-destructive rounded-md text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-bold text-lg rounded-md transition-all duration-300 ${
              isLoading
                ? 'bg-primary/50 cursor-not-allowed scanner-effect'
                : 'bg-primary hover:bg-primary/80 glow-red hover:glow-red-intense hover:scale-105 active:scale-95'
            } text-primary-foreground`}
          >
            {isLoading ? 'SCANNING...' : 'LOGIN'}
          </button>

          {/* Get Access Button */}
          <button
            type="button"
            onClick={handleWhatsAppAccess}
            disabled={isLoading}
            className="w-full py-3 font-bold text-lg rounded-md transition-all duration-300 bg-secondary/20 border-2 border-secondary hover:bg-secondary/40 hover:border-accent hover:glow-red hover:scale-105 active:scale-95 text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            GET ACCESS
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground border-t border-primary/30 pt-6">
          <p className="flex items-center justify-center gap-2 mb-2">
            <div className="w-1 h-1 rounded-full bg-accent animate-pulse"></div>
            AI SYSTEM ONLINE
            <div className="w-1 h-1 rounded-full bg-accent animate-pulse"></div>
          </p>
          <p>© 2026 Tactical Analysis Tool. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
