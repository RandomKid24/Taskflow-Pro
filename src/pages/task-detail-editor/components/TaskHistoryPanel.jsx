import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TaskHistoryPanel = ({ taskId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [historyItems] = useState([
  {
    id: 1,
    type: 'created',
    user: {
      name: 'Sarah Chen',
      avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
      avatarAlt: 'Professional headshot of Asian woman with shoulder-length black hair in white blouse'
    },
    timestamp: new Date(Date.now() - 86400000 * 3),
    details: 'Created this task and set initial requirements'
  },
  {
    id: 2,
    type: 'status_change',
    user: {
      name: 'Mike Rodriguez',
      avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
      avatarAlt: 'Professional headshot of Hispanic man with short black hair in navy suit'
    },
    timestamp: new Date(Date.now() - 86400000 * 2),
    details: 'Changed status from "To Do" to "In Progress"',
    changes: {
      field: 'status',
      from: 'todo',
      to: 'in-progress'
    }
  },
  {
    id: 3,
    type: 'assignment',
    user: {
      name: 'Emma Wilson',
      avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      avatarAlt: 'Professional headshot of blonde woman in blue blazer smiling at camera'
    },
    timestamp: new Date(Date.now() - 86400000 * 2 + 3600000),
    details: 'Assigned task to David Kim',
    changes: {
      field: 'assignee',
      from: null,
      to: 'David Kim'
    }
  },
  {
    id: 4,
    type: 'priority_change',
    user: {
      name: 'David Kim',
      avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
      avatarAlt: 'Professional headshot of Asian man with glasses in dark suit'
    },
    timestamp: new Date(Date.now() - 86400000 + 7200000),
    details: 'Updated priority from "Medium" to "High"',
    changes: {
      field: 'priority',
      from: 'medium',
      to: 'high'
    }
  },
  {
    id: 5,
    type: 'attachment',
    user: {
      name: 'Lisa Anderson',
      avatar: "https://images.unsplash.com/photo-1656792941334-66f8e5e184a0",
      avatarAlt: 'Professional headshot of woman with curly brown hair in professional attire'
    },
    timestamp: new Date(Date.now() - 86400000 + 10800000),
    details: 'Added 3 attachments: design-mockups.pdf, requirements.docx, wireframes.png'
  },
  {
    id: 6,
    type: 'comment',
    user: {
      name: 'Sarah Chen',
      avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
      avatarAlt: 'Professional headshot of Asian woman with shoulder-length black hair in white blouse'
    },
    timestamp: new Date(Date.now() - 14400000),
    details: 'Added a comment about implementation approach'
  },
  {
    id: 7,
    type: 'due_date',
    user: {
      name: 'Mike Rodriguez',
      avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
      avatarAlt: 'Professional headshot of Hispanic man with short black hair in navy suit'
    },
    timestamp: new Date(Date.now() - 7200000),
    details: 'Set due date to October 25, 2025',
    changes: {
      field: 'due_date',
      from: null,
      to: '2025-10-25'
    }
  },
  {
    id: 8,
    type: 'progress',
    user: {
      name: 'David Kim',
      avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
      avatarAlt: 'Professional headshot of Asian man with glasses in dark suit'
    },
    timestamp: new Date(Date.now() - 3600000),
    details: 'Updated progress from 25% to 60%',
    changes: {
      field: 'progress',
      from: 25,
      to: 60
    }
  }]
  );

  const getActivityIcon = (type) => {
    const iconMap = {
      created: 'Plus',
      status_change: 'ArrowRight',
      assignment: 'User',
      priority_change: 'Flag',
      attachment: 'Paperclip',
      comment: 'MessageCircle',
      due_date: 'Calendar',
      progress: 'TrendingUp',
      edit: 'Edit2'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      created: 'text-green-600 bg-green-50',
      status_change: 'text-blue-600 bg-blue-50',
      assignment: 'text-purple-600 bg-purple-50',
      priority_change: 'text-orange-600 bg-orange-50',
      attachment: 'text-gray-600 bg-gray-50',
      comment: 'text-indigo-600 bg-indigo-50',
      due_date: 'text-red-600 bg-red-50',
      progress: 'text-emerald-600 bg-emerald-50',
      edit: 'text-amber-600 bg-amber-50'
    };
    return colorMap?.[type] || 'text-gray-600 bg-gray-50';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp?.toLocaleDateString();
  };

  const formatActivityType = (type) => {
    const typeMap = {
      created: 'Created',
      status_change: 'Status Changed',
      assignment: 'Assignment',
      priority_change: 'Priority Changed',
      attachment: 'Attachment Added',
      comment: 'Comment Added',
      due_date: 'Due Date Set',
      progress: 'Progress Updated',
      edit: 'Task Edited'
    };
    return typeMap?.[type] || 'Activity';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          Task History ({historyItems?.length})
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"} />

      </div>
      {isExpanded &&
      <div className="p-4">
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {historyItems?.map((item, index) =>
          <div key={item?.id} className="flex space-x-3">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(item?.type)}`}>
                    <Icon name={getActivityIcon(item?.type)} size={14} />
                  </div>
                  {index < historyItems?.length - 1 &&
              <div className="w-px h-8 bg-border mt-2"></div>
              }
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <Image
                      src={item?.user?.avatar}
                      alt={item?.user?.avatarAlt}
                      className="w-full h-full object-cover" />

                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {item?.user?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatActivityType(item?.type)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(item?.timestamp)}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    {item?.details}
                  </p>

                  {/* Change Details */}
                  {item?.changes &&
              <div className="bg-muted rounded-md p-2 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Changed:</span>
                        <span className="font-medium text-foreground capitalize">
                          {item?.changes?.field?.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        {item?.changes?.from &&
                  <>
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                              {item?.changes?.from}
                            </span>
                            <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                          </>
                  }
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                          {item?.changes?.to}
                        </span>
                      </div>
                    </div>
              }
                </div>
              </div>
          )}
          </div>

          {/* History Actions */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Showing all {historyItems?.length} activities
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Download">
                  Export History
                </Button>
                <Button variant="ghost" size="sm" iconName="Filter">
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default TaskHistoryPanel;