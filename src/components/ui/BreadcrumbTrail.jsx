import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard', icon: 'Home' }];

    if (pathSegments?.length === 0 || pathSegments?.[0] === 'dashboard') {
      return breadcrumbs;
    }

    const routeMap = {
      'task-list-detail': { label: 'Task Lists', icon: 'List' },
      'task-detail-editor': { label: 'Task Editor', icon: 'Edit' },
      'diagram-editor': { label: 'Diagram Editor', icon: 'GitBranch' },
      'team-collaboration-hub': { label: 'Team Hub', icon: 'Users' }
    };

    pathSegments?.forEach((segment, index) => {
      const route = routeMap?.[segment];
      if (route) {
        const path = '/' + pathSegments?.slice(0, index + 1)?.join('/');
        breadcrumbs?.push({
          label: route?.label,
          path: path,
          icon: route?.icon
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
          )}
          {index === breadcrumbs?.length - 1 ? (
            <span className="flex items-center space-x-1 text-foreground font-medium">
              <Icon name={crumb?.icon} size={14} />
              <span>{crumb?.label}</span>
            </span>
          ) : (
            <Link
              to={crumb?.path}
              className="flex items-center space-x-1 hover:text-foreground transition-smooth"
            >
              <Icon name={crumb?.icon} size={14} />
              <span>{crumb?.label}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbTrail;