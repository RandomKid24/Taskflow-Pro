import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getContextualActions = () => {
    const basePath = location?.pathname?.split('/')?.[1] || 'dashboard';
    
    const actionMap = {
      dashboard: [
        { label: 'New Task', icon: 'Plus', action: () => navigate('/task-detail-editor') },
        { label: 'Create Diagram', icon: 'GitBranch', action: () => navigate('/diagram-editor') },
        { label: 'View Tasks', icon: 'List', action: () => navigate('/task-list-detail') }
      ],
      'task-list-detail': [
        { label: 'New Task', icon: 'Plus', action: () => navigate('/task-detail-editor') },
        { label: 'Create Diagram', icon: 'GitBranch', action: () => navigate('/diagram-editor') },
        { label: 'Team Hub', icon: 'Users', action: () => navigate('/team-collaboration-hub') }
      ],
      'task-detail-editor': [
        { label: 'Save & New', icon: 'Plus', action: () => console.log('Save and create new') },
        { label: 'View All Tasks', icon: 'List', action: () => navigate('/task-list-detail') },
        { label: 'Create Diagram', icon: 'GitBranch', action: () => navigate('/diagram-editor') }
      ],
      'diagram-editor': [
        { label: 'New Diagram', icon: 'Plus', action: () => console.log('New diagram') },
        { label: 'Save Diagram', icon: 'Save', action: () => console.log('Save diagram') },
        { label: 'View Tasks', icon: 'List', action: () => navigate('/task-list-detail') }
      ],
      'team-collaboration-hub': [
        { label: 'Invite Member', icon: 'UserPlus', action: () => console.log('Invite member') },
        { label: 'New Task', icon: 'Plus', action: () => navigate('/task-detail-editor') },
        { label: 'Create Diagram', icon: 'GitBranch', action: () => navigate('/diagram-editor') }
      ]
    };

    return actionMap?.[basePath] || actionMap?.dashboard;
  };

  const actions = getContextualActions();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (action) => {
    action?.action();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-1010">
      {/* Action Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-card border border-border rounded-lg shadow-elevation-3 py-2 min-w-48">
          {actions?.map((action, index) => (
            <button
              key={index}
              onClick={() => handleActionClick(action)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-smooth"
            >
              <Icon name={action?.icon} size={16} />
              <span>{action?.label}</span>
            </button>
          ))}
        </div>
      )}
      {/* Floating Action Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={toggleMenu}
        className="rounded-full w-12 h-12 shadow-elevation-3 hover:shadow-elevation-3 flex items-center justify-center"
        iconName={isOpen ? "X" : "Menu"}
      />
    </div>
  );
};

export default QuickActionMenu;