import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import QuickActionMenu from '../../components/ui/QuickActionMenu';
import CollaborationIndicator from '../../components/ui/CollaborationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import MetricsCard from './components/MetricsCard';
import RecentTaskCard from './components/RecentTaskCard';
import ActivityFeedItem from './components/ActivityFeedItem';
import QuickActionCard from './components/QuickActionCard';
import ProgressChart from './components/ProgressChart';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import TeamActivitySummary from './components/TeamActivitySummary';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for dashboard metrics
  const metricsData = [
    {
      title: 'Total Tasks',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: 'CheckSquare',
      color: 'primary'
    },
    {
      title: 'Completed Today',
      value: '18',
      change: '+5',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'In Progress',
      value: '34',
      change: '-2',
      changeType: 'negative',
      icon: 'Clock',
      color: 'warning'
    },
    {
      title: 'Overdue',
      value: '7',
      change: '+3',
      changeType: 'negative',
      icon: 'AlertTriangle',
      color: 'error'
    }
  ];

  // Mock data for recent tasks
  const recentTasks = [
    {
      id: 1,
      title: 'Design new user onboarding flow with interactive tutorials',
      listName: 'Product Development',
      listId: 'pd-001',
      priority: 'high',
      status: 'in-progress',
      assignee: 'Sarah Chen',
      dueDate: 'Oct 25',
      comments: 3,
      hasAttachments: true,
      hasImages: true,
      hasVideos: false
    },
    {
      id: 2,
      title: 'Implement authentication system',
      listName: 'Backend Development',
      listId: 'bd-001',
      priority: 'high',
      status: 'pending',
      assignee: 'Mike Rodriguez',
      dueDate: 'Oct 24',
      comments: 1,
      hasAttachments: false,
      hasImages: false,
      hasVideos: false
    },
    {
      id: 3,
      title: 'Create marketing campaign assets',
      listName: 'Marketing',
      listId: 'm-001',
      priority: 'medium',
      status: 'completed',
      assignee: 'Emma Wilson',
      dueDate: 'Oct 22',
      comments: 5,
      hasAttachments: true,
      hasImages: true,
      hasVideos: true
    },
    {
      id: 4,
      title: 'Update documentation for API endpoints',
      listName: 'Documentation',
      listId: 'd-001',
      priority: 'low',
      status: 'in-progress',
      assignee: 'Alex Thompson',
      dueDate: 'Oct 28',
      comments: 0,
      hasAttachments: true,
      hasImages: false,
      hasVideos: false
    }
  ];

  // Mock data for activity feed
  const activityFeed = [
    {
      id: 1,
      type: 'task_completed',
      user: 'Emma Wilson',
      action: 'completed',
      target: 'Marketing Campaign Assets',
      description: 'All campaign materials have been finalized and approved',
      timestamp: new Date(Date.now() - 300000) // 5 minutes ago
    },
    {
      id: 2,
      type: 'comment_added',
      user: 'Sarah Chen',
      action: 'commented on',
      target: 'User Onboarding Flow',
      description: 'Added feedback on the wireframe designs',
      timestamp: new Date(Date.now() - 900000) // 15 minutes ago
    },
    {
      id: 3,
      type: 'task_assigned',
      user: 'Mike Rodriguez',
      action: 'assigned',
      target: 'Database Migration',
      description: 'Task assigned to Alex Thompson for completion',
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 4,
      type: 'file_uploaded',
      user: 'Alex Thompson',
      action: 'uploaded files to',
      target: 'API Documentation',
      description: 'Added updated endpoint specifications',
      timestamp: new Date(Date.now() - 2700000) // 45 minutes ago
    },
    {
      id: 5,
      type: 'diagram_created',
      user: 'Sarah Chen',
      action: 'created diagram',
      target: 'User Flow Diagram',
      description: 'New flowchart for onboarding process',
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    }
  ];

  // Mock data for quick actions
  const quickActions = [
    {
      title: 'Create Task List',
      description: 'Start a new project or organize tasks into structured lists with team collaboration',
      icon: 'List',
      route: '/task-list-detail',
      color: 'primary'
    },
    {
      title: 'Design Diagram',
      description: 'Create flowcharts, mind maps, and visual diagrams to plan your projects',
      icon: 'GitBranch',
      route: '/diagram-editor',
      color: 'success',
      badge: 'New'
    },
    {
      title: 'Team Collaboration',
      description: 'Invite team members, assign tasks, and track progress in real-time',
      icon: 'Users',
      route: '/team-collaboration-hub',
      color: 'warning'
    },
    {
      title: 'Task Editor',
      description: 'Create detailed tasks with rich media, attachments, and collaborative features',
      icon: 'Edit',
      route: '/task-detail-editor',
      color: 'secondary'
    }
  ];

  // Mock data for progress charts
  const weeklyProgressData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 19 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 22 },
    { name: 'Fri', value: 18 },
    { name: 'Sat', value: 8 },
    { name: 'Sun', value: 5 }
  ];

  const taskStatusData = [
    { name: 'Completed', value: 156 },
    { name: 'In Progress', value: 34 },
    { name: 'Pending', value: 47 },
    { name: 'Overdue', value: 7 }
  ];

  // Mock data for upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: 'Authentication System Implementation',
      listName: 'Backend Development',
      assignee: 'Mike Rodriguez',
      dueDate: '2025-10-24',
      daysLeft: 2
    },
    {
      id: 2,
      title: 'User Interface Mockups',
      listName: 'Design',
      assignee: 'Sarah Chen',
      dueDate: '2025-10-25',
      daysLeft: 3
    },
    {
      id: 3,
      title: 'Database Migration Script',
      listName: 'Backend Development',
      assignee: 'Alex Thompson',
      dueDate: '2025-10-23',
      daysLeft: 1
    },
    {
      id: 4,
      title: 'Content Review Process',
      listName: 'Marketing',
      assignee: 'Emma Wilson',
      dueDate: '2025-10-22',
      daysLeft: 0
    }
  ];

  // Mock data for team members
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'SC',
      status: 'active',
      currentActivity: 'Editing User Flow Diagram',
      tasksCompleted: 3
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      avatar: 'MR',
      status: 'active',
      currentActivity: 'Code Review Session',
      tasksCompleted: 2
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'EW',
      status: 'away',
      currentActivity: 'Last seen 15 min ago',
      tasksCompleted: 4
    },
    {
      id: 4,
      name: 'Alex Thompson',
      avatar: 'AT',
      status: 'active',
      currentActivity: 'Writing Documentation',
      tasksCompleted: 1
    },
    {
      id: 5,
      name: 'Lisa Park',
      avatar: 'LP',
      status: 'offline',
      currentActivity: 'Last seen 2 hours ago',
      tasksCompleted: 0
    }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate('/task-list-detail', { state: { searchQuery: searchQuery?.trim() } });
    }
  };

  const formatGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16">
        <div className="w-full mx-auto px-2 sm:px-4 py-4">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <BreadcrumbTrail />
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {formatGreeting()}, Welcome Back!
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your projects today, {currentTime?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <CollaborationIndicator />
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <Input
                  type="search"
                  placeholder="Search tasks, lists, or diagrams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-64"
                />
                <Button type="submit" iconName="Search" />
              </form>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Recent Tasks & Quick Actions */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Tasks */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Recent Tasks</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/task-list-detail')}
                    iconName="ExternalLink"
                  >
                    View All Tasks
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentTasks?.map((task) => (
                    <RecentTaskCard key={task?.id} task={task} />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions?.map((action, index) => (
                    <QuickActionCard
                      key={index}
                      title={action?.title}
                      description={action?.description}
                      icon={action?.icon}
                      route={action?.route}
                      color={action?.color}
                      badge={action?.badge}
                    />
                  ))}
                </div>
              </div>

              {/* Progress Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProgressChart
                  type="bar"
                  data={weeklyProgressData}
                  title="Weekly Task Completion"
                />
                <ProgressChart
                  type="pie"
                  data={taskStatusData}
                  title="Task Status Distribution"
                />
              </div>
            </div>

            {/* Right Column - Activity Feed & Deadlines */}
            <div className="space-y-8">
              {/* Upcoming Deadlines */}
              <UpcomingDeadlines deadlines={upcomingDeadlines} />

              {/* Team Activity Summary */}
              <TeamActivitySummary teamMembers={teamMembers} />

              {/* Activity Feed */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/team-collaboration-hub')}
                    iconName="Activity"
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {activityFeed?.map((activity) => (
                    <ActivityFeedItem key={activity?.id} activity={activity} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Additional Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Icon name="Target" size={48} className="text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Weekly Goal</h3>
              <p className="text-2xl font-bold text-primary mb-1">89%</p>
              <p className="text-sm text-muted-foreground">18 of 20 tasks completed</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Icon name="TrendingUp" size={48} className="text-success mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Productivity</h3>
              <p className="text-2xl font-bold text-success mb-1">+15%</p>
              <p className="text-sm text-muted-foreground">vs last week</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Icon name="Users" size={48} className="text-warning mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Team Score</h3>
              <p className="text-2xl font-bold text-warning mb-1">92</p>
              <p className="text-sm text-muted-foreground">collaboration rating</p>
            </div>
          </div>
        </div>
      </div>
      <QuickActionMenu />
    </div>
  );
};

export default Dashboard;