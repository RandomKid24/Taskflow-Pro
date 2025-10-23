import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import QuickActionMenu from '../../components/ui/QuickActionMenu';
import CollaborationIndicator from '../../components/ui/CollaborationIndicator';
import DrawingCanvas from './components/DrawingCanvas';
import ToolPanel from './components/ToolPanel';
import ShapeLibrary from './components/ShapeLibrary';
import PropertiesPanel from './components/PropertiesPanel';
import CollaborationPanel from './components/CollaborationPage';
import ExportModal from './components/ExportModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TemplatePickerModal from './components/TemplatePickerModal';

const DiagramEditor = () => {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState('select');
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [canvasElements, setCanvasElements] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isShapeLibraryCollapsed, setIsShapeLibraryCollapsed] = useState(false);
  const [isPropertiesPanelCollapsed, setIsPropertiesPanelCollapsed] = useState(false);
  const [isCollaborationPanelVisible, setIsCollaborationPanelVisible] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTemplatePickerOpen, setIsTemplatePickerOpen] = useState(false);
  const [diagramName, setDiagramName] = useState('Untitled Diagram');
  const [isEditingName, setIsEditingName] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [diagramType, setDiagramType] = useState('custom');

  // Initialize with sample elements or show template picker for new users
  useEffect(() => {
    const hasUsedEditor = localStorage.getItem('hasUsedDiagramEditor');
    if (!hasUsedEditor) {
      setIsTemplatePickerOpen(true);
      localStorage.setItem('hasUsedDiagramEditor', 'true');
    } else {
      // Default sample elements for returning users
      const sampleElements = [
        {
          id: 1,
          type: 'rounded-rectangle',
          x: 100,
          y: 100,
          width: 120,
          height: 60,
          text: 'Start Process',
          style: {
            fill: '#10B981',
            stroke: '#059669',
            strokeWidth: 2
          }
        },
        {
          id: 2,
          type: 'diamond',
          x: 300,
          y: 80,
          width: 120,
          height: 100,
          text: 'Decision?',
          style: {
            fill: '#F59E0B',
            stroke: '#D97706',
            strokeWidth: 2
          }
        },
        {
          id: 3,
          type: 'rounded-rectangle',
          x: 500,
          y: 100,
          width: 120,
          height: 60,
          text: 'Complete',
          style: {
            fill: '#10B981',
            stroke: '#059669',
            strokeWidth: 2
          }
        }
      ];
      setCanvasElements(sampleElements);
      setHistory([sampleElements]);
      setHistoryIndex(0);
    }
  }, []);

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip if user is typing in an input field
      if (e?.target?.tagName === 'INPUT' || e?.target?.tagName === 'TEXTAREA') {
        return;
      }

      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case 'z':
            e?.preventDefault();
            if (e?.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case 's':
            e?.preventDefault();
            handleSave();
            break;
          case 'e':
            e?.preventDefault();
            setIsExportModalOpen(true);
            break;
          case 'n':
            e?.preventDefault();
            setIsTemplatePickerOpen(true);
            break;
          case 'a':
            e?.preventDefault();
            // Select all elements
            break;
          case 'd':
            e?.preventDefault();
            // Duplicate selected element
            if (selectedElement) {
              handleDuplicateElement();
            }
            break;
          default:
            break;
        }
      }

      // Delete key
      if (e?.key === 'Delete' && selectedElement) {
        handleDeleteElement();
      }

      // Escape key
      if (e?.key === 'Escape') {
        setSelectedElement(null);
        setSelectedTool('select');
      }

      // Tool shortcuts (only if not in an input field)
      switch (e?.key?.toLowerCase()) {
        case 'v': setSelectedTool('select'); break;
        case 'h': setSelectedTool('pan'); break;
        case 's': 
          if (!e?.ctrlKey && !e?.metaKey) {
            setSelectedTool('shape');
          }
          break;
        case 'c': setSelectedTool('connector'); break;
        case 't': setSelectedTool('text'); break;
        case 'p': setSelectedTool('pen'); break;
        case 'e': 
          if (!e?.ctrlKey && !e?.metaKey) {
            setSelectedTool('eraser');
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history, selectedElement]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case 'z':
            e?.preventDefault();
            if (e?.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case 's':
            e?.preventDefault();
            handleSave();
            break;
          case 'e':
            e?.preventDefault();
            setIsExportModalOpen(true);
            break;
          default:
            break;
        }
      }

      // Tool shortcuts
      switch (e?.key) {
        case 'v': case'V': setSelectedTool('select');
          break;
        case 'h': case'H': setSelectedTool('pan');
          break;
        case 's': case'S':
          if (!e?.ctrlKey && !e?.metaKey) {
            setSelectedTool('shape');
          }
          break;
        case 'c': case'C': setSelectedTool('connector');
          break;
        case 't': case'T': setSelectedTool('text');
          break;
        case 'p': case'P': setSelectedTool('pen');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
    if (tool !== 'shape') {
      setSelectedShape(null);
    }
  };

  const handleShapeSelect = (shape) => {
    setSelectedShape(shape);
    setSelectedTool('shape');
  };

  const handleElementSelect = (element) => {
    setSelectedElement(element);
  };

  const handleElementUpdate = (elementId, updatedElement) => {
    const newElements = canvasElements?.map(el => 
      el?.id === elementId ? updatedElement : el
    );
    setCanvasElements(newElements);
    addToHistory(newElements);
  };

  const handleElementsChange = (newElements) => {
    setCanvasElements(newElements);
    addToHistory(newElements);
  };

  const addToHistory = (elements) => {
    const newHistory = history?.slice(0, historyIndex + 1);
    newHistory?.push([...elements]);
    setHistory(newHistory);
    setHistoryIndex(newHistory?.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCanvasElements([...history?.[newIndex]]);
      setSelectedElement(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history?.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCanvasElements([...history?.[newIndex]]);
      setSelectedElement(null);
    }
  };

  const handleSave = () => {
    // Simulate save operation
    console.log('Diagram saved:', { name: diagramName, elements: canvasElements });
  };

  const handleExport = (exportSettings) => {
    // Simulate export operation
    console.log('Exporting diagram:', exportSettings);
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    setIsEditingName(false);
    handleSave();
  };

  const handleTemplateSelect = (template) => {
    setCanvasElements(template?.elements || []);
    setDiagramName(template?.name || 'Untitled Diagram');
    setDiagramType(template?.id || 'custom');
    addToHistory(template?.elements || []);
    setIsTemplatePickerOpen(false);
  };

  const handleNewDiagram = () => {
    setIsTemplatePickerOpen(true);
  };

  const handleDeleteElement = () => {
    if (selectedElement) {
      const updatedElements = canvasElements?.filter(el => el?.id !== selectedElement?.id);
      // Also remove any connections to this element
      const cleanedElements = updatedElements?.filter(el => 
        el?.type !== 'connection' || (el?.from !== selectedElement?.id && el?.to !== selectedElement?.id)
      );
      setCanvasElements(cleanedElements);
      addToHistory(cleanedElements);
      setSelectedElement(null);
    }
  };

  const handleDuplicateElement = () => {
    if (selectedElement && selectedElement?.type !== 'connection') {
      const newElement = {
        ...selectedElement,
        id: Date.now(),
        x: selectedElement?.x + 20,
        y: selectedElement?.y + 20
      };
      const newElements = [...canvasElements, newElement];
      setCanvasElements(newElements);
      addToHistory(newElements);
      setSelectedElement(newElement);
    }
  };

  const breadcrumbs = [
    { label: 'Dashboard', path: '/dashboard', icon: 'Home' },
    { label: 'Diagram Editor', path: '/diagram-editor', icon: 'GitBranch' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16 h-screen flex flex-col">
        {/* Enhanced Top Bar */}
        <div className="bg-white border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BreadcrumbTrail customBreadcrumbs={breadcrumbs} />
            
            {/* Diagram Name with Type Badge */}
            <div className="flex items-center space-x-2">
              {isEditingName ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={diagramName}
                    onChange={(e) => setDiagramName(e?.target?.value)}
                    className="w-48"
                    onBlur={handleNameSave}
                    onKeyDown={(e) => e?.key === 'Enter' && handleNameSave()}
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNameSave}
                    iconName="Check"
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <h1 className="text-lg font-semibold text-foreground">{diagramName}</h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNameEdit}
                    iconName="Edit2"
                  />
                  {diagramType !== 'custom' && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
                      {diagramType?.replace('-', ' ')?.toUpperCase()}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Save Status */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Cloud" size={16} />
              <span>All changes saved</span>
            </div>

            {/* Collaboration */}
            <CollaborationIndicator />

            {/* Enhanced Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewDiagram}
                iconName="Plus"
                iconPosition="left"
                title="New Diagram (Ctrl+N)"
              >
                New
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExportModalOpen(true)}
                iconName="Download"
                iconPosition="left"
                title="Export (Ctrl+E)"
              >
                Export
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                iconName="Save"
                iconPosition="left"
                title="Save (Ctrl+S)"
              >
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollaborationPanelVisible(!isCollaborationPanelVisible)}
                iconName="Users"
                title="Collaboration"
              />
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex overflow-hidden">
          {/* Tool Panel */}
          <ToolPanel
            selectedTool={selectedTool}
            onToolChange={handleToolChange}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history?.length - 1}
          />

          {/* Shape Library */}
          <ShapeLibrary
            onShapeSelect={handleShapeSelect}
            selectedShape={selectedShape}
            isCollapsed={isShapeLibraryCollapsed}
            onToggleCollapse={() => setIsShapeLibraryCollapsed(!isShapeLibraryCollapsed)}
            onSelectTemplate={handleTemplateSelect}
          />

          {/* Canvas Area */}
          <DrawingCanvas
            selectedTool={selectedTool}
            selectedShape={selectedShape}
            onElementSelect={handleElementSelect}
            selectedElement={selectedElement}
            onElementUpdate={handleElementUpdate}
            zoomLevel={zoomLevel}
            onZoomChange={setZoomLevel}
            canvasElements={canvasElements}
            onElementsChange={handleElementsChange}
          />

          {/* Properties Panel */}
          <PropertiesPanel
            selectedElement={selectedElement}
            onElementUpdate={handleElementUpdate}
            isCollapsed={isPropertiesPanelCollapsed}
            onToggleCollapse={() => setIsPropertiesPanelCollapsed(!isPropertiesPanelCollapsed)}
          />
        </div>
      </div>

      {/* Template Picker Modal */}
      <TemplatePickerModal
        isOpen={isTemplatePickerOpen}
        onClose={() => setIsTemplatePickerOpen(false)}
        onSelectTemplate={handleTemplateSelect}
      />

      {/* Collaboration Panel */}
      <CollaborationPanel
        isVisible={isCollaborationPanelVisible}
        onToggle={() => setIsCollaborationPanelVisible(!isCollaborationPanelVisible)}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />

      {/* Quick Action Menu */}
      <QuickActionMenu />
    </div>
  );
};

export default DiagramEditor;