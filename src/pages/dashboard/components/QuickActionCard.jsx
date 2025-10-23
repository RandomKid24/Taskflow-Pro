import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, route, color = 'primary', badge = null }) => {
  const navigate = useNavigate();

  const getColorClasses = () => {
    const colorMap = {
      primary: 'bg-primary/10 text-primary border-primary/20',
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      error: 'bg-error/10 text-error border-error/20',
      secondary: 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-smooth cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses()}`}>
          <Icon name={icon} size={24} />
        </div>
        {badge && (
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
            {badge}
          </span>
        )}
      </div>
      
      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
        {title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {description}
      </p>
      
      <Button
        variant="ghost"
        size="sm"
        iconName="ArrowRight"
        iconPosition="right"
        className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary"
      >
        Get Started
      </Button>
    </div>
  );
};

export default QuickActionCard;