import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingDeadlines = ({ deadlines }) => {
  const navigate = useNavigate();

  const getUrgencyColor = (daysLeft) => {
    if (daysLeft < 0) return 'text-error bg-error/10 border-error/20';
    if (daysLeft <= 1) return 'text-warning bg-warning/10 border-warning/20';
    if (daysLeft <= 3) return 'text-accent bg-accent/10 border-accent/20';
    return 'text-success bg-success/10 border-success/20';
  };

  const getUrgencyText = (daysLeft) => {
    if (daysLeft < 0) return `${Math.abs(daysLeft)} days overdue`;
    if (daysLeft === 0) return 'Due today';
    if (daysLeft === 1) return 'Due tomorrow';
    return `${daysLeft} days left`;
  };

  const handleViewTask = (taskId) => {
    navigate('/task-detail-editor', { state: { taskId } });
  };

  const handleViewAll = () => {
    navigate('/task-list-detail', { state: { filter: 'upcoming-deadlines' } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          iconName="ExternalLink"
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {deadlines?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No upcoming deadlines</p>
          </div>
        ) : (
          deadlines?.map((deadline) => (
            <div
              key={deadline?.id}
              className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-smooth"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm mb-1 truncate">
                  {deadline?.title}
                </h4>
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span>{deadline?.listName}</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="User" size={12} />
                    <span>{deadline?.assignee}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 ml-3">
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getUrgencyColor(deadline?.daysLeft)}`}>
                  {getUrgencyText(deadline?.daysLeft)}
                </span>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleViewTask(deadline?.id)}
                  iconName="Eye"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;