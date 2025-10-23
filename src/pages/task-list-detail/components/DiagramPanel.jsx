import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DiagramPanel = ({ isCollapsed, onToggleCollapse }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('select');
  const [isDrawing, setIsDrawing] = useState(false);

  const tools = [
    { id: 'select', name: 'Select', icon: 'MousePointer' },
    { id: 'rectangle', name: 'Rectangle', icon: 'Square' },
    { id: 'circle', name: 'Circle', icon: 'Circle' },
    { id: 'arrow', name: 'Arrow', icon: 'ArrowRight' },
    { id: 'text', name: 'Text', icon: 'Type' },
    { id: 'line', name: 'Line', icon: 'Minus' }
  ];

  const shapes = [
    { id: 'process', name: 'Process', icon: 'Square' },
    { id: 'decision', name: 'Decision', icon: 'Diamond' },
    { id: 'start-end', name: 'Start/End', icon: 'Circle' },
    { id: 'connector', name: 'Connector', icon: 'ArrowRight' }
  ];

  const handleToolSelect = (toolId) => {
    setSelectedTool(toolId);
  };

  const handleCanvasMouseDown = (e) => {
    if (selectedTool !== 'select') {
      setIsDrawing(true);
      // Implement drawing logic here
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (isDrawing) {
      // Implement drawing logic here
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  const handleExportDiagram = () => {
    // Implement export functionality
    console.log('Exporting diagram...');
  };

  const handleOpenFullEditor = () => {
    navigate('/diagram-editor');
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-card border-l border-border flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          iconName="ChevronLeft"
        />
        <div className="mt-4">
          <Icon name="GitBranch" size={20} className="text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Quick Diagram</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenFullEditor}
              iconName="ExternalLink"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              iconName="ChevronRight"
            />
          </div>
        </div>
      </div>
      {/* Tools */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Tools</h4>
        <div className="grid grid-cols-3 gap-2">
          {tools?.map((tool) => (
            <Button
              key={tool?.id}
              variant={selectedTool === tool?.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleToolSelect(tool?.id)}
              iconName={tool?.icon}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <span className="text-xs">{tool?.name}</span>
            </Button>
          ))}
        </div>
      </div>
      {/* Shapes Library */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Shapes</h4>
        <div className="grid grid-cols-2 gap-2">
          {shapes?.map((shape) => (
            <Button
              key={shape?.id}
              variant="outline"
              size="sm"
              onClick={() => handleToolSelect(shape?.id)}
              iconName={shape?.icon}
              className="flex items-center gap-2 justify-start"
            >
              <span className="text-xs">{shape?.name}</span>
            </Button>
          ))}
        </div>
      </div>
      {/* Canvas */}
      <div className="flex-1 p-4">
        <div className="w-full h-64 border-2 border-dashed border-border rounded-lg relative overflow-hidden">
          <canvas
            ref={canvasRef}
            width={280}
            height={240}
            className="absolute inset-0 cursor-crosshair"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
          />
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="GitBranch" size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Start drawing or drag shapes</p>
            </div>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => canvasRef?.current?.getContext('2d')?.clearRect(0, 0, 280, 240)}
            iconName="Trash2"
            className="flex-1"
          >
            Clear
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleExportDiagram}
            iconName="Download"
            className="flex-1"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiagramPanel;