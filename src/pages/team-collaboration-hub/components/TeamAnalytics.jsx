import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const TeamAnalytics = ({ analyticsData }) => {
  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const productivityData = [
    { name: 'Mon', completed: 12, assigned: 15 },
    { name: 'Tue', completed: 19, assigned: 22 },
    { name: 'Wed', completed: 8, assigned: 18 },
    { name: 'Thu', completed: 15, assigned: 20 },
    { name: 'Fri', completed: 22, assigned: 25 },
    { name: 'Sat', completed: 5, assigned: 8 },
    { name: 'Sun', completed: 3, assigned: 5 }
  ];

  const workloadData = [
    { name: 'Sarah Chen', value: 35, color: '#2563EB' },
    { name: 'Mike Rodriguez', value: 28, color: '#10B981' },
    { name: 'Emma Wilson', value: 22, color: '#F59E0B' },
    { name: 'David Kim', value: 15, color: '#EF4444' }
  ];

  const collaborationTrend = [
    { week: 'Week 1', interactions: 45 },
    { week: 'Week 2', interactions: 52 },
    { week: 'Week 3', interactions: 48 },
    { week: 'Week 4', interactions: 61 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
              <p className="text-2xl font-bold text-foreground">{analyticsData?.totalTasks}</p>
            </div>
            <Icon name="CheckSquare" size={24} className="text-primary" />
          </div>
          <div className="mt-2">
            <span className="text-xs text-success">+12% from last week</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <p className="text-2xl font-bold text-foreground">{analyticsData?.completionRate}%</p>
            </div>
            <Icon name="TrendingUp" size={24} className="text-success" />
          </div>
          <div className="mt-2">
            <span className="text-xs text-success">+5% from last week</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Members</p>
              <p className="text-2xl font-bold text-foreground">{analyticsData?.activeMembers}</p>
            </div>
            <Icon name="Users" size={24} className="text-warning" />
          </div>
          <div className="mt-2">
            <span className="text-xs text-muted-foreground">No change</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
              <p className="text-2xl font-bold text-foreground">{analyticsData?.avgResponseTime}h</p>
            </div>
            <Icon name="Clock" size={24} className="text-accent" />
          </div>
          <div className="mt-2">
            <span className="text-xs text-error">+0.5h from last week</span>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Productivity */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Productivity</h3>
          <div className="w-full h-64" aria-label="Weekly Productivity Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="completed" fill="#10B981" name="Completed" />
                <Bar dataKey="assigned" fill="#2563EB" name="Assigned" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workload Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Workload Distribution</h3>
          <div className="w-full h-64" aria-label="Workload Distribution Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={workloadData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {workloadData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {workloadData?.map((item, index) => (
              <div key={item?.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                  ></div>
                  <span className="text-sm text-foreground">{item?.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{item?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Collaboration Trend */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Collaboration Trend</h3>
        <div className="w-full h-64" aria-label="Collaboration Trend Line Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={collaborationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="interactions" 
                stroke="#2563EB" 
                strokeWidth={3}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TeamAnalytics;