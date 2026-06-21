'use client';

import { useState, useEffect } from 'react';
import { DigitStream, DigitCursor } from './digit-stream';
import { SmallRobotIcon } from './robot-icon';
import { SignalChart } from './signal-chart';

interface PredictionResult {
  value: string | number;
  confidence: number;
  description: string;
}

interface AnalysisSectionProps {
  title: string;
  onPredict: () => PredictionResult;
  latestDigit?: number | null;
}

export function AnalysisSection({ title, onPredict, latestDigit }: AnalysisSectionProps) {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);

  useEffect(() => {
    if (prediction) {
      const timer = setTimeout(() => {
        setShowPrediction(false);
        setPrediction(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [prediction]);

  const handleAnalyze = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const result = onPredict();
      setPrediction(result);
      setShowPrediction(true);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="border-glow p-6 rounded-lg bg-card/50 backdrop-blur-sm space-y-4">
      {/* Header with Robot */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 text-primary">
          <SmallRobotIcon />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>

      {/* Digit Stream */}
      <div className="mb-6">
        <DigitStream latestDigit={latestDigit} />
      </div>

      {/* Cursor */}
      <div className="mb-6">
        <DigitCursor digit={latestDigit ?? null} isActive={true} />
      </div>

      {/* Signal Chart */}
      <div className="mb-6">
        <SignalChart title="Market Signal Analysis" />
      </div>

      {/* Predict Button */}
      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className={`w-full py-3 font-bold rounded-lg transition-all duration-300 ${
          isLoading
            ? 'bg-primary/50 cursor-not-allowed scanner-effect'
            : 'bg-primary hover:bg-primary/80 glow-red hover:glow-red-intense hover:scale-105 active:scale-95'
        } text-primary-foreground`}
      >
        {isLoading ? 'ANALYZING...' : `ANALYZE ${title.split('/')[0].trim().replace(' ', '_').toUpperCase()}`}
      </button>

      {/* Prediction Result */}
      {showPrediction && prediction && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-3 p-4 bg-accent/10 border-2 border-accent rounded-lg">
          <div className="text-lg font-bold text-accent">
            {prediction.value === 'EVEN' && '🔵'} 
            {prediction.value === 'ODD' && '🔴'}
            {prediction.value === 'OVER' && '🟢'}
            {prediction.value === 'UNDER' && '🟡'}
            {typeof prediction.value === 'number' && '🎯'} Prediction: {prediction.value}
            {' '} 📊 Confidence: {prediction.confidence}%
          </div>
          <p className="text-sm text-muted-foreground">{prediction.description}</p>
        </div>
      )}
    </div>
  );
}
