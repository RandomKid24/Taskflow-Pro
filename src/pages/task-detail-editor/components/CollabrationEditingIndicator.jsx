import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CollaborativeEditingIndicator = () => {
  const [activeCollaborators, setActiveCollaborators] = useState([]);
  const [typingIndicators, setTypingIndicators] = useState([]);
  const [conflicts, setConflicts] = useState([]);

  // Mock collaborative editing data
  useEffect(() => {
    const mockCollaborators = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
      avatarAlt: 'Professional headshot of Asian woman with shoulder-length black hair in white blouse',
      section: 'description',
      cursor: { line: 5, column: 12 },
      color: '#3B82F6'
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
      avatarAlt: 'Professional headshot of Hispanic man with short black hair in navy suit',
      section: 'metadata',
      cursor: null,
      color: '#10B981'
    }];


    const mockTyping = [
    {
      userId: 1,
      name: 'Sarah Chen',
      section: 'description',
      timestamp: Date.now()
    }];


    const mockConflicts = [
    {
      id: 1,
      field: 'priority',
      users: ['Sarah Chen', 'Mike Rodriguez'],
      values: ['High', 'Medium'],
      timestamp: Date.now() - 30000
    }];


    setActiveCollaborators(mockCollaborators);
    setTypingIndicators(mockTyping);
    setConflicts(mockConflicts);

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update typing indicators
      setTypingIndicators((prev) =>
      prev?.filter((indicator) => Date.now() - indicator?.timestamp < 3000)
      );

      // Simulate new typing
      if (Math.random() > 0.7) {
        setTypingIndicators((prev) => {
          const newIndicator = {
            userId: Math.random() > 0.5 ? 1 : 2,
            name: Math.random() > 0.5 ? 'Sarah Chen' : 'Mike Rodriguez',
            section: Math.random() > 0.5 ? 'description' : 'comments',
            timestamp: Date.now()
          };
          return [...prev?.filter((p) => p?.userId !== newIndicator?.userId), newIndicator];
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const resolveConflict = (conflictId, selectedValue) => {
    setConflicts(conflicts?.filter((c) => c?.id !== conflictId));
    // In a real app, this would sync the resolution with other users
  };

  const getSectionName = (section) => {
    const sectionMap = {
      description: 'Task Description',
      metadata: 'Task Details',
      comments: 'Comments',
      attachments: 'Attachments'
    };
    return sectionMap?.[section] || section;
  };

  return (
    <div className="space-y-4">
      {/* Active Collaborators */}
      {activeCollaborators?.length > 0 &&
      <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-foreground">
              Active Collaborators ({activeCollaborators?.length})
            </h4>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
          </div>

          <div className="space-y-2">
            {activeCollaborators?.map((collaborator) =>
          <div key={collaborator?.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <Image
                    src={collaborator?.avatar}
                    alt={collaborator?.avatarAlt}
                    className="w-full h-full object-cover" />

                    </div>
                    <div
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-card"
                  style={{ backgroundColor: collaborator?.color }}>
                </div>
                  </div>
                  <span className="text-sm text-foreground">{collaborator?.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    {getSectionName(collaborator?.section)}
                  </span>
                  {collaborator?.cursor &&
              <div className="flex items-center space-x-1">
                      <Icon name="MousePointer" size={12} style={{ color: collaborator?.color }} />
                      <span className="text-xs text-muted-foreground">
                        L{collaborator?.cursor?.line}:C{collaborator?.cursor?.column}
                      </span>
                    </div>
              }
                </div>
              </div>
          )}
          </div>
        </div>
      }
      {/* Typing Indicators */}
      {typingIndicators?.length > 0 &&
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm text-blue-700">
              {typingIndicators?.map((t) => t?.name)?.join(', ')} 
              {typingIndicators?.length === 1 ? ' is' : ' are'} typing in {getSectionName(typingIndicators?.[0]?.section)}...
            </span>
          </div>
        </div>
      }
      {/* Conflict Resolution */}
      {conflicts?.length > 0 &&
      <div className="space-y-2">
          {conflicts?.map((conflict) =>
        <div key={conflict?.id} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">
                    Conflict in {conflict?.field}
                  </span>
                </div>
                <span className="text-xs text-amber-600">
                  {Math.floor((Date.now() - conflict?.timestamp) / 1000)}s ago
                </span>
              </div>

              <p className="text-sm text-amber-700 mb-3">
                Multiple users have different values for this field. Choose the correct value:
              </p>

              <div className="space-y-2">
                {conflict?.values?.map((value, index) =>
            <div key={index} className="flex items-center justify-between bg-white rounded border p-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">{value}</span>
                      <span className="text-xs text-muted-foreground">
                        by {conflict?.users?.[index]}
                      </span>
                    </div>
                    <button
                onClick={() => resolveConflict(conflict?.id, value)}
                className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90 transition-colors">

                      Choose
                    </button>
                  </div>
            )}
              </div>

              <div className="mt-3 pt-2 border-t border-amber-200">
                <p className="text-xs text-amber-600">
                  This conflict will auto-resolve in 2 minutes if no action is taken.
                </p>
              </div>
            </div>
        )}
        </div>
      }
      {/* Sync Status */}
      <div className="bg-muted/50 rounded-lg p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Wifi" size={14} className="text-green-600" />
            <span className="text-xs text-muted-foreground">Connected</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Save" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Auto-saved 2s ago</span>
          </div>
        </div>
      </div>
    </div>);

};

export default CollaborativeEditingIndicator;