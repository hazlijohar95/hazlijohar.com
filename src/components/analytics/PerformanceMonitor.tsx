import React, { useState, useEffect } from 'react';
import { Activity, Zap, Clock, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getStoredMetrics, type PerformanceMetrics } from '@/utils/performance';

interface PerformanceScore {
  metric: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  threshold: { good: number; poor: number };
}

const performanceThresholds = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 }
};

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [scores, setScores] = useState<PerformanceScore[]>([]);
  const [overallScore, setOverallScore] = useState<number>(0);

  useEffect(() => {
    // Load stored metrics
    const storedMetrics = getStoredMetrics();
    setMetrics(storedMetrics);

    // Calculate performance scores
    const latestMetrics = getLatestMetrics(storedMetrics);
    const calculatedScores = calculatePerformanceScores(latestMetrics);
    setScores(calculatedScores);

    // Calculate overall performance score
    const overall = calculateOverallScore(calculatedScores);
    setOverallScore(overall);
  }, []);

  const getLatestMetrics = (allMetrics: PerformanceMetrics[]): Record<string, PerformanceMetrics> => {
    const latest: Record<string, PerformanceMetrics> = {};
    
    allMetrics.forEach(metric => {
      if (!latest[metric.name] || metric.timestamp > latest[metric.name].timestamp) {
        latest[metric.name] = metric;
      }
    });
    
    return latest;
  };

  const calculatePerformanceScores = (latestMetrics: Record<string, PerformanceMetrics>): PerformanceScore[] => {
    return Object.entries(performanceThresholds).map(([metricName, threshold]) => {
      const metric = latestMetrics[metricName];
      const value = metric?.value || 0;
      
      let rating: 'good' | 'needs-improvement' | 'poor' = 'good';
      if (value > threshold.poor) rating = 'poor';
      else if (value > threshold.good) rating = 'needs-improvement';
      
      return {
        metric: metricName,
        value,
        rating,
        threshold
      };
    });
  };

  const calculateOverallScore = (scores: PerformanceScore[]): number => {
    if (scores.length === 0) return 0;
    
    const scoreValues = scores.map(score => {
      if (score.rating === 'good') return 90;
      if (score.rating === 'needs-improvement') return 50;
      return 25;
    });
    
    return Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length);
  };

  const getScoreColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-500';
      case 'needs-improvement': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getScoreIcon = (rating: string) => {
    switch (rating) {
      case 'good': return <Zap className="h-4 w-4 text-green-500" />;
      case 'needs-improvement': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'poor': return <Activity className="h-4 w-4 text-red-500" />;
      default: return <Eye className="h-4 w-4 text-gray-500" />;
    }
  };

  const getBadgeVariant = (rating: string) => {
    switch (rating) {
      case 'good': return 'default';
      case 'needs-improvement': return 'secondary';
      case 'poor': return 'destructive';
      default: return 'outline';
    }
  };

  const formatMetricValue = (metric: string, value: number): string => {
    if (metric === 'CLS') {
      return value.toFixed(3);
    }
    return `${Math.round(value)}ms`;
  };

  const getProgressValue = (score: PerformanceScore): number => {
    const { value, threshold } = score;
    if (value <= threshold.good) return 100;
    if (value <= threshold.poor) return 60;
    return 30;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="h-6 w-6 text-blue-500" />
        <h2 className="text-2xl font-bold">Performance Monitor</h2>
      </div>

      {/* Overall Performance Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Overall Performance Score</span>
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-bold ${
                overallScore >= 90 ? 'text-green-500' :
                overallScore >= 50 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {overallScore}
              </span>
              <span className="text-muted-foreground">/100</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={overallScore} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            Based on Core Web Vitals and custom performance metrics
          </p>
        </CardContent>
      </Card>

      {/* Individual Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scores.map((score) => (
          <Card key={score.metric}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getScoreIcon(score.rating)}
                  <span className="font-semibold">{score.metric}</span>
                </div>
                <Badge variant={getBadgeVariant(score.rating)}>
                  {score.rating.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current</span>
                  <span className={`font-mono ${getScoreColor(score.rating)}`}>
                    {formatMetricValue(score.metric, score.value)}
                  </span>
                </div>
                
                <Progress value={getProgressValue(score)} className="h-2" />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Good: &lt;{formatMetricValue(score.metric, score.threshold.good)}</span>
                  <span>Poor: &gt;{formatMetricValue(score.metric, score.threshold.poor)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Metrics History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Performance Data</CardTitle>
        </CardHeader>
        <CardContent>
          {metrics.length > 0 ? (
            <div className="space-y-2">
              {metrics.slice(-10).reverse().map((metric, index) => (
                <div key={`${metric.id}-${index}`} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-2">
                    {getScoreIcon(metric.rating)}
                    <span className="font-medium">{metric.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {metric.rating}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className={`font-mono ${getScoreColor(metric.rating)}`}>
                      {formatMetricValue(metric.name, metric.value)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(metric.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No performance data available yet.</p>
              <p className="text-sm">Metrics will appear as you navigate the site.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Optimization Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Optimization Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Largest Contentful Paint (LCP)</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Optimize images and use next-gen formats</li>
                <li>• Preload critical resources</li>
                <li>• Use CDN for static assets</li>
                <li>• Minimize render-blocking resources</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Cumulative Layout Shift (CLS)</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Set explicit dimensions for images</li>
                <li>• Reserve space for dynamic content</li>
                <li>• Avoid inserting content above existing content</li>
                <li>• Use CSS transforms for animations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMonitor;