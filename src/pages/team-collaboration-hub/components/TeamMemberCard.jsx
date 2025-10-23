import React, { useState } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TeamMemberCard = ({ member, onRoleChange, onRemoveMember }) => {
  const [isEditingRole, setIsEditingRole] = useState(false);

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
    { value: 'contributor', label: 'Contributor' }
  ];

  const handleRoleChange = (newRole) => {
    onRoleChange(member?.id, newRole);
    setIsEditingRole(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'busy': return 'bg-error';
      default: return 'bg-muted-foreground';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-error text-error-foreground';
      case 'editor': return 'bg-primary text-primary-foreground';
      case 'contributor': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={member?.avatar}
              alt={member?.avatarAlt}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(member?.status)}`}></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{member?.name}</h3>
            <p className="text-sm text-muted-foreground">{member?.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isEditingRole ? (
            <Select
              options={roleOptions}
              value={member?.role}
              onChange={handleRoleChange}
              className="w-32"
            />
          ) : (
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getRoleBadgeColor(member?.role)}`}>
              {member?.role}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
            onClick={() => setIsEditingRole(!isEditingRole)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{member?.activeTasks}</p>
          <p className="text-xs text-muted-foreground">Active Tasks</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">{member?.completedTasks}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Productivity</span>
          <span className="text-foreground font-medium">{member?.productivity}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${member?.productivity}%` }}
          ></div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
        <span>Last active: {member?.lastActive}</span>
        <span>Joined: {member?.joinedDate}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" iconName="MessageCircle" className="flex-1">
          Message
        </Button>
        <Button variant="outline" size="sm" iconName="User" className="flex-1">
          Profile
        </Button>
        {member?.role !== 'admin' && (
          <Button 
            variant="ghost" 
            size="sm" 
            iconName="Trash2"
            onClick={() => onRemoveMember(member?.id)}
            className="text-error hover:text-error"
          />
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;