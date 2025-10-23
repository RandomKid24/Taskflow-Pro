import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TaskToolbar = ({ taskData, onSave, onTemplateCreate, isSaving, hasUnsavedChanges }) => {
  const navigate = useNavigate();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const templateOptions = [
    { value: 'bug-report', label: 'Bug Report Template' },
    { value: 'feature-request', label: 'Feature Request Template' },
    { value: 'user-story', label: 'User Story Template' },
    { value: 'research-task', label: 'Research Task Template' },
    { value: 'design-review', label: 'Design Review Template' }
  ];

  const shareOptions = [
    { value: 'view', label: 'View Only' },
    { value: 'comment', label: 'Can Comment' },
    { value: 'edit', label: 'Can Edit' },
    { value: 'admin', label: 'Admin Access' }
  ];

  const exportFormats = [
    { label: 'PDF Document', icon: 'FileText', action: () => handleExport('pdf') },
    { label: 'Word Document', icon: 'FileText', action: () => handleExport('docx') },
    { label: 'Markdown File', icon: 'Hash', action: () => handleExport('md') },
    { label: 'JSON Data', icon: 'Code', action: () => handleExport('json') }
  ];

  const handleSave = () => {
    onSave();
  };

  const handleSaveAndNew = () => {
    onSave();
    // Navigate to new task editor
    navigate('/task-detail-editor');
  };

  const handleSaveAsTemplate = () => {
    onTemplateCreate(taskData);
  };

  const handleShare = (permission) => {
    // In a real app, this would open a sharing dialog
    console.log('Sharing with permission:', permission);
    setShowShareMenu(false);
  };

  const handleExport = (format) => {
    // In a real app, this would trigger the export
    console.log('Exporting as:', format);
    setShowExportMenu(false);
  };

  const handleLoadTemplate = (templateId) => {
    // In a real app, this would load the template
    console.log('Loading template:', templateId);
  };

  const goBack = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) return;
    }
    navigate('/task-list-detail');
  };

  return (
    <div className="bg-card border-b border-border sticky top-16 z-50">
      <div className="flex items-center justify-between p-4">
        {/* Left Section - Navigation */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={goBack}
            iconName="ArrowLeft"
          >
            Back to Tasks
          </Button>

          <div className="w-px h-6 bg-border"></div>

          <div className="flex items-center space-x-2">
            <Icon name="Edit3" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {taskData?.title || 'Untitled Task'}
            </span>
            {hasUnsavedChanges && (
              <div className="w-2 h-2 bg-amber-500 rounded-full" title="Unsaved changes"></div>
            )}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Template Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Select
              options={templateOptions}
              placeholder="Load template"
              onChange={handleLoadTemplate}
              className="w-48"
            />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveAsTemplate}
              iconName="Bookmark"
              title="Save as template"
            />
          </div>

          <div className="w-px h-6 bg-border hidden md:block"></div>

          {/* Share Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowShareMenu(!showShareMenu)}
              iconName="Share2"
            >
              Share
            </Button>

            {showShareMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-elevation-3 z-60">
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                    Share with permission:
                  </div>
                  {shareOptions?.map((option) => (
                    <button
                      key={option?.value}
                      onClick={() => handleShare(option?.value)}
                      className="w-full text-left px-2 py-2 text-sm text-foreground hover:bg-muted rounded transition-colors"
                    >
                      {option?.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Export Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExportMenu(!showExportMenu)}
              iconName="Download"
            >
              Export
            </Button>

            {showExportMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-elevation-3 z-60">
                <div className="p-2">
                  {exportFormats?.map((format, index) => (
                    <button
                      key={index}
                      onClick={format?.action}
                      className="w-full flex items-center space-x-2 px-2 py-2 text-sm text-foreground hover:bg-muted rounded transition-colors"
                    >
                      <Icon name={format?.icon} size={14} />
                      <span>{format?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-border"></div>

          {/* Save Actions */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveAndNew}
            iconName="Plus"
            disabled={isSaving}
          >
            Save & New
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            loading={isSaving}
            iconName="Save"
          >
            {isSaving ? 'Saving...' : 'Save Task'}
          </Button>
        </div>
      </div>
      {/* Auto-save Status */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            {hasUnsavedChanges ? (
              <>
                <Icon name="AlertCircle" size={12} className="text-amber-500" />
                <span>You have unsaved changes</span>
              </>
            ) : (
              <>
                <Icon name="Check" size={12} className="text-green-500" />
                <span>All changes saved</span>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span>Auto-save: On</span>
            <span>Last saved: {new Date()?.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
      {/* Click outside to close menus */}
      {(showShareMenu || showExportMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowShareMenu(false);
            setShowExportMenu(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default TaskToolbar;