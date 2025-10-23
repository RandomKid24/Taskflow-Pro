import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentTaskCard = ({ task }) => {
  const navigate = useNavigate();

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error bg-error/10',
      medium: 'text-warning bg-warning/10',
      low: 'text-success bg-success/10'
    };
    return colors?.[priority] || colors?.low;
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-success bg-success/10',
      'in-progress': 'text-warning bg-warning/10',
      pending: 'text-muted-foreground bg-muted',
      overdue: 'text-error bg-error/10'
    };
    return colors?.[status] || colors?.pending;
  };

  const handleViewTask = () => {
    navigate('/task-detail-editor', { state: { taskId: task?.id } });
  };

  const handleViewList = () => {
    navigate('/task-list-detail', { state: { listId: task?.listId } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
            {task?.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">{task?.listName}</p>
        </div>
        <div className="flex items-center space-x-2 ml-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task?.priority)}`}>
            {task?.priority}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(task?.status)}`}>
            {task?.status}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
        <div className="flex items-center space-x-4">
          {task?.assignee && (
            <div className="flex items-center space-x-1">
              <Icon name="User" size={12} />
              <span>{task?.assignee}</span>
            </div>
          )}
          {task?.dueDate && (
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>{task?.dueDate}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="MessageCircle" size={12} />
          <span>{task?.comments || 0}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {task?.hasAttachments && (
            <Icon name="Paperclip" size={14} className="text-muted-foreground" />
          )}
          {task?.hasImages && (
            <Icon name="Image" size={14} className="text-muted-foreground" />
          )}
          {task?.hasVideos && (
            <Icon name="Video" size={14} className="text-muted-foreground" />
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="xs"
            onClick={handleViewList}
            iconName="List"
          >
            List
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={handleViewTask}
            iconName="Eye"
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentTaskCard;