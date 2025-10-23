import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      label: 'GDPR Compliant',
      description: 'Privacy protected'
    },
    {
      icon: 'CheckCircle',
      label: 'SOC 2 Certified',
      description: 'Security audited'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-muted-foreground">
            <Icon name={feature?.icon} size={16} className="text-success" />
            <div className="text-center sm:text-left">
              <p className="text-xs font-medium">{feature?.label}</p>
              <p className="text-xs opacity-75">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Your data is protected with enterprise-grade security
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;