import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, Gauge, Trash2, RefreshCw } from 'lucide-react';
import { getStoredMetrics, clearStoredMetrics, type PerformanceMetrics } from '@/utils/performance';

const PerformanceMetricsComponent = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadMetrics = () => {
    setMetrics(getStoredMetrics());
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadMetrics();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleClear = () => {
    clearStoredMetrics();
    setMetrics([]);
  };

  useEffect(() => {
    loadMetrics();

    // Refresh metrics every 30 seconds
    const interval = setInterval(loadMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const getMetricIcon = (name: string) => {
    switch (name) {
      case 'CLS':
        return <Activity className="h-4 w-4" />;
      case 'FCP':
      case 'LCP':
        return <Clock className="h-4 w-4" />;
      case 'TTFB':
        return <Gauge className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getMetricDescription = (name: string) => {
    switch (name) {
      case 'CLS':
        return 'Cumulative Layout Shift';
      case 'FCP':
        return 'First Contentful Paint';
      case 'LCP':
        return 'Largest Contentful Paint';
      case 'TTFB':
        return 'Time to First Byte';
      case 'PAGE_LOAD':
        return 'Page Load Time';
      case 'DOM_CONTENT_LOADED':
        return 'DOM Content Loaded';
      case 'SLOW_RESOURCE':
        return 'Slow Resource Loading';
      default:
        return name;
    }
  };

  const formatValue = (name: string, value: number) => {
    if (name === 'CLS') {
      return value.toFixed(3);
    }
    return Math.round(value) + 'ms';
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'bg-green-600';
      case 'needs-improvement':
        return 'bg-yellow-600';
      case 'poor':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const latestMetrics = metrics.reduce((acc, metric) => {
    if (!acc[metric.name] || metric.timestamp > acc[metric.name].timestamp) {
      acc[metric.name] = metric;
    }
    return acc;
  }, {} as Record<string, PerformanceMetrics>);

  return (
    <Card className="bg-[#111] border-[#333] text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="border-[#444] hover:bg-[#222]"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="border-[#444] hover:bg-[#222] text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {Object.keys(latestMetrics).length === 0 ? (
          <div className="text-center py-8 text-[#666]">
            <Gauge className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No performance metrics collected yet.</p>
            <p className="text-sm mt-1">Browse the site to collect Web Vitals data.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(latestMetrics).map((metric) => (
                <div
                  key={metric.id}
                  className="border border-[#333] rounded-lg p-4 bg-[#0A0A0A]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getMetricIcon(metric.name)}
                      <span className="font-semibold text-sm">{metric.name}</span>
                    </div>
                    <Badge className={getRatingColor(metric.rating)}>
                      {metric.rating.replace('-', ' ')}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#999] mb-1">
                    {getMetricDescription(metric.name)}
                  </p>
                  <p className="text-lg font-bold">
                    {formatValue(metric.name, metric.value)}
                  </p>
                  <p className="text-xs text-[#666] mt-1">
                    {new Date(metric.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>

            {metrics.length > Object.keys(latestMetrics).length && (
              <div className="mt-6 p-3 bg-[#0A0A0A] border border-[#333] rounded">
                <p className="text-sm text-[#999]">
                  Showing latest metrics from {Object.keys(latestMetrics).length} categories.
                  Total measurements: {metrics.length}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsComponent;