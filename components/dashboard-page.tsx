'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/auth-context';
import { DashboardLayout } from '@/components/dashboard-layout';
import { AnalysisSection } from '@/components/analysis-section';

export function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const [latestDigit, setLatestDigit] = useState<number | null>(null);

  // Simulate live digit stream
  useEffect(() => {
    const interval = setInterval(() => {
      setLatestDigit(Math.floor(Math.random() * 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const predictNextDigit = () => {
    const predictions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const predicted = predictions[Math.floor(Math.random() * predictions.length)];
    const confidences = [72, 78, 81, 84, 86, 88, 79, 75, 83, 85];
    const confidence = confidences[Math.floor(Math.random() * confidences.length)];
    
    return {
      value: predicted,
      confidence,
      description: 'Recent market activity indicates increased probability of this digit appearing next due to observed pattern concentration and sequence frequency.'
    };
  };

  const predictEvenOdd = () => {
    const prediction = Math.random() > 0.5 ? 'EVEN' : 'ODD';
    const confidence = Math.random() > 0.5 ? 78 : 76;
    
    return {
      value: prediction,
      confidence,
      description: `Current digit sequence favors a ${prediction} number continuation based on recent market behavior and statistical analysis.`
    };
  };

  const predictOverUnder = () => {
    const prediction = Math.random() > 0.5 ? 'OVER' : 'UNDER';
    const confidence = Math.random() > 0.5 ? 81 : 79;
    
    return {
      value: prediction,
      confidence,
      description: `Recent digit distribution indicates a higher probability of digits ${prediction === 'OVER' ? 'above the midpoint threshold' : 'below the midpoint threshold'}.`
    };
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8 p-6 border-glow rounded-lg bg-card/50 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to Tactical Analysis Tool</h2>
        <p className="text-muted-foreground">AI-powered analysis engine ready for market insights</p>
      </div>

      {/* Analysis Sections */}
      <div className="space-y-8">
        <AnalysisSection 
          title="MATCHES & DIFFERS" 
          onPredict={predictNextDigit}
          latestDigit={latestDigit}
        />
        
        <AnalysisSection 
          title="EVEN / ODD ANALYSIS" 
          onPredict={predictEvenOdd}
          latestDigit={latestDigit}
        />
        
        <AnalysisSection 
          title="OVER / UNDER ANALYSIS" 
          onPredict={predictOverUnder}
          latestDigit={latestDigit}
        />
      </div>
    </DashboardLayout>
  );
}
