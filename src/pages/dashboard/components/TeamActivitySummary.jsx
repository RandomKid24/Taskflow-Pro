import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TeamActivitySummary = ({ teamMembers }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-success',
      away: 'bg-warning',
      offline: 'bg-muted-foreground'
    };
    return colors?.[status] || colors?.offline;
  };

  const handleViewTeamHub = () => {
    navigate('/team-collaboration-hub');
  };

  const handleViewMember = (memberId) => {
    navigate('/team-collaboration-hub', { state: { memberId } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Team Activity</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewTeamHub}
          iconName="Users"
        >
          Team Hub
        </Button>
      </div>
      <div className="space-y-4">
        {teamMembers?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Users" size={48} className="text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No team members found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">
                  {teamMembers?.filter(m => m?.status === 'active')?.length}
                </p>
                <p className="text-xs text-muted-foreground">Active Now</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">
                  {teamMembers?.reduce((sum, m) => sum + (m?.tasksCompleted || 0), 0)}
                </p>
                <p className="text-xs text-muted-foreground">Tasks Today</p>
              </div>
            </div>

            <div className="space-y-3">
              {teamMembers?.slice(0, 4)?.map((member) => (
                <div
                  key={member?.id}
                  className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-smooth cursor-pointer"
                  onClick={() => handleViewMember(member?.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {member?.avatar}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-card ${getStatusColor(member?.status)}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{member?.name}</p>
                      <p className="text-xs text-muted-foreground">{member?.currentActivity}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {member?.tasksCompleted > 0 && (
                      <span className="text-xs text-success font-medium">
                        +{member?.tasksCompleted}
                      </span>
                    )}
                    <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>

            {teamMembers?.length > 4 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleViewTeamHub}
                className="w-full mt-3"
              >
                View All {teamMembers?.length} Members
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TeamActivitySummary;