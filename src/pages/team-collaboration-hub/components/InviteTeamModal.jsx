import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const InviteTeamModal = ({ isOpen, onClose, onInvite }) => {
  const [inviteData, setInviteData] = useState({
    emails: '',
    role: 'viewer',
    message: '',
    sendWelcomeEmail: true,
    expiresIn: '7'
  });

  const roleOptions = [
    { value: 'admin', label: 'Admin - Full access' },
    { value: 'editor', label: 'Editor - Can edit tasks and diagrams' },
    { value: 'contributor', label: 'Contributor - Can create and comment' },
    { value: 'viewer', label: 'Viewer - Read-only access' }
  ];

  const expirationOptions = [
    { value: '1', label: '1 day' },
    { value: '7', label: '7 days' },
    { value: '30', label: '30 days' },
    { value: 'never', label: 'Never expires' }
  ];

  const handleInputChange = (field, value) => {
    setInviteData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const emails = inviteData?.emails?.split(',')?.map(email => email?.trim())?.filter(Boolean);
    onInvite({ ...inviteData, emails });
    onClose();
    setInviteData({
      emails: '',
      role: 'viewer',
      message: '',
      sendWelcomeEmail: true,
      expiresIn: '7'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1020 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Invite Team Members</h2>
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Addresses"
              type="email"
              placeholder="Enter email addresses separated by commas"
              description="You can invite multiple people at once"
              value={inviteData?.emails}
              onChange={(e) => handleInputChange('emails', e?.target?.value)}
              required
            />

            <Select
              label="Role"
              options={roleOptions}
              value={inviteData?.role}
              onChange={(value) => handleInputChange('role', value)}
              description="Choose the access level for invited members"
            />

            <Input
              label="Personal Message (Optional)"
              type="text"
              placeholder="Add a personal message to the invitation"
              value={inviteData?.message}
              onChange={(e) => handleInputChange('message', e?.target?.value)}
            />

            <Select
              label="Invitation Expires"
              options={expirationOptions}
              value={inviteData?.expiresIn}
              onChange={(value) => handleInputChange('expiresIn', value)}
            />

            <Checkbox
              label="Send welcome email with getting started guide"
              checked={inviteData?.sendWelcomeEmail}
              onChange={(e) => handleInputChange('sendWelcomeEmail', e?.target?.checked)}
            />

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Invitation Details:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Invitees will receive an email with a secure link</li>
                    <li>• They can accept the invitation and create their account</li>
                    <li>• You can manage their permissions anytime</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <Button type="submit" variant="default" iconName="Send" className="flex-1">
                Send Invitations
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteTeamModal;