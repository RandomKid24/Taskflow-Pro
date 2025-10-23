import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Task Lists',
      path: '/task-list-detail',
      icon: 'ListTodo'
    },
    {
      label: 'Diagrams',
      path: '/diagram-editor',
      icon: 'GitBranch'
    },
    {
      label: 'Team Hub',
      path: '/team-collaboration-hub',
      icon: 'Users'
    }
  ];

  const isActivePath = (path) => {
    if (path === '/dashboard') {
      return location?.pathname === '/' || location?.pathname === '/dashboard';
    }
    return location?.pathname?.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-1000 bg-card border-b border-border">
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">TaskFlow Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" iconName="Search" size="sm">
              Search
            </Button>
            <Button variant="ghost" iconName="Bell" size="sm" />
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Icon name="User" size={16} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
            iconName={isMobileMenuOpen ? "X" : "Menu"}
          />
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-6 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-border">
              <div className="flex items-center space-x-3 px-3 py-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} />
                </div>
                <span className="text-sm text-muted-foreground">Profile</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;