import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TaskListDetail from './pages/task-list-detail';
import Login from './pages/login';
import TaskDetailEditor from './pages/task-detail-editor';
import Dashboard from './pages/dashboard';
import DiagramEditor from './pages/diagram-editor';
import TeamCollaborationHub from './pages/team-collaboration-hub';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/task-list-detail" element={<TaskListDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task-detail-editor" element={<TaskDetailEditor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diagram-editor" element={<DiagramEditor />} />
        <Route path="/team-collaboration-hub" element={<TeamCollaborationHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
