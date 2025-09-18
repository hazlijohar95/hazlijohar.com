import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SecurityIssue {
  id: string;
  level: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  recommendation: string;
  category: string;
  status: 'fixed' | 'pending' | 'acknowledged';
}

const mockSecurityIssues: SecurityIssue[] = [
  {
    id: '1',
    level: 'high',
    title: 'Server-Side Rate Limiting Required',
    description: 'Client-side rate limiting can be bypassed by attackers and provides no real security.',
    recommendation: 'Implement server-side rate limiting using Supabase Edge Functions or Cloudflare.',
    category: 'Authentication',
    status: 'pending'
  },
  {
    id: '2',
    level: 'medium',
    title: 'Environment Variable Security',
    description: 'Ensure all sensitive credentials are properly managed and rotated.',
    recommendation: 'Use Supabase secrets management for all API keys and credentials.',
    category: 'Configuration',
    status: 'acknowledged'
  },
  {
    id: '3',
    level: 'low',
    title: 'Content Security Policy',
    description: 'CSP headers are configured but could be enhanced for better security.',
    recommendation: 'Review and tighten CSP directives for production deployment.',
    category: 'Headers',
    status: 'fixed'
  },
  {
    id: '4',
    level: 'info',
    title: 'Security Headers Implemented',
    description: 'Basic security headers are properly configured.',
    recommendation: 'Continue monitoring and updating security headers as needed.',
    category: 'Headers',
    status: 'fixed'
  }
];

const SecurityAudit: React.FC = () => {
  const [issues, setIssues] = useState<SecurityIssue[]>(mockSecurityIssues);
  const [isScanning, setIsScanning] = useState(false);

  const getIssueIcon = (level: SecurityIssue['level']) => {
    switch (level) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getBadgeVariant = (level: SecurityIssue['level']) => {
    switch (level) {
      case 'critical':
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: SecurityIssue['status']) => {
    switch (status) {
      case 'fixed':
        return 'text-green-600';
      case 'pending':
        return 'text-red-600';
      case 'acknowledged':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const runSecurityScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  const criticalCount = issues.filter(i => i.level === 'critical').length;
  const highCount = issues.filter(i => i.level === 'high').length;
  const mediumCount = issues.filter(i => i.level === 'medium').length;
  const fixedCount = issues.filter(i => i.status === 'fixed').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Security Audit Dashboard</h2>
        </div>
        <Button 
          onClick={runSecurityScan}
          disabled={isScanning}
          variant="outline"
        >
          {isScanning ? 'Scanning...' : 'Run Security Scan'}
        </Button>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-500">{criticalCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High</p>
                <p className="text-2xl font-bold text-red-400">{highCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Medium</p>
                <p className="text-2xl font-bold text-yellow-500">{mediumCount}</p>
              </div>
              <Info className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fixed</p>
                <p className="text-2xl font-bold text-green-500">{fixedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Issues List */}
      <Card>
        <CardHeader>
          <CardTitle>Security Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getIssueIcon(issue.level)}
                    <h3 className="font-semibold">{issue.title}</h3>
                    <Badge variant={getBadgeVariant(issue.level)}>
                      {issue.level.toUpperCase()}
                    </Badge>
                  </div>
                  <span className={`text-sm font-medium ${getStatusColor(issue.status)}`}>
                    {issue.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">{issue.description}</p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      Recommendation:
                    </p>
                    <p className="text-blue-800 dark:text-blue-200">
                      {issue.recommendation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Category: {issue.category}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Security Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Before Production Deployment</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Implement server-side rate limiting</li>
                <li>• Configure all environment variables</li>
                <li>• Enable security headers in production</li>
                <li>• Set up error monitoring (Sentry)</li>
                <li>• Configure WAF rules if using Cloudflare</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Ongoing Security</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Regular security scans</li>
                <li>• Monitor authentication patterns</li>
                <li>• Review API usage anomalies</li>
                <li>• Update dependencies regularly</li>
                <li>• Annual penetration testing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityAudit;