import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShapeLibrary = ({ onShapeSelect, selectedShape, isCollapsed, onToggleCollapse, onSelectTemplate }) => {
  const [activeCategory, setActiveCategory] = useState('basic');

  const shapeCategories = {
    basic: {
      name: 'Basic Shapes',
      icon: 'Square',
      shapes: [
        { id: 'rectangle', name: 'Rectangle', icon: 'Square', type: 'rectangle', defaultWidth: 120, defaultHeight: 80 },
        { id: 'circle', name: 'Circle', icon: 'Circle', type: 'circle', defaultWidth: 100, defaultHeight: 100 },
        { id: 'diamond', name: 'Diamond', icon: 'Diamond', type: 'diamond', defaultWidth: 100, defaultHeight: 100 },
        { id: 'triangle', name: 'Triangle', icon: 'Triangle', type: 'triangle', defaultWidth: 100, defaultHeight: 100 },
        { id: 'rounded-rectangle', name: 'Rounded Box', icon: 'Square', type: 'rounded-rectangle', defaultWidth: 120, defaultHeight: 60 },
        { id: 'hexagon', name: 'Hexagon', icon: 'Hexagon', type: 'hexagon', defaultWidth: 100, defaultHeight: 100 },
        { id: 'star', name: 'Star', icon: 'Star', type: 'star', defaultWidth: 80, defaultHeight: 80 },
        { id: 'arrow', name: 'Arrow', icon: 'ArrowRight', type: 'arrow', defaultWidth: 100, defaultHeight: 40 }
      ]
    },
    flowchart: {
      name: 'Flowchart',
      icon: 'GitBranch',
      shapes: [
        { id: 'process', name: 'Process', icon: 'Square', type: 'rectangle', text: 'Process', defaultWidth: 120, defaultHeight: 60, category: 'process' },
        { id: 'decision', name: 'Decision', icon: 'Diamond', type: 'diamond', text: 'Decision?', defaultWidth: 120, defaultHeight: 80, category: 'decision' },
        { id: 'start-end', name: 'Start/End', icon: 'Circle', type: 'rounded-rectangle', text: 'Start', defaultWidth: 100, defaultHeight: 60, category: 'terminal' },
        { id: 'data', name: 'Data/IO', icon: 'Database', type: 'parallelogram', text: 'Input/Output', defaultWidth: 120, defaultHeight: 60, category: 'data' },
        { id: 'document', name: 'Document', icon: 'FileText', type: 'document', text: 'Document', defaultWidth: 100, defaultHeight: 120, category: 'document' },
        { id: 'predefined', name: 'Predefined', icon: 'Package', type: 'predefined-process', text: 'Subroutine', defaultWidth: 120, defaultHeight: 60, category: 'process' },
        { id: 'manual-input', name: 'Manual Input', icon: 'Edit', type: 'manual-input', text: 'Manual Input', defaultWidth: 120, defaultHeight: 60, category: 'input' },
        { id: 'connector', name: 'Connector', icon: 'Circle', type: 'circle', text: 'A', defaultWidth: 40, defaultHeight: 40, category: 'connector' }
      ]
    },
    workflow: {
      name: 'Workflow',
      icon: 'Workflow',
      shapes: [
        { id: 'task', name: 'Task', icon: 'CheckSquare', type: 'rectangle', text: 'Task', defaultWidth: 120, defaultHeight: 60, category: 'task' },
        { id: 'subprocess', name: 'Subprocess', icon: 'Layers', type: 'subprocess', text: 'Subprocess', defaultWidth: 140, defaultHeight: 80, category: 'process' },
        { id: 'gateway-exclusive', name: 'Exclusive Gateway', icon: 'Diamond', type: 'gateway-exclusive', text: 'X', defaultWidth: 60, defaultHeight: 60, category: 'gateway' },
        { id: 'gateway-parallel', name: 'Parallel Gateway', icon: 'Diamond', type: 'gateway-parallel', text: '+', defaultWidth: 60, defaultHeight: 60, category: 'gateway' },
        { id: 'gateway-inclusive', name: 'Inclusive Gateway', icon: 'Diamond', type: 'gateway-inclusive', text: 'O', defaultWidth: 60, defaultHeight: 60, category: 'gateway' },
        { id: 'event-start', name: 'Start Event', icon: 'Play', type: 'event-start', text: '', defaultWidth: 50, defaultHeight: 50, category: 'event' },
        { id: 'event-end', name: 'End Event', icon: 'Square', type: 'event-end', text: '', defaultWidth: 50, defaultHeight: 50, category: 'event' },
        { id: 'event-intermediate', name: 'Intermediate Event', icon: 'Circle', type: 'event-intermediate', text: '', defaultWidth: 50, defaultHeight: 50, category: 'event' }
      ]
    },
    lifecycle: {
      name: 'Lifecycle',
      icon: 'RotateCw',
      shapes: [
        { id: 'phase', name: 'Phase/Stage', icon: 'Hexagon', type: 'hexagon', text: 'Phase', defaultWidth: 120, defaultHeight: 80, category: 'phase' },
        { id: 'milestone', name: 'Milestone', icon: 'Flag', type: 'milestone', text: 'Milestone', defaultWidth: 20, defaultHeight: 80, category: 'milestone' },
        { id: 'deliverable', name: 'Deliverable', icon: 'Package', type: 'rectangle', text: 'Deliverable', defaultWidth: 100, defaultHeight: 60, category: 'deliverable' },
        { id: 'review', name: 'Review Point', icon: 'Search', type: 'diamond', text: 'Review', defaultWidth: 80, defaultHeight: 80, category: 'review' },
        { id: 'iteration', name: 'Iteration', icon: 'RotateCcw', type: 'curved-arrow', text: 'Iterate', defaultWidth: 100, defaultHeight: 60, category: 'iteration' },
        { id: 'feedback', name: 'Feedback Loop', icon: 'MessageCircle', type: 'feedback-loop', text: 'Feedback', defaultWidth: 80, defaultHeight: 40, category: 'feedback' }
      ]
    },
    organizational: {
      name: 'Organizational',
      icon: 'Users',
      shapes: [
        { id: 'person', name: 'Person', icon: 'User', type: 'rectangle', text: 'Name\nTitle', defaultWidth: 100, defaultHeight: 80, category: 'person' },
        { id: 'department', name: 'Department', icon: 'Building', type: 'rectangle', text: 'Department', defaultWidth: 120, defaultHeight: 60, category: 'department' },
        { id: 'role', name: 'Role', icon: 'UserCheck', type: 'circle', text: 'Role', defaultWidth: 80, defaultHeight: 80, category: 'role' },
        { id: 'team', name: 'Team', icon: 'Users', type: 'rounded-rectangle', text: 'Team Name', defaultWidth: 120, defaultHeight: 60, category: 'team' },
        { id: 'position', name: 'Position', icon: 'Briefcase', type: 'position', text: 'Position Title', defaultWidth: 110, defaultHeight: 70, category: 'position' }
      ]
    },
    technical: {
      name: 'Technical',
      icon: 'Cpu',
      shapes: [
        { id: 'server', name: 'Server', icon: 'Server', type: 'server', text: 'Server', defaultWidth: 80, defaultHeight: 100, category: 'infrastructure' },
        { id: 'database', name: 'Database', icon: 'Database', type: 'cylinder', text: 'Database', defaultWidth: 80, defaultHeight: 60, category: 'data' },
        { id: 'cloud', name: 'Cloud', icon: 'Cloud', type: 'cloud', text: 'Cloud', defaultWidth: 120, defaultHeight: 60, category: 'infrastructure' },
        { id: 'api', name: 'API', icon: 'Zap', type: 'api', text: 'API', defaultWidth: 100, defaultHeight: 60, category: 'service' },
        { id: 'microservice', name: 'Microservice', icon: 'Box', type: 'microservice', text: 'Service', defaultWidth: 100, defaultHeight: 60, category: 'service' },
        { id: 'queue', name: 'Message Queue', icon: 'List', type: 'queue', text: 'Queue', defaultWidth: 100, defaultHeight: 40, category: 'communication' },
        { id: 'load-balancer', name: 'Load Balancer', icon: 'BarChart', type: 'load-balancer', text: 'LB', defaultWidth: 80, defaultHeight: 60, category: 'infrastructure' },
        { id: 'firewall', name: 'Firewall', icon: 'Shield', type: 'firewall', text: 'Firewall', defaultWidth: 80, defaultHeight: 60, category: 'security' }
      ]
    },
    uml: {
      name: 'UML',
      icon: 'FileCode',
      shapes: [
        { id: 'class', name: 'Class', icon: 'Square', type: 'uml-class', text: 'ClassName', defaultWidth: 120, defaultHeight: 100, category: 'class' },
        { id: 'interface', name: 'Interface', icon: 'Circle', type: 'uml-interface', text: '<<interface>>\nIName', defaultWidth: 120, defaultHeight: 80, category: 'interface' },
        { id: 'actor', name: 'Actor', icon: 'User', type: 'uml-actor', text: 'Actor', defaultWidth: 60, defaultHeight: 100, category: 'actor' },
        { id: 'use-case', name: 'Use Case', icon: 'Circle', type: 'ellipse', text: 'Use Case', defaultWidth: 120, defaultHeight: 60, category: 'usecase' },
        { id: 'component', name: 'Component', icon: 'Package', type: 'uml-component', text: 'Component', defaultWidth: 120, defaultHeight: 80, category: 'component' },
        { id: 'note', name: 'Note', icon: 'StickyNote', type: 'uml-note', text: 'Note text', defaultWidth: 100, defaultHeight: 60, category: 'annotation' }
      ]
    }
  };

  if (isCollapsed) {
    return (
      <div className="bg-white border-r border-border w-12 flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          iconName="ChevronLeft"
          className="w-8 h-8"
        />
      </div>
    );
  }

  return (
    <div className="bg-white border-r border-border w-80 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Shape Library</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          iconName="ChevronRight"
        />
      </div>
      {/* Category Tabs */}
      <div className="flex flex-wrap border-b border-border">
        {Object.entries(shapeCategories)?.map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`flex items-center justify-center space-x-1 px-2 py-2 text-xs font-medium transition-smooth min-w-0 flex-1 ${
              activeCategory === key
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title={category?.name}
          >
            <Icon name={category?.icon} size={12} />
            <span className="hidden sm:inline truncate">{category?.name?.split(' ')?.[0]}</span>
          </button>
        ))}
      </div>
      {/* Shapes Grid */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {shapeCategories?.[activeCategory]?.shapes?.map((shape) => (
            <button
              key={shape?.id}
              onClick={() => onShapeSelect(shape)}
              className={`flex flex-col items-center space-y-2 p-3 rounded-lg border-2 transition-smooth hover:border-primary/50 hover:bg-primary/5 group ${
                selectedShape?.id === shape?.id
                  ? 'border-primary bg-primary/10' :'border-border bg-card'
              }`}
              title={`${shape?.name}${shape?.text ? ` - "${shape?.text}"` : ''}`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon name={shape?.icon} size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-xs font-medium text-center text-foreground group-hover:text-primary transition-colors leading-tight">
                {shape?.name}
              </span>
              {shape?.text && (
                <span className="text-[10px] text-muted-foreground text-center opacity-75">
                  "{shape?.text}"
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Enhanced Quick Templates */}
      <div className="border-t border-border p-4">
        <h4 className="text-xs font-semibold text-foreground mb-3">Quick Start Templates</h4>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Workflow"
            iconPosition="left"
            className="justify-start"
            onClick={() => onSelectTemplate({
              name: 'Process Flow',
              elements: [
                { id: 1, type: 'rounded-rectangle', x: 50, y: 100, width: 120, height: 60, text: 'Start', style: { fill: '#10B981', stroke: '#059669', strokeWidth: 2 } },
                { id: 2, type: 'rectangle', x: 250, y: 100, width: 120, height: 60, text: 'Process', style: { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2 } },
                { id: 3, type: 'diamond', x: 450, y: 80, width: 120, height: 100, text: 'Decision', style: { fill: '#F59E0B', stroke: '#D97706', strokeWidth: 2 } },
                { id: 4, type: 'rounded-rectangle', x: 650, y: 100, width: 120, height: 60, text: 'End', style: { fill: '#10B981', stroke: '#059669', strokeWidth: 2 } }
              ],
              connections: [
                { from: 1, to: 2 },
                { from: 2, to: 3 },
                { from: 3, to: 4 }
              ]
            })}
          >
            Process Flow
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="RotateCw"
            iconPosition="left"
            className="justify-start"
            onClick={() => onSelectTemplate({
              name: 'Lifecycle Diagram',
              elements: [
                { id: 1, type: 'circle', x: 400, y: 100, width: 100, height: 100, text: 'Planning', style: { fill: '#DBEAFE', stroke: '#3B82F6', strokeWidth: 2 } },
                { id: 2, type: 'circle', x: 600, y: 250, width: 100, height: 100, text: 'Development', style: { fill: '#D1FAE5', stroke: '#10B981', strokeWidth: 2 } },
                { id: 3, type: 'circle', x: 400, y: 400, width: 100, height: 100, text: 'Testing', style: { fill: '#FEF3C7', stroke: '#F59E0B', strokeWidth: 2 } },
                { id: 4, type: 'circle', x: 200, y: 250, width: 100, height: 100, text: 'Deployment', style: { fill: '#FCE7F3', stroke: '#EC4899', strokeWidth: 2 } }
              ],
              connections: [
                { from: 1, to: 2 },
                { from: 2, to: 3 },
                { from: 3, to: 4 },
                { from: 4, to: 1 }
              ]
            })}
          >
            Lifecycle Diagram
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Users"
            iconPosition="left"
            className="justify-start"
            onClick={() => onSelectTemplate({
              name: 'Org Chart',
              elements: [
                { id: 1, type: 'rectangle', x: 400, y: 50, width: 150, height: 70, text: 'CEO', style: { fill: '#DBEAFE', stroke: '#3B82F6', strokeWidth: 2 } },
                { id: 2, type: 'rectangle', x: 200, y: 200, width: 150, height: 70, text: 'CTO', style: { fill: '#D1FAE5', stroke: '#10B981', strokeWidth: 2 } },
                { id: 3, type: 'rectangle', x: 400, y: 200, width: 150, height: 70, text: 'CFO', style: { fill: '#D1FAE5', stroke: '#10B981', strokeWidth: 2 } },
                { id: 4, type: 'rectangle', x: 600, y: 200, width: 150, height: 70, text: 'COO', style: { fill: '#D1FAE5', stroke: '#10B981', strokeWidth: 2 } }
              ],
              connections: [
                { from: 1, to: 2 },
                { from: 1, to: 3 },
                { from: 1, to: 4 }
              ]
            })}
          >
            Org Chart
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Cpu"
            iconPosition="left"
            className="justify-start"
            onClick={() => onSelectTemplate({
              name: 'System Architecture',
              elements: [
                { id: 1, type: 'cloud', x: 400, y: 50, width: 150, height: 80, text: 'Cloud Services', style: { fill: '#E0E7FF', stroke: '#6366F1', strokeWidth: 2 } },
                { id: 2, type: 'rectangle', x: 200, y: 200, width: 150, height: 70, text: 'Frontend', style: { fill: '#DBEAFE', stroke: '#3B82F6', strokeWidth: 2 } },
                { id: 3, type: 'rectangle', x: 400, y: 200, width: 150, height: 70, text: 'API Gateway', style: { fill: '#FEF3C7', stroke: '#F59E0B', strokeWidth: 2 } },
                { id: 4, type: 'rectangle', x: 600, y: 200, width: 150, height: 70, text: 'Database', style: { fill: '#FCE7F3', stroke: '#EC4899', strokeWidth: 2 } }
              ],
              connections: [
                { from: 1, to: 3 },
                { from: 2, to: 3 },
                { from: 3, to: 4 }
              ]
            })}
          >
            System Architecture
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="FileCode"
            iconPosition="left"
            className="justify-start"
            onClick={() => onSelectTemplate({
              name: 'UML Diagram',
              elements: [
                { id: 1, type: 'rectangle', x: 200, y: 100, width: 200, height: 120, text: 'User\n-----------------\n+id: string\n+name: string', style: { fill: '#DBEAFE', stroke: '#3B82F6', strokeWidth: 2 } },
                { id: 2, type: 'rectangle', x: 600, y: 100, width: 200, height: 120, text: 'Task\n-----------------\n+id: string\n+title: string', style: { fill: '#D1FAE5', stroke: '#10B981', strokeWidth: 2 } }
              ],
              connections: [
                { from: 1, to: 2, label: '1..n' }
              ]
            })}
          >
            UML Diagram
          </Button>
        </div>
        
        {/* Shape Count & Category Info */}
        <div className="mt-4 pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            <span className="font-medium">{shapeCategories?.[activeCategory]?.shapes?.length}</span> shapes available
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapeLibrary;