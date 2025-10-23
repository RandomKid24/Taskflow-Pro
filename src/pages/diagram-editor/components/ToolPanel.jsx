import React from 'react';
import Button from '../../../components/ui/Button';

const ToolPanel = ({ selectedTool, onToolChange, onUndo, onRedo, canUndo, canRedo }) => {
  const tools = [
    { id: 'select', name: 'Select', icon: 'MousePointer', shortcut: 'V', description: 'Select and move elements' },
    { id: 'pan', name: 'Pan', icon: 'Hand', shortcut: 'H', description: 'Pan around the canvas' },
    { id: 'shape', name: 'Shape', icon: 'Square', shortcut: 'S', description: 'Add shapes from library' },
    { id: 'connector', name: 'Connector', icon: 'ArrowRight', shortcut: 'C', description: 'Connect elements with lines' },
    { id: 'text', name: 'Text', icon: 'Type', shortcut: 'T', description: 'Add text labels' },
    { id: 'pen', name: 'Pen', icon: 'Pen', shortcut: 'P', description: 'Free-form drawing' },
    { id: 'eraser', name: 'Eraser', icon: 'Eraser', shortcut: 'E', description: 'Remove elements' }
  ];

  const advancedTools = [
    { id: 'align', name: 'Align', icon: 'AlignCenter', description: 'Align selected elements' },
    { id: 'distribute', name: 'Distribute', icon: 'MoreHorizontal', description: 'Distribute elements evenly' },
    { id: 'group', name: 'Group', icon: 'Layers', description: 'Group/ungroup elements' }
  ];

  return (
    <div className="bg-white border-r border-border w-16 flex flex-col items-center py-4 space-y-1">
      {/* Undo/Redo */}
      <div className="flex flex-col space-y-1 pb-2 border-b border-border mb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          iconName="Undo"
          className="w-10 h-10"
          title="Undo (Ctrl+Z)"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          iconName="Redo"
          className="w-10 h-10"
          title="Redo (Ctrl+Shift+Z)"
        />
      </div>

      {/* Main Tools */}
      <div className="flex flex-col space-y-1">
        {tools?.map((tool) => (
          <Button
            key={tool?.id}
            variant={selectedTool === tool?.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onToolChange(tool?.id)}
            iconName={tool?.icon}
            className="w-10 h-10"
            title={`${tool?.name} (${tool?.shortcut}) - ${tool?.description}`}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-border my-2" />

      {/* Advanced Tools */}
      <div className="flex flex-col space-y-1">
        {advancedTools?.map((tool) => (
          <Button
            key={tool?.id}
            variant="ghost"
            size="sm"
            onClick={() => onToolChange(tool?.id)}
            iconName={tool?.icon}
            className="w-10 h-10"
            title={`${tool?.name} - ${tool?.description}`}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-border my-2" />

      {/* Quick Actions */}
      <div className="flex flex-col space-y-1">
        <Button
          variant="ghost"
          size="sm"
          iconName="Download"
          className="w-10 h-10"
          title="Export Diagram (Ctrl+E)"
        />
        <Button
          variant="ghost"
          size="sm"
          iconName="Share"
          className="w-10 h-10"
          title="Share Diagram"
        />
        <Button
          variant="ghost"
          size="sm"
          iconName="Settings"
          className="w-10 h-10"
          title="Canvas Settings"
        />
        <Button
          variant="ghost"
          size="sm"
          iconName="HelpCircle"
          className="w-10 h-10"
          title="Help & Shortcuts"
        />
      </div>

      {/* Tool Info */}
      <div className="flex-1" />
      <div className="text-xs text-muted-foreground text-center px-1">
        <div className="writing-mode-vertical text-orientation-mixed">
          {selectedTool?.charAt(0)?.toUpperCase() + selectedTool?.slice(1)}
        </div>
      </div>
    </div>
  );
};

export default ToolPanel;