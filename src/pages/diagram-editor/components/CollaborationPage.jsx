import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CollaborationPanel = ({ isVisible, onToggle }) => {
  const [activeTab, setActiveTab] = useState('collaborators');

  const collaborators = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
    avatarAlt: 'Professional headshot of Asian woman with shoulder-length black hair in white blouse',
    status: 'active',
    cursor: { x: 450, y: 200 },
    selection: 'rectangle-1',
    lastActivity: 'Editing shape properties',
    joinedAt: '2 hours ago'
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    email: 'mike.rodriguez@company.com',
    avatar: "https://images.unsplash.com/photo-1596717951382-a3cbbdd4b8fd",
    avatarAlt: 'Professional headshot of Hispanic man with short dark hair in navy suit',
    status: 'active',
    cursor: { x: 300, y: 350 },
    selection: null,
    lastActivity: 'Adding new connector',
    joinedAt: '1 hour ago'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    email: 'emma.wilson@company.com',
    avatar: "https://images.unsplash.com/photo-1684262855344-b9da453a7934",
    avatarAlt: 'Professional headshot of blonde woman with blue eyes in gray blazer',
    status: 'away',
    cursor: null,
    selection: null,
    lastActivity: 'Viewed diagram',
    joinedAt: '30 minutes ago'
  }];


  const comments = [
  {
    id: 1,
    author: 'Sarah Chen',
    avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
    avatarAlt: 'Professional headshot of Asian woman with shoulder-length black hair in white blouse',
    content: 'Should we add a decision point here for the approval process?',
    timestamp: '5 minutes ago',
    position: { x: 400, y: 180 },
    resolved: false
  },
  {
    id: 2,
    author: 'Mike Rodriguez',
    avatar: "https://images.unsplash.com/photo-1596717951382-a3cbbdd4b8fd",
    avatarAlt: 'Professional headshot of Hispanic man with short dark hair in navy suit',
    content: 'The flow looks good, but we might need to simplify the user journey section.',
    timestamp: '12 minutes ago',
    position: { x: 250, y: 320 },
    resolved: true
  },
  {
    id: 3,
    author: 'Emma Wilson',
    avatar: "https://images.unsplash.com/photo-1684262855344-b9da453a7934",
    avatarAlt: 'Professional headshot of blonde woman with blue eyes in gray blazer',
    content: 'Great work on the layout! The color scheme is very clear.',
    timestamp: '25 minutes ago',
    position: { x: 500, y: 150 },
    resolved: false
  }];


  if (!isVisible) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        iconName="Users"
        className="fixed top-20 right-4 z-20" />);


  }

  return (
    <div className="fixed top-16 right-0 w-80 h-full bg-white border-l border-border shadow-elevation-3 z-20 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Collaboration</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          iconName="X" />

      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('collaborators')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-smooth ${
          activeTab === 'collaborators' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`
          }>

          <Icon name="Users" size={16} />
          <span>Team</span>
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-smooth ${
          activeTab === 'comments' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`
          }>

          <Icon name="MessageSquare" size={16} />
          <span>Comments</span>
        </button>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'collaborators' &&
        <div className="p-4 space-y-4">
            {/* Active Collaborators */}
            <div>
              <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">
                Active Now ({collaborators?.filter((c) => c?.status === 'active')?.length})
              </h4>
              <div className="space-y-3">
                {collaborators?.filter((c) => c?.status === 'active')?.map((collaborator) =>
              <div key={collaborator?.id} className="flex items-start space-x-3">
                    <div className="relative">
                      <Image
                    src={collaborator?.avatar}
                    alt={collaborator?.avatarAlt}
                    className="w-8 h-8 rounded-full object-cover" />

                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {collaborator?.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {collaborator?.lastActivity}
                      </p>
                    </div>
                  </div>
              )}
              </div>
            </div>

            {/* Other Collaborators */}
            <div>
              <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">
                Recently Active
              </h4>
              <div className="space-y-3">
                {collaborators?.filter((c) => c?.status !== 'active')?.map((collaborator) =>
              <div key={collaborator?.id} className="flex items-start space-x-3">
                    <Image
                  src={collaborator?.avatar}
                  alt={collaborator?.avatarAlt}
                  className="w-8 h-8 rounded-full object-cover opacity-60" />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-muted-foreground truncate">
                        {collaborator?.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {collaborator?.lastActivity} • {collaborator?.joinedAt}
                      </p>
                    </div>
                  </div>
              )}
              </div>
            </div>

            {/* Invite Button */}
            <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="UserPlus"
            iconPosition="left">

              Invite Collaborators
            </Button>
          </div>
        }

        {activeTab === 'comments' &&
        <div className="p-4 space-y-4">
            {/* Add Comment */}
            <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                You
              </div>
              <div className="flex-1">
                <textarea
                placeholder="Add a comment..."
                className="w-full text-sm bg-transparent border-none resize-none focus:outline-none"
                rows={2} />

                <div className="flex items-center justify-between mt-2">
                  <Button variant="ghost" size="xs" iconName="Paperclip" />
                  <Button variant="default" size="xs">Post</Button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments?.map((comment) =>
            <div key={comment?.id} className="flex items-start space-x-3">
                  <Image
                src={comment?.avatar}
                alt={comment?.avatarAlt}
                className="w-8 h-8 rounded-full object-cover" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-foreground">
                        {comment?.author}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {comment?.timestamp}
                      </span>
                      {comment?.resolved &&
                  <Icon name="Check" size={12} className="text-success" />
                  }
                    </div>
                    <p className="text-sm text-foreground mb-2">
                      {comment?.content}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="xs" iconName="Reply">
                        Reply
                      </Button>
                      {!comment?.resolved &&
                  <Button variant="ghost" size="xs" iconName="Check">
                          Resolve
                        </Button>
                  }
                    </div>
                  </div>
                </div>
            )}
            </div>
          </div>
        }
      </div>
    </div>);

};

export default CollaborationPanel;