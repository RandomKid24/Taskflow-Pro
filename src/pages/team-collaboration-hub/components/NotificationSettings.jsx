import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';


const NotificationSettings = ({ isOpen, onClose, settings, onSave }) => {
  const [notificationSettings, setNotificationSettings] = useState(settings || {
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

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'hourly', label: 'Hourly digest' },
    { value: 'daily', label: 'Daily digest' },
    { value: 'weekly', label: 'Weekly digest' }
  ];

  const handleSettingChange = (key, value) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(notificationSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1020 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Notification Settings</h2>
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
          </div>

          <div className="space-y-6">
            {/* General Settings */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">General Preferences</h3>
              <div className="space-y-3">
                <Checkbox
                  label="Email notifications"
                  description="Receive notifications via email"
                  checked={notificationSettings?.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e?.target?.checked)}
                />
                <Checkbox
                  label="Push notifications"
                  description="Receive browser push notifications"
                  checked={notificationSettings?.pushNotifications}
                  onChange={(e) => handleSettingChange('pushNotifications', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Activity Types */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Activity Types</h3>
              <div className="space-y-3">
                <Checkbox
                  label="Task assignments"
                  description="When tasks are assigned to you"
                  checked={notificationSettings?.taskAssignments}
                  onChange={(e) => handleSettingChange('taskAssignments', e?.target?.checked)}
                />
                <Checkbox
                  label="Task comments"
                  description="When someone comments on your tasks"
                  checked={notificationSettings?.taskComments}
                  onChange={(e) => handleSettingChange('taskComments', e?.target?.checked)}
                />
                <Checkbox
                  label="Task deadlines"
                  description="Reminders for upcoming deadlines"
                  checked={notificationSettings?.taskDeadlines}
                  onChange={(e) => handleSettingChange('taskDeadlines', e?.target?.checked)}
                />
                <Checkbox
                  label="Team updates"
                  description="General team announcements"
                  checked={notificationSettings?.teamUpdates}
                  onChange={(e) => handleSettingChange('teamUpdates', e?.target?.checked)}
                />
                <Checkbox
                  label="Diagram changes"
                  description="When shared diagrams are modified"
                  checked={notificationSettings?.diagramChanges}
                  onChange={(e) => handleSettingChange('diagramChanges', e?.target?.checked)}
                />
                <Checkbox
                  label="Weekly digest"
                  description="Summary of team activity"
                  checked={notificationSettings?.weeklyDigest}
                  onChange={(e) => handleSettingChange('weeklyDigest', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Frequency */}
            <div>
              <Select
                label="Notification Frequency"
                description="How often you want to receive notifications"
                options={frequencyOptions}
                value={notificationSettings?.frequency}
                onChange={(value) => handleSettingChange('frequency', value)}
              />
            </div>

            {/* Quiet Hours */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Quiet Hours</h3>
              <Checkbox
                label="Enable quiet hours"
                description="Pause notifications during specified hours"
                checked={notificationSettings?.quietHours}
                onChange={(e) => handleSettingChange('quietHours', e?.target?.checked)}
                className="mb-4"
              />
              
              {notificationSettings?.quietHours && (
                <div className="grid grid-cols-2 gap-4 ml-6">
                  <Input
                    label="Start time"
                    type="time"
                    value={notificationSettings?.quietStart}
                    onChange={(e) => handleSettingChange('quietStart', e?.target?.value)}
                  />
                  <Input
                    label="End time"
                    type="time"
                    value={notificationSettings?.quietEnd}
                    onChange={(e) => handleSettingChange('quietEnd', e?.target?.value)}
                  />
                </div>
              )}
            </div>

            {/* Preview */}
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Bell" size={16} className="text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Preview</p>
                  <p className="text-muted-foreground">
                    You'll receive {notificationSettings?.frequency} notifications 
                    {notificationSettings?.emailNotifications && ' via email'}
                    {notificationSettings?.pushNotifications && ' and browser push'}
                    {notificationSettings?.quietHours && ` (paused from ${notificationSettings?.quietStart} to ${notificationSettings?.quietEnd})`}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-6 mt-6 border-t border-border">
            <Button onClick={handleSave} variant="default" iconName="Save" className="flex-1">
              Save Settings
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;