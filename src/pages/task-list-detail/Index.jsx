import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import QuickActionMenu from '../../components/ui/QuickActionMenu';

import TaskListHeader from './components/TaskListHeader';
import TaskItem from './components/TaskItem';
import DiagramPanel from './components/DiagramPanel';
import TaskCreationForm from './components/TaskCreationForm';
import CollaborationSidebar from './components/CollaborationSidebar';

const TaskListDetail = () => {
  const [listTitle, setListTitle] = useState('Product Development Sprint');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('created');
  const [isCreationFormExpanded, setIsCreationFormExpanded] = useState(false);
  const [isDiagramPanelCollapsed, setIsDiagramPanelCollapsed] = useState(false);
  const [isCollaborationSidebarVisible, setIsCollaborationSidebarVisible] = useState(false);

  // Mock tasks data
  useEffect(() => {
    const mockTasks = [
    {
      id: 1,
      title: 'Design System Component Library',
      description: `Create a comprehensive component library for the new design system.\nInclude buttons, forms, navigation elements, and data display components.\nEnsure accessibility compliance and responsive design.`,
      status: 'in-progress',
      priority: 'high',
      assignee: {
        name: 'Sarah Chen',
        avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
        avatarAlt: 'Professional headshot of Asian woman with shoulder-length black hair in white blouse'
      },
      dueDate: '2025-10-25',
      tags: ['design', 'frontend', 'ui-library'],
      images: [
      {
        url: "https://images.unsplash.com/photo-1558655146-d09347e92766",
        alt: 'Modern design system components displayed on computer screen'
      }],

      attachments: [
      { name: 'design-specs.pdf', size: '2.4 MB' }],

      createdAt: new Date('2025-10-20')
    },
    {
      id: 2,
      title: 'API Integration for User Authentication',
      description: `Implement secure user authentication using JWT tokens.\nIntegrate with OAuth providers (Google, GitHub).\nAdd password reset and email verification functionality.`,
      status: 'pending',
      priority: 'urgent',
      assignee: {
        name: 'Mike Rodriguez',
        avatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
        avatarAlt: 'Professional headshot of Hispanic man with short black hair in navy suit'
      },
      dueDate: '2025-10-24',
      tags: ['backend', 'security', 'api'],
      videos: [
      {
        url: 'https://example.com/auth-demo.mp4',
        thumbnail: "https://images.unsplash.com/photo-1614020661596-366a1afbb319",
        alt: 'Video demonstration of authentication flow on mobile device'
      }],

      createdAt: new Date('2025-10-21')
    },
    {
      id: 3,
      title: 'Database Schema Optimization',
      description: 'Optimize database queries and improve indexing for better performance.',
      status: 'completed',
      priority: 'medium',
      assignee: {
        name: 'Emma Wilson',
        avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
        avatarAlt: 'Professional headshot of blonde woman in blue blazer smiling at camera'
      },
      dueDate: '2025-10-22',
      tags: ['database', 'performance'],
      attachments: [
      { name: 'schema-diagram.png', size: '1.2 MB' },
      { name: 'performance-report.xlsx', size: '856 KB' }],

      createdAt: new Date('2025-10-18')
    },
    {
      id: 4,
      title: 'Mobile App Testing & Bug Fixes',
      description: `Comprehensive testing of mobile application across different devices.\nFix reported bugs and improve user experience.\nTest on iOS and Android platforms.`,
      status: 'in-progress',
      priority: 'high',
      assignee: {
        name: 'David Kim',
        avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
        avatarAlt: 'Professional headshot of Asian man with glasses in dark suit'
      },
      dueDate: '2025-10-26',
      tags: ['mobile', 'testing', 'qa'],
      images: [
      {
        url: "https://images.unsplash.com/photo-1596558450268-9c27524ba856",
        alt: 'Multiple smartphones displaying mobile app interface on wooden desk'
      }],

      createdAt: new Date('2025-10-19')
    },
    {
      id: 5,
      title: 'Documentation Update',
      description: 'Update project documentation and API references.',
      status: 'overdue',
      priority: 'low',
      assignee: {
        name: 'Lisa Anderson',
        avatar: "https://images.unsplash.com/photo-1656792941334-66f8e5e184a0",
        avatarAlt: 'Professional headshot of woman with curly brown hair in white shirt'
      },
      dueDate: '2025-10-20',
      tags: ['documentation', 'maintenance'],
      attachments: [
      { name: 'api-docs.md', size: '45 KB' }],

      createdAt: new Date('2025-10-17')
    }];


    setTasks(mockTasks);
    setFilteredTasks(mockTasks);
  }, []);

  // Filter and sort tasks
  useEffect(() => {
    let filtered = [...tasks];

    // Apply filter
    if (currentFilter !== 'all') {
      filtered = filtered?.filter((task) => task?.status === currentFilter);
    }

    // Apply sort
    filtered?.sort((a, b) => {
      switch (currentSort) {
        case 'due-date':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
        case 'assignee':
          return a?.assignee?.name?.localeCompare(b?.assignee?.name || '') || 0;
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'created':
        default:
          return b?.createdAt - a?.createdAt;
      }
    });

    setFilteredTasks(filtered);
  }, [tasks, currentFilter, currentSort]);

  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks((prev) => prev?.map((task) =>
    task?.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleTaskDelete = (taskId) => {
    setTasks((prev) => prev?.filter((task) => task?.id !== taskId));
  };

  const handleCreateTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      status: 'pending',
      createdAt: new Date(),
      assignee: taskData?.assignee ? {
        name: taskData?.assignee?.split('-')?.map((word) =>
        word?.charAt(0)?.toUpperCase() + word?.slice(1)
        )?.join(' '),
        avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
        avatarAlt: 'Professional headshot placeholder'
      } : null
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDragEnd = (result) => {
    if (!result?.destination) return;

    const items = Array.from(filteredTasks);
    const [reorderedItem] = items?.splice(result?.source?.index, 1);
    items?.splice(result?.destination?.index, 0, reorderedItem);

    setFilteredTasks(items);
  };

  const completedCount = tasks?.filter((task) => task?.status === 'completed')?.length;

  const breadcrumbs = [
  { label: 'Dashboard', path: '/dashboard', icon: 'Home' },
  { label: 'Task Lists', path: '/task-list-detail', icon: 'List' }];


  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16">
        <div className="px-2 sm:px-4 py-2">
          <BreadcrumbTrail customBreadcrumbs={breadcrumbs} />
        </div>

        <TaskListHeader
          listTitle={listTitle}
          onTitleChange={setListTitle}
          taskCount={tasks?.length}
          completedCount={completedCount}
          onFilterChange={setCurrentFilter}
          onSortChange={setCurrentSort}
          currentFilter={currentFilter}
          currentSort={currentSort} />


        <div className="flex">
          {/* Main Content */}
          <div className={`flex-1 p-3 sm:p-4 transition-all duration-300 ${
          isDiagramPanelCollapsed ? 'mr-12' : 'mr-72'} ${
          isCollaborationSidebarVisible ? 'mr-72' : ''}`}>
            
            <TaskCreationForm
              isExpanded={isCreationFormExpanded}
              onToggle={() => setIsCreationFormExpanded(!isCreationFormExpanded)}
              onCreateTask={handleCreateTask}
              onCancel={() => setIsCreationFormExpanded(false)} />


            {/* Tasks List */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) =>
                <div
                  {...provided?.droppableProps}
                  ref={provided?.innerRef}
                  className="space-y-4">

                    {filteredTasks?.length === 0 ?
                  <div className="text-center py-12">
                        <div className="text-muted-foreground">
                          <p className="text-lg mb-2">No tasks found</p>
                          <p className="text-sm">
                            {currentFilter === 'all' ? 'Create your first task to get started' :
                        `No tasks match the current filter: ${currentFilter}`
                        }
                          </p>
                        </div>
                      </div> :

                  filteredTasks?.map((task, index) =>
                  <Draggable key={task?.id} draggableId={task?.id?.toString()} index={index}>
                          {(provided, snapshot) =>
                    <div
                      ref={provided?.innerRef}
                      {...provided?.draggableProps}
                      {...provided?.dragHandleProps}>

                              <TaskItem
                        task={task}
                        onStatusChange={handleTaskStatusChange}
                        onDelete={handleTaskDelete}
                        isDragging={snapshot?.isDragging} />

                            </div>
                    }
                        </Draggable>
                  )
                  }
                    {provided?.placeholder}
                  </div>
                }
              </Droppable>
            </DragDropContext>
          </div>

          {/* Diagram Panel */}
          <DiagramPanel
            isCollapsed={isDiagramPanelCollapsed}
            onToggleCollapse={() => setIsDiagramPanelCollapsed(!isDiagramPanelCollapsed)} />

        </div>
      </div>
      {/* Collaboration Sidebar */}
      <CollaborationSidebar
        isVisible={isCollaborationSidebarVisible}
        onToggle={() => setIsCollaborationSidebarVisible(!isCollaborationSidebarVisible)} />

      <QuickActionMenu />
    </div>);

};

export default TaskListDetail;