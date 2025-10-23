import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeedItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    const icons = {
      task_created: 'Plus',
      task_completed: 'CheckCircle',
      task_assigned: 'UserPlus',
      comment_added: 'MessageCircle',
      file_uploaded: 'Upload',
      diagram_created: 'GitBranch',
      list_shared: 'Share',
      deadline_approaching: 'Clock'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      task_created: 'text-primary bg-primary/10',
      task_completed: 'text-success bg-success/10',
      task_assigned: 'text-warning bg-warning/10',
      comment_added: 'text-secondary bg-secondary/10',
      file_uploaded: 'text-accent bg-accent/10',
      diagram_created: 'text-primary bg-primary/10',
      list_shared: 'text-secondary bg-secondary/10',
      deadline_approaching: 'text-error bg-error/10'
    };
    return colors?.[type] || 'text-muted-foreground bg-muted';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="flex items-start space-x-3 py-3">
      <div className={`p-2 rounded-full ${getActivityColor(activity?.type)}`}>
        <Icon name={getActivityIcon(activity?.type)} size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground">
            <span className="font-medium">{activity?.user}</span>
            <span className="text-muted-foreground ml-1">{activity?.action}</span>
            {activity?.target && (
              <span className="font-medium text-foreground ml-1">"{activity?.target}"</span>
            )}
          </p>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
            {formatTimeAgo(activity?.timestamp)}
          </span>
        </div>
        {activity?.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {activity?.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityFeedItem;