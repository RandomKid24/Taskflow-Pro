import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskMetadataPanel = ({ taskData, onTaskUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'review', label: 'In Review' },
    { value: 'completed', label: 'Completed' }
  ];

  const assigneeOptions = [
    { value: 'sarah-chen', label: 'Sarah Chen' },
    { value: 'mike-rodriguez', label: 'Mike Rodriguez' },
    { value: 'emma-wilson', label: 'Emma Wilson' },
    { value: 'david-kim', label: 'David Kim' },
    { value: 'lisa-anderson', label: 'Lisa Anderson' }
  ];

  const categoryOptions = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'research', label: 'Research' },
    { value: 'testing', label: 'Testing' }
  ];

  const handleFieldUpdate = (field, value) => {
    onTaskUpdate({ ...taskData, [field]: value });
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'text-blue-600 bg-blue-50',
      medium: 'text-amber-600 bg-amber-50',
      high: 'text-orange-600 bg-orange-50',
      urgent: 'text-red-600 bg-red-50'
    };
    return colors?.[priority] || colors?.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      'todo': 'text-gray-600 bg-gray-50',
      'in-progress': 'text-blue-600 bg-blue-50',
      'review': 'text-amber-600 bg-amber-50',
      'completed': 'text-green-600 bg-green-50'
    };
    return colors?.[status] || colors?.todo;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Task Details</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
        />
      </div>
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Task Title */}
          <div>
            <Input
              label="Task Title"
              type="text"
              placeholder="Enter task title"
              value={taskData?.title}
              onChange={(e) => handleFieldUpdate('title', e?.target?.value)}
              required
            />
          </div>

          {/* Status and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select
                label="Status"
                options={statusOptions}
                value={taskData?.status}
                onChange={(value) => handleFieldUpdate('status', value)}
              />
              <div className="mt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(taskData?.status)}`}>
                  <Icon name="Circle" size={8} className="mr-1" />
                  {statusOptions?.find(opt => opt?.value === taskData?.status)?.label}
                </span>
              </div>
            </div>

            <div>
              <Select
                label="Priority"
                options={priorityOptions}
                value={taskData?.priority}
                onChange={(value) => handleFieldUpdate('priority', value)}
              />
              <div className="mt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(taskData?.priority)}`}>
                  <Icon name="Flag" size={12} className="mr-1" />
                  {priorityOptions?.find(opt => opt?.value === taskData?.priority)?.label}
                </span>
              </div>
            </div>
          </div>

          {/* Assignee and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Assignee"
              options={assigneeOptions}
              value={taskData?.assignee}
              onChange={(value) => handleFieldUpdate('assignee', value)}
              searchable
              placeholder="Select assignee"
            />

            <Select
              label="Category"
              options={categoryOptions}
              value={taskData?.category}
              onChange={(value) => handleFieldUpdate('category', value)}
              placeholder="Select category"
            />
          </div>

          {/* Due Date and Estimated Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Due Date"
              type="datetime-local"
              value={taskData?.dueDate}
              onChange={(e) => handleFieldUpdate('dueDate', e?.target?.value)}
            />

            <Input
              label="Estimated Hours"
              type="number"
              placeholder="0"
              min="0"
              step="0.5"
              value={taskData?.estimatedHours}
              onChange={(e) => handleFieldUpdate('estimatedHours', e?.target?.value)}
            />
          </div>

          {/* Tags */}
          <div>
            <Input
              label="Tags"
              type="text"
              placeholder="Enter tags separated by commas"
              description="Use commas to separate multiple tags"
              value={taskData?.tags}
              onChange={(e) => handleFieldUpdate('tags', e?.target?.value)}
            />
            {taskData?.tags && (
              <div className="mt-2 flex flex-wrap gap-2">
                {taskData?.tags?.split(',')?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary"
                  >
                    <Icon name="Tag" size={10} className="mr-1" />
                    {tag?.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Task Options */}
          <div className="space-y-3 pt-2 border-t border-border">
            <h4 className="text-sm font-medium text-foreground">Task Options</h4>
            
            <Checkbox
              label="Mark as template"
              description="Save this task as a reusable template"
              checked={taskData?.isTemplate}
              onChange={(e) => handleFieldUpdate('isTemplate', e?.target?.checked)}
            />

            <Checkbox
              label="Enable notifications"
              description="Receive updates about this task"
              checked={taskData?.notifications}
              onChange={(e) => handleFieldUpdate('notifications', e?.target?.checked)}
            />

            <Checkbox
              label="Allow public viewing"
              description="Make this task visible to all team members"
              checked={taskData?.isPublic}
              onChange={(e) => handleFieldUpdate('isPublic', e?.target?.checked)}
            />
          </div>

          {/* Progress Tracking */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Progress</label>
              <span className="text-sm text-muted-foreground">{taskData?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${taskData?.progress}%` }}
              ></div>
            </div>
            <Input
              type="range"
              min="0"
              max="100"
              step="5"
              value={taskData?.progress}
              onChange={(e) => handleFieldUpdate('progress', e?.target?.value)}
              className="mt-2 w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskMetadataPanel;