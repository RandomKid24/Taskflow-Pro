import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import QuickActionMenu from '../../components/ui/QuickActionMenu';
import CollaborationIndicator from '../../components/ui/CollaborationIndicator';
import TaskToolbar from './components/TaskToolbar';
import TaskMetadataPanel from './components/TaskMetadataPanel';
import RichTextEditor from './components/RichTextEditor';
import MediaUploadZone from './components/MediaUploadZone';
import CommentThread from './components/CommentThread';
import TaskHistoryPanel from './components/TaskHistoryPanel';
import CollaborativeEditingIndicator from './components/CollabrationEditingIndicator';

const TaskDetailEditor = () => {
  const [taskData, setTaskData] = useState({
    id: 'task-001',
    title: 'Implement User Authentication System',
    description: `<h2>Project Overview</h2>\n<p>We need to implement a comprehensive user authentication system that supports multiple login methods and provides secure session management.</p>\n\n<h3>Key Requirements</h3>\n<ul>\n<li>Email/password authentication</li>\n<li>Social login integration (Google, GitHub)</li>\n<li>Two-factor authentication</li>\n<li>Password reset functionality</li>\n<li>Session management and security</li>\n</ul>\n\n<h3>Technical Specifications</h3>\n<p>The system should be built using modern security practices including:</p>\n<ul>\n<li>JWT token-based authentication</li>\n<li>Bcrypt password hashing</li>\n<li>Rate limiting for login attempts</li>\n<li>CSRF protection</li>\n</ul>`,
    status: 'in-progress',
    priority: 'high',
    assignee: 'david-kim',
    category: 'development',
    dueDate: '2025-10-25T17:00',
    estimatedHours: '40',
    tags: 'authentication, security, backend, frontend',
    progress: 35,
    isTemplate: false,
    notifications: true,
    isPublic: true
  });

  const [attachments, setAttachments] = useState([
    {
      id: 1,
      name: 'auth-flow-diagram.png',
      size: 245760,
      type: 'image/png',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      uploadedAt: '2025-10-20T10:30:00Z'
    },
    {
      id: 2,
      name: 'security-requirements.pdf',
      size: 1048576,
      type: 'application/pdf',
      url: '/assets/documents/security-requirements.pdf',
      uploadedAt: '2025-10-19T14:15:00Z'
    },
    {
      id: 3,
      name: 'demo-video.mp4',
      size: 15728640,
      type: 'video/mp4',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      uploadedAt: '2025-10-21T09:45:00Z'
    }
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isMobileCommentOpen, setIsMobileCommentOpen] = useState(false);

  // Track changes for auto-save
  useEffect(() => {
    setHasUnsavedChanges(true);
    
    // Auto-save after 2 seconds of inactivity
    const autoSaveTimer = setTimeout(() => {
      handleAutoSave();
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [taskData, attachments]);

  const handleAutoSave = async () => {
    if (!hasUnsavedChanges) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasUnsavedChanges(false);
      console.log('Task saved successfully');
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTaskUpdate = (updatedTask) => {
    setTaskData(updatedTask);
  };

  const handleContentChange = (content) => {
    setTaskData(prev => ({ ...prev, description: content }));
  };

  const handleAttachmentsUpdate = (updatedAttachments) => {
    setAttachments(updatedAttachments);
  };

  const handleTemplateCreate = (templateData) => {
    console.log('Creating template from task:', templateData);
    // In a real app, this would save the task as a template
  };

  const customBreadcrumbs = [
    { label: 'Dashboard', path: '/dashboard', icon: 'Home' },
    { label: 'Task Lists', path: '/task-list-detail', icon: 'List' },
    { label: 'Task Editor', path: '/task-detail-editor', icon: 'Edit' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16">
        <TaskToolbar
          taskData={taskData}
          onSave={handleSave}
          onTemplateCreate={handleTemplateCreate}
          isSaving={isSaving}
          hasUnsavedChanges={hasUnsavedChanges}
        />

        <div className="px-6 py-6">
          <BreadcrumbTrail customBreadcrumbs={customBreadcrumbs} />

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Panel - Task Metadata */}
            <div className="xl:col-span-1 space-y-6">
              <TaskMetadataPanel
                taskData={taskData}
                onTaskUpdate={handleTaskUpdate}
              />
              
              <TaskHistoryPanel taskId={taskData?.id} />
              
              <CollaborativeEditingIndicator />
            </div>

            {/* Main Panel - Editor */}
            <div className="xl:col-span-2 space-y-6">
              {/* Rich Text Editor */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Task Description</h2>
                <RichTextEditor
                  content={taskData?.description}
                  onContentChange={handleContentChange}
                  placeholder="Describe your task in detail..."
                />
              </div>

              {/* Media Upload Zone */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Attachments</h2>
                <MediaUploadZone
                  attachments={attachments}
                  onAttachmentsUpdate={handleAttachmentsUpdate}
                />
              </div>
            </div>

            {/* Right Panel - Comments (Desktop) */}
            <div className="hidden xl:block xl:col-span-1">
              <div className="sticky top-32">
                <CommentThread taskId={taskData?.id} />
              </div>
            </div>
          </div>

          {/* Mobile Comment Button */}
          <div className="xl:hidden fixed bottom-20 right-6 z-1000">
            <button
              onClick={() => setIsMobileCommentOpen(true)}
              className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-elevation-3 flex items-center justify-center"
            >
              <span className="text-lg">💬</span>
            </button>
          </div>

          {/* Mobile Comment Drawer */}
          {isMobileCommentOpen && (
            <div className="xl:hidden fixed inset-0 z-1020 bg-black/50">
              <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-lg max-h-[80vh] overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground">Discussion</h3>
                  <button
                    onClick={() => setIsMobileCommentOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
                <div className="overflow-y-auto">
                  <CommentThread taskId={taskData?.id} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <QuickActionMenu />
      {/* Collaboration Indicator in Header */}
      <div className="fixed top-16 right-6 z-1000">
        <CollaborationIndicator />
      </div>
    </div>
  );
};

export default TaskDetailEditor;