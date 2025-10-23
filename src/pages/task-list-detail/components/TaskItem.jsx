import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskItem = ({ task, onStatusChange, onDelete, isDragging }) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  const priorityColors = {
    low: 'text-blue-600 bg-blue-50',
    medium: 'text-amber-600 bg-amber-50',
    high: 'text-red-600 bg-red-50',
    urgent: 'text-purple-600 bg-purple-50'
  };

  const statusColors = {
    pending: 'text-gray-600 bg-gray-50',
    'in-progress': 'text-blue-600 bg-blue-50',
    completed: 'text-green-600 bg-green-50',
    overdue: 'text-red-600 bg-red-50'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date?.getTime() - now?.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleStatusToggle = (checked) => {
    const newStatus = checked ? 'completed' : 'pending';
    onStatusChange(task?.id, newStatus);
  };

  const handleEdit = () => {
    navigate(`/task-detail-editor?id=${task?.id}`);
  };

  return (
    <div 
      className={`group bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-200 ${
        isDragging ? 'opacity-50 rotate-2' : ''
      } ${task?.status === 'completed' ? 'opacity-75' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div className="mt-1">
          <Checkbox
            checked={task?.status === 'completed'}
            onChange={(e) => handleStatusToggle(e?.target?.checked)}
            size="default"
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 
                className={`font-medium text-foreground cursor-pointer hover:text-primary transition-smooth ${
                  task?.status === 'completed' ? 'line-through' : ''
                }`}
                onClick={handleEdit}
              >
                {task?.title}
              </h3>
              
              {task?.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {task?.description}
                </p>
              )}

              {/* Attachments Indicator */}
              {(task?.attachments?.length > 0 || task?.images?.length > 0 || task?.videos?.length > 0) && (
                <div className="flex items-center gap-2 mt-2">
                  {task?.images?.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="Image" size={12} />
                      <span>{task?.images?.length}</span>
                    </div>
                  )}
                  {task?.videos?.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="Video" size={12} />
                      <span>{task?.videos?.length}</span>
                    </div>
                  )}
                  {task?.attachments?.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="Paperclip" size={12} />
                      <span>{task?.attachments?.length}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tags */}
              {task?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {task?.tags?.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className={`flex items-center gap-1 transition-opacity ${
              showActions ? 'opacity-100' : 'opacity-0'
            }`}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                iconName="Edit2"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => console.log('Add comment')}
                iconName="MessageCircle"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task?.id)}
                iconName="Trash2"
              />
            </div>
          </div>

          {/* Task Meta Information */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              {/* Assignee */}
              {task?.assignee && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={task?.assignee?.avatar}
                      alt={task?.assignee?.avatarAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {task?.assignee?.name}
                  </span>
                </div>
              )}

              {/* Priority */}
              <span className={`px-2 py-1 text-xs font-medium rounded-md ${priorityColors?.[task?.priority]}`}>
                {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
              </span>

              {/* Status */}
              <span className={`px-2 py-1 text-xs font-medium rounded-md ${statusColors?.[task?.status]}`}>
                {task?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
              </span>
            </div>

            {/* Due Date */}
            {task?.dueDate && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Icon name="Calendar" size={14} />
                <span className={task?.status === 'overdue' ? 'text-red-600' : ''}>
                  {formatDate(task?.dueDate)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;