import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const CollaborationIndicator = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const navigate = useNavigate();

  // Simulate real-time collaboration data
  useEffect(() => {
    const mockCollaborators = [
      {
        id: 1,
        name: 'Sarah Chen',
        avatar: 'SC',
        status: 'active',
        activity: 'Editing Task #247',
        lastSeen: 'now'
      },
      {
        id: 2,
        name: 'Mike Rodriguez',
        avatar: 'MR',
        status: 'active',
        activity: 'Reviewing Diagram',
        lastSeen: '2 min ago'
      },
      {
        id: 3,
        name: 'Emma Wilson',
        avatar: 'EW',
        status: 'away',
        activity: 'Last seen in Team Hub',
        lastSeen: '15 min ago'
      }
    ];

    setCollaborators(mockCollaborators);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setCollaborators(prev => 
        prev?.map(collab => ({
          ...collab,
          lastSeen: collab?.status === 'active' ? 'now' : collab?.lastSeen
        }))
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const activeCount = collaborators?.filter(c => c?.status === 'active')?.length;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const goToTeamHub = () => {
    navigate('/team-collaboration-hub');
    setIsExpanded(false);
  };

  return (
    <div className="relative">
      {/* Collaboration Status Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleExpanded}
        className="flex items-center space-x-2"
      >
        <div className="flex -space-x-1">
          {collaborators?.slice(0, 3)?.map((collab, index) => (
            <div
              key={collab?.id}
              className="relative w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium border-2 border-card"
              style={{ zIndex: 10 - index }}
            >
              {collab?.avatar}
              {collab?.status === 'active' && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-success rounded-full border border-card"></div>
              )}
            </div>
          ))}
        </div>
        <span className="hidden sm:inline text-sm text-muted-foreground">
          {activeCount} active
        </span>
        <Icon name="ChevronDown" size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </Button>
      {/* Expanded Collaboration Panel */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-elevation-3 z-1010">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Team Activity</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={goToTeamHub}
                iconName="ExternalLink"
              >
                Team Hub
              </Button>
            </div>

            <div className="space-y-3">
              {collaborators?.map((collab) => (
                <div key={collab?.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {collab?.avatar}
                    </div>
                    {collab?.status === 'active' && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border border-card"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {collab?.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {collab?.activity}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {collab?.lastSeen}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{collaborators?.length} team members</span>
                <span>{activeCount} currently active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationIndicator;