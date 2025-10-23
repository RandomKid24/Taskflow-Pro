import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CollaborationSidebar = ({ isVisible, onToggle }) => {
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Mock active users data
    const mockActiveUsers = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
      avatarAlt: 'Professional headshot of Asian woman with shoulder-length black hair in white blouse',
      status: 'active',
      currentTask: 'Editing Task #247',
      cursor: { x: 150, y: 200 }
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
      avatarAlt: 'Professional headshot of Hispanic man with short black hair in navy suit',
      status: 'active',
      currentTask: 'Reviewing priorities',
      cursor: { x: 300, y: 150 }
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      avatarAlt: 'Professional headshot of blonde woman in blue blazer smiling at camera',
      status: 'away',
      currentTask: 'Last seen 5 min ago',
      cursor: null
    }];


    // Mock recent activity data
    const mockActivity = [
    {
      id: 1,
      user: 'Sarah Chen',
      action: 'completed',
      target: 'Design Review Task',
      timestamp: new Date(Date.now() - 300000),
      type: 'task-complete'
    },
    {
      id: 2,
      user: 'Mike Rodriguez',
      action: 'commented on',
      target: 'API Integration',
      timestamp: new Date(Date.now() - 600000),
      type: 'comment'
    },
    {
      id: 3,
      user: 'Emma Wilson',
      action: 'assigned',
      target: 'Bug Fix #123',
      timestamp: new Date(Date.now() - 900000),
      type: 'assignment'
    },
    {
      id: 4,
      user: 'David Kim',
      action: 'created',
      target: 'New Feature Spec',
      timestamp: new Date(Date.now() - 1200000),
      type: 'task-create'
    }];


    setActiveUsers(mockActiveUsers);
    setRecentActivity(mockActivity);
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'task-complete':return 'CheckCircle';
      case 'comment':return 'MessageCircle';
      case 'assignment':return 'UserPlus';
      case 'task-create':return 'Plus';
      default:return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'task-complete':return 'text-green-600';
      case 'comment':return 'text-blue-600';
      case 'assignment':return 'text-purple-600';
      case 'task-create':return 'text-amber-600';
      default:return 'text-muted-foreground';
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-1000">
        <Button
          variant="primary"
          size="sm"
          onClick={onToggle}
          iconName="Users"
          className="rounded-full w-10 h-10 flex items-center justify-center shadow-elevation-3" />

      </div>);

  }

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-elevation-3 z-1000 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Team Activity</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/team-collaboration-hub')}
              iconName="ExternalLink" />

            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              iconName="X" />

          </div>
        </div>
      </div>
      {/* Active Users */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Active Now ({activeUsers?.filter((u) => u?.status === 'active')?.length})
        </h4>
        <div className="space-y-3">
          {activeUsers?.map((user) =>
          <div key={user?.id} className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                  src={user?.avatar}
                  alt={user?.avatarAlt}
                  className="w-full h-full object-cover" />

                </div>
                {user?.status === 'active' &&
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-card"></div>
              }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.currentTask}
                </p>
              </div>
              {user?.cursor &&
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            }
            </div>
          )}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Activity</h4>
          <div className="space-y-3">
            {recentActivity?.map((activity) =>
            <div key={activity?.id} className="flex items-start gap-3">
                <div className={`mt-0.5 ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity?.user}</span>
                    {' '}{activity?.action}{' '}
                    <span className="font-medium">{activity?.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity?.timestamp)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/team-collaboration-hub')}
            iconName="Users"
            iconPosition="left"
            className="w-full justify-start">

            Team Hub
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('Invite member')}
            iconName="UserPlus"
            iconPosition="left"
            className="w-full justify-start">

            Invite Member
          </Button>
        </div>
      </div>
    </div>);

};

export default CollaborationSidebar;