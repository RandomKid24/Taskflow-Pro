import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ActivityFeed = ({ activities, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'tasks', label: 'Task Updates' },
    { value: 'comments', label: 'Comments' },
    { value: 'diagrams', label: 'Diagram Changes' },
    { value: 'assignments', label: 'Assignments' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'task_created': return 'Plus';
      case 'task_completed': return 'CheckCircle';
      case 'task_assigned': return 'UserPlus';
      case 'comment_added': return 'MessageCircle';
      case 'diagram_updated': return 'GitBranch';
      case 'file_uploaded': return 'Upload';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'task_created': return 'text-primary';
      case 'task_completed': return 'text-success';
      case 'task_assigned': return 'text-warning';
      case 'comment_added': return 'text-accent';
      case 'diagram_updated': return 'text-secondary';
      case 'file_uploaded': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
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

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Team Activity</h2>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
        <Select
          options={filterOptions}
          value={selectedFilter}
          onChange={handleFilterChange}
          placeholder="Filter activities"
          className="w-full sm:w-48"
        />
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activities?.map((activity) => (
              <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-smooth">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Image
                      src={activity?.user?.avatar}
                      alt={activity?.user?.avatarAlt}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon 
                        name={getActivityIcon(activity?.type)} 
                        size={16} 
                        className={getActivityColor(activity?.type)}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {activity?.user?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(activity?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mb-2">{activity?.description}</p>
                    {activity?.details && (
                      <div className="bg-muted rounded-md p-3 text-sm">
                        <p className="text-muted-foreground">{activity?.details}</p>
                      </div>
                    )}
                    {activity?.attachments && activity?.attachments?.length > 0 && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {activity?.attachments?.length} attachment(s)
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;