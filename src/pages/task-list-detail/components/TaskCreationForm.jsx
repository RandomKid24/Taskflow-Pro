import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TaskCreationForm = ({ isExpanded, onToggle, onCreateTask, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const assigneeOptions = [
    { value: 'sarah-chen', label: 'Sarah Chen' },
    { value: 'mike-rodriguez', label: 'Mike Rodriguez' },
    { value: 'emma-wilson', label: 'Emma Wilson' },
    { value: 'david-kim', label: 'David Kim' },
    { value: 'lisa-anderson', label: 'Lisa Anderson' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag?.trim() && !formData?.tags?.includes(newTag?.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev?.tags, newTag?.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev?.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (formData?.title?.trim()) {
      onCreateTask(formData);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        assignee: '',
        dueDate: '',
        tags: []
      });
      onToggle();
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      tags: []
    });
    onCancel();
  };

  if (!isExpanded) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <Button
          variant="ghost"
          onClick={onToggle}
          iconName="Plus"
          iconPosition="left"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          Add a new task...
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <Input
          label="Task Title"
          type="text"
          placeholder="Enter task title..."
          value={formData?.title}
          onChange={(e) => handleInputChange('title', e?.target?.value)}
          required
          autoFocus
        />

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            rows={3}
            placeholder="Add task description..."
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
          />
        </div>

        {/* Priority and Assignee */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Priority"
            options={priorityOptions}
            value={formData?.priority}
            onChange={(value) => handleInputChange('priority', value)}
          />

          <Select
            label="Assignee"
            options={assigneeOptions}
            value={formData?.assignee}
            onChange={(value) => handleInputChange('assignee', value)}
            placeholder="Select assignee"
          />
        </div>

        {/* Due Date */}
        <Input
          label="Due Date"
          type="date"
          value={formData?.dueDate}
          onChange={(e) => handleInputChange('dueDate', e?.target?.value)}
        />

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              type="text"
              placeholder="Add tag..."
              value={newTag}
              onChange={(e) => setNewTag(e?.target?.value)}
              onKeyPress={(e) => e?.key === 'Enter' && (e?.preventDefault(), handleAddTag())}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddTag}
              iconName="Plus"
            />
          </div>
          {formData?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground text-sm rounded-md"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-foreground"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Attachments
          </label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              iconName="Image"
              iconPosition="left"
            >
              Add Image
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              iconName="Video"
              iconPosition="left"
            >
              Add Video
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              iconName="Paperclip"
              iconPosition="left"
            >
              Add File
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            disabled={!formData?.title?.trim()}
          >
            Create Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskCreationForm;