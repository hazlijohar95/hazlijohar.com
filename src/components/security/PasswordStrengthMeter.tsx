
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const checks = [
    { label: 'At least 12 characters', test: (pwd: string) => pwd.length >= 12 },
    { label: 'Contains uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'Contains lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'Contains number', test: (pwd: string) => /\d/.test(pwd) },
    { label: 'Contains special character', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
  ];

  const passedChecks = checks.filter(check => check.test(password)).length;
  const strength = (passedChecks / checks.length) * 100;

  const getStrengthColor = () => {
    if (strength < 40) return 'bg-red-500';
    if (strength < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength < 40) return 'Weak';
    if (strength < 80) return 'Good';
    return 'Strong';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Password Strength</span>
        <span className={`text-sm font-medium ${
          strength < 40 ? 'text-red-400' : strength < 80 ? 'text-yellow-400' : 'text-green-400'
        }`}>
          {getStrengthText()}
        </span>
      </div>
      <Progress value={strength} className="h-2" />
      <div className="space-y-1">
        {checks.map((check, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            {check.test(password) ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
            <span className={check.test(password) ? 'text-green-400' : 'text-gray-400'}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
