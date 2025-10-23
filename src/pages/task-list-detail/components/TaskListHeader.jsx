import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TaskListHeader = ({ 
  listTitle, 
  onTitleChange, 
  taskCount, 
  completedCount, 
  onFilterChange, 
  onSortChange,
  currentFilter,
  currentSort 
}) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filterOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const sortOptions = [
    { value: 'created', label: 'Date Created' },
    { value: 'due-date', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'assignee', label: 'Assignee' },
    { value: 'title', label: 'Title A-Z' }
  ];

  const handleTitleSubmit = (e) => {
    e?.preventDefault();
    setIsEditing(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e?.target?.value);
    // Implement search functionality
  };

  const progressPercentage = taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0;

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title and Progress Section */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              iconName="ArrowLeft"
            />
            {isEditing ? (
              <form onSubmit={handleTitleSubmit} className="flex-1">
                <Input
                  type="text"
                  value={listTitle}
                  onChange={(e) => onTitleChange(e?.target?.value)}
                  onBlur={() => setIsEditing(false)}
                  className="text-2xl font-bold"
                  autoFocus
                />
              </form>
            ) : (
              <h1 
                className="text-2xl font-bold text-foreground cursor-pointer hover:text-primary transition-smooth"
                onClick={() => setIsEditing(true)}
              >
                {listTitle}
              </h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              iconName="Edit2"
            />
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>{completedCount} of {taskCount} completed</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/diagram-editor')}
            iconName="GitBranch"
            iconPosition="left"
          >
            Create Diagram
          </Button>
          <Button
            variant="default"
            onClick={() => navigate('/task-detail-editor')}
            iconName="Plus"
            iconPosition="left"
          >
            Add Task
          </Button>
        </div>
      </div>
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-3">
          <Select
            options={filterOptions}
            value={currentFilter}
            onChange={onFilterChange}
            placeholder="Filter by status"
            className="w-40"
          />
          
          <Select
            options={sortOptions}
            value={currentSort}
            onChange={onSortChange}
            placeholder="Sort by"
            className="w-40"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskListHeader;