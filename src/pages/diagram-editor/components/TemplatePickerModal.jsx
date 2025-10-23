import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TemplatePickerModal = ({ isOpen, onClose, onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('workflow');

  const templates = {
    workflow: {
      name: 'Workflow Diagrams',
      icon: 'Workflow',
      items: [
        {
          id: 'basic-process',
          name: 'Basic Process Flow',
          description: 'Simple linear process with decision points',
          preview: 'Start → Process → Decision → End',
          elements: [
            { id: 1, type: 'rounded-rectangle', x: 50, y: 100, width: 120, height: 60, text: 'Start Process', style: { fill: '#10B981', stroke: '#059669', strokeWidth: 2 } },
            { id: 2, type: 'rectangle', x: 250, y: 100, width: 120, height: 60, text: 'Execute Task', style: { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2 } },
            { id: 3, type: 'diamond', x: 450, y: 80, width: 120, height: 100, text: 'Success?', style: { fill: '#F59E0B', stroke: '#D97706', strokeWidth: 2 } },
            { id: 4, type: 'rounded-rectangle', x: 650, y: 100, width: 120, height: 60, text: 'Complete', style: { fill: '#10B981', stroke: '#059669', strokeWidth: 2 } },
            { id: 5, type: 'rectangle', x: 450, y: 220, width: 120, height: 60, text: 'Handle Error', style: { fill: '#EF4444', stroke: '#DC2626', strokeWidth: 2 } }
          ],
          connections: [
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 3, to: 4, label: 'Yes' },
            { from: 3, to: 5, label: 'No' },
            { from: 5, to: 2 }
          ]
        },
        {
          id: 'approval-workflow',
          name: 'Approval Workflow',
          description: 'Multi-step approval process with parallel paths',
          preview: 'Submit → Review → Approve/Reject → Complete',
          elements: [
            { id: 1, type: 'rounded-rectangle', x: 50, y: 150, width: 120, height: 60, text: 'Submit Request', style: { fill: '#6366F1', stroke: '#4F46E5', strokeWidth: 2 } },
            { id: 2, type: 'rectangle', x: 250, y: 150, width: 120, height: 60, text: 'Initial Review', style: { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2 } },
            { id: 3, type: 'diamond', x: 450, y: 130, width: 120, height: 100, text: 'Approved?', style: { fill: '#F59E0B', stroke: '#D97706', strokeWidth: 2 } },
            { id: 4, type: 'rectangle', x: 650, y: 80, width: 120, height: 60, text: 'Manager Review', style: { fill: '#8B5CF6', stroke: '#7C3AED', strokeWidth: 2 } },
            { id: 5, type: 'rectangle', x: 650, y: 220, width: 120, height: 60, text: 'Send Back', style: { fill: '#EF4444', stroke: '#DC2626', strokeWidth: 2 } },
            { id: 6, type: 'rounded-rectangle', x: 850, y: 80, width: 120, height: 60, text: 'Final Approval', style: { fill: '#10B981', stroke: '#059669', strokeWidth: 2 } }
          ],
          connections: [
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 3, to: 4, label: 'Yes' },
            { from: 3, to: 5, label: 'No' },
            { from: 4, to: 6 },
            { from: 5, to: 1 }
          ]
        },
        {
          id: 'swimlane-process',
          name: 'Swimlane Process',
          description: 'Cross-functional process with role-based lanes',
          preview: 'Multi-role process with clear responsibilities',
          elements: [
            // Customer Lane
            { id: 'lane1', type: 'lane', x: 0, y: 50, width: 1000, height: 100, text: 'Customer', style: { fill: '#F3F4F6', stroke: '#D1D5DB', strokeWidth: 1 } },
            { id: 1, type: 'rounded-rectangle', x: 50, y: 80, width: 120, height: 40, text: 'Place Order', style: { fill: '#6366F1', stroke: '#4F46E5', strokeWidth: 2 } },
            { id: 2, type: 'rounded-rectangle', x: 800, y: 80, width: 120, height: 40, text: 'Receive Product', style: { fill: '#10B981', stroke: '#059669', strokeWidth: 2 } },
            
            // Sales Lane
            { id: 'lane2', type: 'lane', x: 0, y: 150, width: 1000, height: 100, text: 'Sales Team', style: { fill: '#FEF3C7', stroke: '#F59E0B', strokeWidth: 1 } },
            { id: 3, type: 'rectangle', x: 200, y: 180, width: 120, height: 40, text: 'Process Order', style: { fill: '#F59E0B', stroke: '#D97706', strokeWidth: 2 } },
            { id: 4, type: 'diamond', x: 380, y: 170, width: 80, height: 60, text: 'In Stock?', style: { fill: '#F59E0B', stroke: '#D97706', strokeWidth: 2 } },
            
            // Fulfillment Lane
            { id: 'lane3', type: 'lane', x: 0, y: 250, width: 1000, height: 100, text: 'Fulfillment', style: { fill: '#DBEAFE', stroke: '#3B82F6', strokeWidth: 1 } },
            { id: 5, type: 'rectangle', x: 500, y: 280, width: 120, height: 40, text: 'Pick & Pack', style: { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2 } },
            { id: 6, type: 'rectangle', x: 650, y: 280, width: 120, height: 40, text: 'Ship Product', style: { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2 } }
          ],
          connections: [
            { from: 1, to: 3 },
            { from: 3, to: 4 },
            { from: 4, to: 5, label: 'Yes' },
            { from: 5, to: 6 },
            { from: 6, to: 2 }
          ]
        }
      ]
    },
    lifecycle: {
      name: 'Lifecycle Diagrams',
      icon: 'RotateCw',
      items: [
        {
          id: 'sdlc',
          name: 'Software Development Lifecycle',
          description: 'Complete SDLC with iterative phases',
          preview: 'Plan → Design → Develop → Test → Deploy → Maintain',
          elements: [
            { id: 1, type: 'hexagon', x: 400, y: 50, width: 120, height: 80, text: 'Planning', style: { fill: '#6366F1', stroke: '#4F46E5', strokeWidth: 2 } },
            { id: 2, type: 'hexagon', x: 600, y: 150, width: 120, height: 80, text: 'Design', style: { fill: '#8B5CF6', stroke: '#7C3AED', strokeWidth: 2 } },
            { id: 3, type: 'hexagon', x: 600, y: 300, width: 120, height: 80, text: 'Development', style: { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2 } },
            { id: 4, type: 'hexagon', x: 400, y: 400, width: 120, height: 80, text: 'Testing', style: { fill: '#F59E0B', stroke: '#D97706', strokeWidth: 2 } },
            { id: 5, type: 'hexagon', x: 200, y: 300, width: 120, height: 80, text: 'Deployment', style: { fill: '#10B981', stroke: '#059669', strokeWidth: 2 } },
            { id: 6, type: 'hexagon', x: 200, y: 150, width: 120, height: 80, text: 'Maintenance', style: { fill: '#EF4444', stroke: '#DC2626', strokeWidth: 2 } }
          ],
          connections: [
            { from: 1, to: 2, type: 'curved' },
            { from: 2, to: 3, type: 'curved' },
            { from: 3, to: 4, type: 'curved' },
            { from: 4, to: 5, type: 'curved' },
            { from: 5, to: 6, type: 'curved' },
            { from: 6, to: 1, type: 'curved' }
          ]
        },
        {
          id: 'product-lifecycle',
          name: 'Product Lifecycle',
          description: 'Product development and market lifecycle',
          preview: 'Concept → Development → Launch → Growth → Maturity → Decline',
          elements: [
            { id: 1, type: 'circle', x: 100, y: 200, width: 100, height: 100, text: 'Concept', style: { fill: '#6366F1', stroke: '#4F46E5', strokeWidth: 2 } },
            { id: 2, type: 'circle', x: 250, y: 150, width: 100, height: 100, text: 'Development', style: { fill: '#8B5CF6', stroke: '#7C3AED', strokeWidth: 2 } },
            { id: 3, type: 'circle', x: 400, y: 100, width: 100, height: 100, text: 'Launch', style: { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2 } },
            { id: 4, type: 'circle', x: 550, y: 150, width: 100, height: 100, text: 'Growth', style: { fill: '#10B981', stroke: '#059669', strokeWidth: 2 } },
            { id: 5, type: 'circle', x: 700, y: 200, width: 100, height: 100, text: 'Maturity', style: { fill: '#F59E0B', stroke: '#D97706', strokeWidth: 2 } },
            { id: 6, type: 'circle', x: 550, y: 250, width: 100, height: 100, text: 'Decline', style: { fill: '#EF4444', stroke: '#DC2626', strokeWidth: 2 } }
          ],
          connections: [
            { from: 1, to: 2, type: 'arrow' },
            { from: 2, to: 3, type: 'arrow' },
            { from: 3, to: 4, type: 'arrow' },
            { from: 4, to: 5, type: 'arrow' },
            { from: 5, to: 6, type: 'arrow' }
          ]
        },
        {
          id: 'user-journey',
          name: 'User Journey',
          description: 'Customer experience journey mapping',
          preview: 'Awareness → Consideration → Purchase → Retention',
          elements: [
            { id: 1, type: 'rounded-rectangle', x: 50, y: 100, width: 120, height: 80, text: 'Awareness\n📢', style: { fill: '#6366F1', stroke: '#4F46E5', strokeWidth: 2 } },
            { id: 2, type: 'rounded-rectangle', x: 220, y: 100, width: 120, height: 80, text: 'Interest\n👀', style: { fill: '#8B5CF6', stroke: '#7C3AED', strokeWidth: 2 } },
            { id: 3, type: 'rounded-rectangle', x: 390, y: 100, width: 120, height: 80, text: 'Consideration\n🤔', style: { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2 } },
            { id: 4, type: 'rounded-rectangle', x: 560, y: 100, width: 120, height: 80, text: 'Purchase\n💳', style: { fill: '#10B981', stroke: '#059669', strokeWidth: 2 } },
            { id: 5, type: 'rounded-rectangle', x: 730, y: 100, width: 120, height: 80, text: 'Retention\n❤️', style: { fill: '#F59E0B', stroke: '#D97706', strokeWidth: 2 } },
            // Touchpoints
            { id: 6, type: 'ellipse', x: 50, y: 220, width: 120, height: 50, text: 'Social Media', style: { fill: '#F3F4F6', stroke: '#9CA3AF', strokeWidth: 1 } },
            { id: 7, type: 'ellipse', x: 220, y: 220, width: 120, height: 50, text: 'Website', style: { fill: '#F3F4F6', stroke: '#9CA3AF', strokeWidth: 1 } },
            { id: 8, type: 'ellipse', x: 390, y: 220, width: 120, height: 50, text: 'Reviews', style: { fill: '#F3F4F6', stroke: '#9CA3AF', strokeWidth: 1 } },
            { id: 9, type: 'ellipse', x: 560, y: 220, width: 120, height: 50, text: 'Store/App', style: { fill: '#F3F4F6', stroke: '#9CA3AF', strokeWidth: 1 } },
            { id: 10, type: 'ellipse', x: 730, y: 220, width: 120, height: 50, text: 'Support', style: { fill: '#F3F4F6', stroke: '#9CA3AF', strokeWidth: 1 } }
          ],
          connections: [
            { from: 1, to: 2, type: 'arrow' },
            { from: 2, to: 3, type: 'arrow' },
            { from: 3, to: 4, type: 'arrow' },
            { from: 4, to: 5, type: 'arrow' },
            { from: 1, to: 6, type: 'dotted' },
            { from: 2, to: 7, type: 'dotted' },
            { from: 3, to: 8, type: 'dotted' },
            { from: 4, to: 9, type: 'dotted' },
            { from: 5, to: 10, type: 'dotted' }
          ]
        }
      ]
    },
    organizational: {
      name: 'Organizational Charts',
      icon: 'Users',
      items: [
        {
          id: 'hierarchy',
          name: 'Corporate Hierarchy',
          description: 'Traditional top-down organizational structure',
          preview: 'CEO → VPs → Directors → Managers → Staff',
          elements: [
            { id: 1, type: 'rectangle', x: 400, y: 50, width: 150, height: 70, text: 'CEO\nJohn Smith', style: { fill: '#6366F1', stroke: '#4F46E5', strokeWidth: 2 } },
            { id: 2, type: 'rectangle', x: 200, y: 180, width: 130, height: 60, text: 'VP Sales\nJane Doe', style: { fill: '#8B5CF6', stroke: '#7C3AED', strokeWidth: 2 } },
            { id: 3, type: 'rectangle', x: 400, y: 180, width: 130, height: 60, text: 'VP Engineering\nBob Wilson', style: { fill: '#8B5CF6', stroke: '#7C3AED', strokeWidth: 2 } },
            { id: 4, type: 'rectangle', x: 600, y: 180, width: 130, height: 60, text: 'VP Marketing\nAlice Brown', style: { fill: '#8B5CF6', stroke: '#7C3AED', strokeWidth: 2 } },
            { id: 5, type: 'rectangle', x: 100, y: 300, width: 120, height: 50, text: 'Sales Manager\nTom Lee', style: { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2 } },
            { id: 6, type: 'rectangle', x: 280, y: 300, width: 120, height: 50, text: 'Lead Dev\nSarah Chen', style: { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2 } },
            { id: 7, type: 'rectangle', x: 460, y: 300, width: 120, height: 50, text: 'DevOps Lead\nMike Davis', style: { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2 } },
            { id: 8, type: 'rectangle', x: 640, y: 300, width: 120, height: 50, text: 'Marketing Mgr\nLisa Wang', style: { fill: '#3B82F6', stroke: '#1E40AF', strokeWidth: 2 } }
          ],
          connections: [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 1, to: 4 },
            { from: 2, to: 5 },
            { from: 3, to: 6 },
            { from: 3, to: 7 },
            { from: 4, to: 8 }
          ]
        },
        {
          id: 'matrix-org',
          name: 'Matrix Organization',
          description: 'Cross-functional team structure',
          preview: 'Dual reporting relationships across functions and projects',
          elements: [
            // Function Headers
            { id: 'f1', type: 'rectangle', x: 150, y: 50, width: 100, height: 40, text: 'Engineering', style: { fill: '#E5E7EB', stroke: '#9CA3AF', strokeWidth: 1 } },
            { id: 'f2', type: 'rectangle', x: 300, y: 50, width: 100, height: 40, text: 'Design', style: { fill: '#E5E7EB', stroke: '#9CA3AF', strokeWidth: 1 } },
            { id: 'f3', type: 'rectangle', x: 450, y: 50, width: 100, height: 40, text: 'Marketing', style: { fill: '#E5E7EB', stroke: '#9CA3AF', strokeWidth: 1 } },
            
            // Project Headers
            { id: 'p1', type: 'rectangle', x: 50, y: 150, width: 80, height: 40, text: 'Project A', style: { fill: '#DBEAFE', stroke: '#3B82F6', strokeWidth: 1 } },
            { id: 'p2', type: 'rectangle', x: 50, y: 220, width: 80, height: 40, text: 'Project B', style: { fill: '#DBEAFE', stroke: '#3B82F6', strokeWidth: 1 } },
            { id: 'p3', type: 'rectangle', x: 50, y: 290, width: 80, height: 40, text: 'Project C', style: { fill: '#DBEAFE', stroke: '#3B82F6', strokeWidth: 1 } },
            
            // Team Members
            { id: 1, type: 'circle', x: 175, y: 160, width: 50, height: 50, text: 'Dev 1', style: { fill: '#10B981', stroke: '#059669', strokeWidth: 2 } },
            { id: 2, type: 'circle', x: 325, y: 160, width: 50, height: 50, text: 'UX 1', style: { fill: '#8B5CF6', stroke: '#7C3AED', strokeWidth: 2 } },
            { id: 3, type: 'circle', x: 175, y: 230, width: 50, height: 50, text: 'Dev 2', style: { fill: '#10B981', stroke: '#059669', strokeWidth: 2 } },
            { id: 4, type: 'circle', x: 475, y: 230, width: 50, height: 50, text: 'MKT 1', style: { fill: '#F59E0B', stroke: '#D97706', strokeWidth: 2 } },
            { id: 5, type: 'circle', x: 325, y: 300, width: 50, height: 50, text: 'UX 2', style: { fill: '#8B5CF6', stroke: '#7C3AED', strokeWidth: 2 } },
            { id: 6, type: 'circle', x: 475, y: 300, width: 50, height: 50, text: 'MKT 2', style: { fill: '#F59E0B', stroke: '#D97706', strokeWidth: 2 } }
          ],
          connections: [
            // Functional reporting (dotted)
            { from: 'f1', to: 1, type: 'dotted' },
            { from: 'f1', to: 3, type: 'dotted' },
            { from: 'f2', to: 2, type: 'dotted' },
            { from: 'f2', to: 5, type: 'dotted' },
            { from: 'f3', to: 4, type: 'dotted' },
            { from: 'f3', to: 6, type: 'dotted' },
            
            // Project reporting (solid)
            { from: 'p1', to: 1 },
            { from: 'p1', to: 2 },
            { from: 'p2', to: 3 },
            { from: 'p2', to: 4 },
            { from: 'p3', to: 5 },
            { from: 'p3', to: 6 }
          ]
        }
      ]
    },
    technical: {
      name: 'Technical Diagrams',
      icon: 'Cpu',
      items: [
        {
          id: 'system-architecture',
          name: 'System Architecture',
          description: 'High-level system component architecture',
          preview: 'Frontend → API Gateway → Services → Database',
          elements: [
            // Frontend Layer
            { id: 1, type: 'rectangle', x: 100, y: 100, width: 120, height: 60, text: 'React App', style: { fill: '#61DAFB', stroke: '#21B0C4', strokeWidth: 2 } },
            { id: 2, type: 'rectangle', x: 280, y: 100, width: 120, height: 60, text: 'Mobile App', style: { fill: '#61DAFB', stroke: '#21B0C4', strokeWidth: 2 } },
            
            // Gateway Layer
            { id: 3, type: 'rectangle', x: 190, y: 220, width: 140, height: 60, text: 'API Gateway', style: { fill: '#FF6B6B', stroke: '#E55555', strokeWidth: 2 } },
            
            // Service Layer
            { id: 4, type: 'rectangle', x: 50, y: 340, width: 100, height: 60, text: 'Auth Service', style: { fill: '#4ECDC4', stroke: '#26D0CE', strokeWidth: 2 } },
            { id: 5, type: 'rectangle', x: 190, y: 340, width: 100, height: 60, text: 'User Service', style: { fill: '#4ECDC4', stroke: '#26D0CE', strokeWidth: 2 } },
            { id: 6, type: 'rectangle', x: 330, y: 340, width: 100, height: 60, text: 'Order Service', style: { fill: '#4ECDC4', stroke: '#26D0CE', strokeWidth: 2 } },
            
            // Database Layer
            { id: 7, type: 'cylinder', x: 80, y: 460, width: 80, height: 60, text: 'Auth DB', style: { fill: '#95E1D3', stroke: '#45B7D1', strokeWidth: 2 } },
            { id: 8, type: 'cylinder', x: 190, y: 460, width: 80, height: 60, text: 'User DB', style: { fill: '#95E1D3', stroke: '#45B7D1', strokeWidth: 2 } },
            { id: 9, type: 'cylinder', x: 300, y: 460, width: 80, height: 60, text: 'Order DB', style: { fill: '#95E1D3', stroke: '#45B7D1', strokeWidth: 2 } }
          ],
          connections: [
            { from: 1, to: 3 },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
            { from: 3, to: 5 },
            { from: 3, to: 6 },
            { from: 4, to: 7 },
            { from: 5, to: 8 },
            { from: 6, to: 9 }
          ]
        },
        {
          id: 'network-diagram',
          name: 'Network Diagram',
          description: 'Network infrastructure and connections',
          preview: 'Internet → Router → Switch → Devices',
          elements: [
            { id: 1, type: 'cloud', x: 400, y: 50, width: 120, height: 60, text: 'Internet', style: { fill: '#E0E7FF', stroke: '#6366F1', strokeWidth: 2 } },
            { id: 2, type: 'rectangle', x: 380, y: 160, width: 80, height: 50, text: 'Router', style: { fill: '#FEF3C7', stroke: '#F59E0B', strokeWidth: 2 } },
            { id: 3, type: 'rectangle', x: 380, y: 260, width: 80, height: 50, text: 'Switch', style: { fill: '#DBEAFE', stroke: '#3B82F6', strokeWidth: 2 } },
            { id: 4, type: 'rectangle', x: 150, y: 360, width: 80, height: 50, text: 'PC 1', style: { fill: '#D1FAE5', stroke: '#10B981', strokeWidth: 2 } },
            { id: 5, type: 'rectangle', x: 280, y: 360, width: 80, height: 50, text: 'PC 2', style: { fill: '#D1FAE5', stroke: '#10B981', strokeWidth: 2 } },
            { id: 6, type: 'rectangle', x: 480, y: 360, width: 80, height: 50, text: 'Server', style: { fill: '#FEE2E2', stroke: '#EF4444', strokeWidth: 2 } },
            { id: 7, type: 'rectangle', x: 610, y: 360, width: 80, height: 50, text: 'Printer', style: { fill: '#F3E8FF', stroke: '#8B5CF6', strokeWidth: 2 } }
          ],
          connections: [
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
            { from: 3, to: 5 },
            { from: 3, to: 6 },
            { from: 3, to: 7 }
          ]
        }
      ]
    }
  };

  if (!isOpen) return null;

  const handleTemplateSelect = (template) => {
    onSelectTemplate(template);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Choose a Template</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Start with a pre-built template to create complex diagrams quickly
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Category Sidebar */}
          <div className="w-64 border-r border-border bg-gray-50 p-4">
            <div className="space-y-2">
              {Object.entries(templates)?.map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                    selectedCategory === key
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white'
                  }`}
                >
                  <Icon name={category?.icon} size={20} />
                  <span className="font-medium">{category?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Template Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {templates?.[selectedCategory]?.items?.map((template) => (
                <div
                  key={template?.id}
                  className="border border-border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {template?.name}
                    </h3>
                    <Icon 
                      name="ChevronRight" 
                      size={16} 
                      className="text-muted-foreground group-hover:text-primary transition-colors" 
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {template?.description}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground font-mono">
                      {template?.preview}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {template?.elements?.length} elements
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleTemplateSelect(template);
                      }}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            💡 Tip: You can customize any template after selecting it
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="ghost"
              iconName="Plus"
              iconPosition="left"
              onClick={onClose}
            >
              Start Blank
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePickerModal;