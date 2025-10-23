import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import QuickActionMenu from '../../components/ui/QuickActionMenu';
import CollaborationIndicator from '../../components/ui/CollaborationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import TeamMemberCard from './components/TeamMemberCard';
import ActivityFeed from './components/ActivityFeed';
import TeamAnalytics from './components/TeamAnalytics';
import InviteTeamModal from './components/InviteTeamModal';
import NotificationSettings from './components/NotificationSettings';

const TeamCollaborationHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('members');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
  const [activityFilter, setActivityFilter] = useState('all');

  // Mock team members data
  const [teamMembers, setTeamMembers] = useState([
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    avatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
    avatarAlt: 'Professional headshot of Asian woman with shoulder-length black hair in white blazer',
    role: 'admin',
    status: 'online',
    activeTasks: 8,
    completedTasks: 45,
    productivity: 92,
    lastActive: '2 minutes ago',
    joinedDate: 'Jan 15, 2024'
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    email: 'mike.rodriguez@company.com',
    avatar: "https://images.unsplash.com/photo-1596717951382-a3cbbdd4b8fd",
    avatarAlt: 'Professional headshot of Hispanic man with short dark hair in navy suit',
    role: 'editor',
    status: 'online',
    activeTasks: 12,
    completedTasks: 38,
    productivity: 87,
    lastActive: 'now',
    joinedDate: 'Feb 3, 2024'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    email: 'emma.wilson@company.com',
    avatar: "https://images.unsplash.com/photo-1658747773643-707db5889b17",
    avatarAlt: 'Professional headshot of blonde woman with blue eyes in black blazer',
    role: 'contributor',
    status: 'away',
    activeTasks: 6,
    completedTasks: 29,
    productivity: 78,
    lastActive: '15 minutes ago',
    joinedDate: 'Jan 28, 2024'
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@company.com',
    avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    avatarAlt: 'Professional headshot of Asian man with glasses and dark hair in gray suit',
    role: 'viewer',
    status: 'offline',
    activeTasks: 3,
    completedTasks: 15,
    productivity: 65,
    lastActive: '2 hours ago',
    joinedDate: 'Mar 10, 2024'
  }]
  );

  // Mock activity data
  const [activities, setActivities] = useState([
  {
    id: 1,
    type: 'task_completed',
    user: {
      name: 'Sarah Chen',
      avatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
      avatarAlt: 'Professional headshot of Asian woman with shoulder-length black hair in white blazer'
    },
    description: 'completed task "Design system documentation"',
    details: 'All components documented with usage examples and best practices.',
    timestamp: new Date(Date.now() - 300000),
    attachments: []
  },
  {
    id: 2,
    type: 'comment_added',
    user: {
      name: 'Mike Rodriguez',
      avatar: "https://images.unsplash.com/photo-1596717951382-a3cbbdd4b8fd",
      avatarAlt: 'Professional headshot of Hispanic man with short dark hair in navy suit'
    },
    description: 'commented on "User authentication flow"',
    details: 'Great work on the security implementation. Should we add two-factor authentication as well?',
    timestamp: new Date(Date.now() - 900000),
    attachments: []
  },
  {
    id: 3,
    type: 'diagram_updated',
    user: {
      name: 'Emma Wilson',
      avatar: "https://images.unsplash.com/photo-1658747773643-707db5889b17",
      avatarAlt: 'Professional headshot of blonde woman with blue eyes in black blazer'
    },
    description: 'updated the project workflow diagram',
    details: 'Added new approval stages and updated the review process flow.',
    timestamp: new Date(Date.now() - 1800000),
    attachments: [{ name: 'workflow-v2.png', type: 'image' }]
  },
  {
    id: 4,
    type: 'task_assigned',
    user: {
      name: 'Sarah Chen',
      avatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
      avatarAlt: 'Professional headshot of Asian woman with shoulder-length black hair in white blazer'
    },
    description: 'assigned "API integration testing" to David Kim',
    details: 'Please focus on the authentication endpoints and error handling.',
    timestamp: new Date(Date.now() - 3600000),
    attachments: []
  }]
  );

  // Mock analytics data
  const analyticsData = {
    totalTasks: 156,
    completionRate: 84,
    activeMembers: 4,
    avgResponseTime: 2.3
  };

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskAssignments: true,
    taskComments: true,
    taskDeadlines: true,
    teamUpdates: false,
    diagramChanges: true,
    weeklyDigest: true,
    frequency: 'immediate',
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00'
  });

  const roleOptions = [
  { value: 'all', label: 'All Roles' },
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'contributor', label: 'Contributor' },
  { value: 'viewer', label: 'Viewer' }];


  const tabs = [
  { id: 'members', label: 'Team Members', icon: 'Users' },
  { id: 'activity', label: 'Activity Feed', icon: 'Activity' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }];


  const filteredMembers = teamMembers?.filter((member) => {
    const matchesSearch = member?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    member?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesRole = selectedRole === 'all' || member?.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const filteredActivities = activities?.filter((activity) => {
    if (activityFilter === 'all') return true;
    if (activityFilter === 'tasks') return activity?.type?.includes('task');
    if (activityFilter === 'comments') return activity?.type === 'comment_added';
    if (activityFilter === 'diagrams') return activity?.type === 'diagram_updated';
    if (activityFilter === 'assignments') return activity?.type === 'task_assigned';
    return true;
  });

  const handleRoleChange = (memberId, newRole) => {
    setTeamMembers((prev) =>
    prev?.map((member) =>
    member?.id === memberId ? { ...member, role: newRole } : member
    )
    );
  };

  const handleRemoveMember = (memberId) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers((prev) => prev?.filter((member) => member?.id !== memberId));
    }
  };

  const handleInviteTeam = (inviteData) => {
    console.log('Inviting team members:', inviteData);
    // Here you would typically send the invitation
  };

  const handleSaveNotificationSettings = (settings) => {
    setNotificationSettings(settings);
    console.log('Notification settings saved:', settings);
  };

  const handleActivityFilterChange = (filter) => {
    setActivityFilter(filter);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16">
        <div className="px-2 sm:px-4 py-4">
          <BreadcrumbTrail />
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Team Collaboration Hub</h1>
              <p className="text-muted-foreground">
                Manage your team, track activity, and collaborate effectively
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <CollaborationIndicator />
              <Button
                variant="outline"
                iconName="Settings"
                onClick={() => setIsNotificationSettingsOpen(true)}>

                Notifications
              </Button>
              <Button
                variant="default"
                iconName="UserPlus"
                onClick={() => setIsInviteModalOpen(true)}>

                Invite Team
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                activeTab === tab?.id ?
                'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'}`
                }>

                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              )}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'members' &&
          <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                  type="search"
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)} />

                </div>
                <Select
                options={roleOptions}
                value={selectedRole}
                onChange={setSelectedRole}
                placeholder="Filter by role"
                className="w-full sm:w-48" />

              </div>

              {/* Team Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Users" size={24} className="text-primary" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{teamMembers?.length}</p>
                      <p className="text-sm text-muted-foreground">Total Members</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="UserCheck" size={24} className="text-success" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {teamMembers?.filter((m) => m?.status === 'online')?.length}
                      </p>
                      <p className="text-sm text-muted-foreground">Online Now</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="CheckSquare" size={24} className="text-warning" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {teamMembers?.reduce((sum, m) => sum + m?.activeTasks, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Active Tasks</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="TrendingUp" size={24} className="text-accent" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {Math.round(teamMembers?.reduce((sum, m) => sum + m?.productivity, 0) / teamMembers?.length)}%
                      </p>
                      <p className="text-sm text-muted-foreground">Avg Productivity</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMembers?.map((member) =>
              <TeamMemberCard
                key={member?.id}
                member={member}
                onRoleChange={handleRoleChange}
                onRemoveMember={handleRemoveMember} />

              )}
              </div>

              {filteredMembers?.length === 0 &&
            <div className="text-center py-12">
                  <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No team members found matching your criteria</p>
                </div>
            }
            </div>
          }

          {activeTab === 'activity' &&
          <ActivityFeed
            activities={filteredActivities}
            onFilterChange={handleActivityFilterChange} />

          }

          {activeTab === 'analytics' &&
          <TeamAnalytics analyticsData={analyticsData} />
          }
        </div>
      </div>
      {/* Modals */}
      <InviteTeamModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteTeam} />

      <NotificationSettings
        isOpen={isNotificationSettingsOpen}
        onClose={() => setIsNotificationSettingsOpen(false)}
        settings={notificationSettings}
        onSave={handleSaveNotificationSettings} />

      <QuickActionMenu />
    </div>);

};

export default TeamCollaborationHub;