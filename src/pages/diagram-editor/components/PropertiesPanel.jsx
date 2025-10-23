import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PropertiesPanel = ({ selectedElement, onElementUpdate, isCollapsed, onToggleCollapse }) => {
  const [localElement, setLocalElement] = useState(null);
  const [activeTab, setActiveTab] = useState('style');

  useEffect(() => {
    setLocalElement(selectedElement);
  }, [selectedElement]);

  if (isCollapsed) {
    return (
      <div className="bg-white border-l border-border w-12 flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          iconName="ChevronRight"
          className="w-8 h-8"
        />
      </div>
    );
  }

  if (!selectedElement) {
    return (
      <div className="bg-white border-l border-border w-80 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Properties</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            iconName="ChevronLeft"
          />
        </div>
        
        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Icon name="MousePointer" size={24} className="text-gray-400" />
          </div>
          <h4 className="text-sm font-medium text-foreground mb-2">No Element Selected</h4>
          <p className="text-xs text-muted-foreground">
            Select an element on the canvas to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const handlePropertyChange = (property, value) => {
    const updatedElement = {
      ...localElement,
      [property]: value
    };
    setLocalElement(updatedElement);
    onElementUpdate(selectedElement?.id, updatedElement);
  };

  const handleStyleChange = (styleProperty, value) => {
    const updatedElement = {
      ...localElement,
      style: {
        ...localElement?.style,
        [styleProperty]: value
      }
    };
    setLocalElement(updatedElement);
    onElementUpdate(selectedElement?.id, updatedElement);
  };

  const colorPresets = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
    '#6366F1', '#EC4899', '#14B8A6', '#F97316', '#84CC16'
  ];

  const tabs = [
    { id: 'style', name: 'Style', icon: 'Palette' },
    { id: 'layout', name: 'Layout', icon: 'Move' },
    { id: 'text', name: 'Text', icon: 'Type' }
  ];

  return (
    <div className="bg-white border-l border-border w-80 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Properties</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          iconName="ChevronLeft"
        />
      </div>
      {/* Element Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Square" size={16} className="text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground capitalize">
              {selectedElement?.type?.replace('-', ' ')}
            </h4>
            <p className="text-xs text-muted-foreground">ID: {selectedElement?.id}</p>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-xs font-medium transition-smooth ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={12} />
            <span>{tab?.name}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'style' && (
          <div className="space-y-6">
            {/* Fill Color */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Fill Color</label>
              <div className="flex items-center space-x-2 mb-2">
                <Input
                  type="color"
                  value={localElement?.style?.fill || '#3B82F6'}
                  onChange={(e) => handleStyleChange('fill', e?.target?.value)}
                  className="w-12 h-8 p-1 rounded border"
                />
                <Input
                  type="text"
                  value={localElement?.style?.fill || '#3B82F6'}
                  onChange={(e) => handleStyleChange('fill', e?.target?.value)}
                  className="flex-1 text-xs"
                  placeholder="#3B82F6"
                />
              </div>
              <div className="grid grid-cols-5 gap-1">
                {colorPresets?.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleStyleChange('fill', color)}
                    className="w-8 h-8 rounded border-2 border-transparent hover:border-gray-300 transition-colors"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Stroke Color */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Stroke Color</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={localElement?.style?.stroke || '#1E40AF'}
                  onChange={(e) => handleStyleChange('stroke', e?.target?.value)}
                  className="w-12 h-8 p-1 rounded border"
                />
                <Input
                  type="text"
                  value={localElement?.style?.stroke || '#1E40AF'}
                  onChange={(e) => handleStyleChange('stroke', e?.target?.value)}
                  className="flex-1 text-xs"
                  placeholder="#1E40AF"
                />
              </div>
            </div>

            {/* Stroke Width */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Stroke Width</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={localElement?.style?.strokeWidth || 2}
                  onChange={(e) => handleStyleChange('strokeWidth', parseFloat(e?.target?.value))}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8 text-center">
                  {localElement?.style?.strokeWidth || 2}px
                </span>
              </div>
            </div>

            {/* Opacity */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Opacity</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={localElement?.style?.opacity || 1}
                  onChange={(e) => handleStyleChange('opacity', parseFloat(e?.target?.value))}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8 text-center">
                  {Math.round((localElement?.style?.opacity || 1) * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-4">
            {/* Position */}
            <div>
              <h4 className="text-xs font-semibold text-foreground mb-3">Position</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">X</label>
                  <Input
                    type="number"
                    value={Math.round(localElement?.x || 0)}
                    onChange={(e) => handlePropertyChange('x', parseInt(e?.target?.value) || 0)}
                    className="text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Y</label>
                  <Input
                    type="number"
                    value={Math.round(localElement?.y || 0)}
                    onChange={(e) => handlePropertyChange('y', parseInt(e?.target?.value) || 0)}
                    className="text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Size */}
            <div>
              <h4 className="text-xs font-semibold text-foreground mb-3">Size</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Width</label>
                  <Input
                    type="number"
                    value={Math.round(localElement?.width || 0)}
                    onChange={(e) => handlePropertyChange('width', parseInt(e?.target?.value) || 0)}
                    className="text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Height</label>
                  <Input
                    type="number"
                    value={Math.round(localElement?.height || 0)}
                    onChange={(e) => handlePropertyChange('height', parseInt(e?.target?.value) || 0)}
                    className="text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Rotation */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Rotation</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="15"
                  value={localElement?.rotation || 0}
                  onChange={(e) => handlePropertyChange('rotation', parseInt(e?.target?.value))}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-12 text-center">
                  {localElement?.rotation || 0}°
                </span>
              </div>
            </div>

            {/* Alignment Buttons */}
            <div>
              <h4 className="text-xs font-semibold text-foreground mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Copy"
                  iconPosition="left"
                  className="text-xs"
                >
                  Duplicate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'text' && (
          <div className="space-y-4">
            {/* Text Content */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Text Content</label>
              <textarea
                value={localElement?.text || ''}
                onChange={(e) => handlePropertyChange('text', e?.target?.value)}
                className="w-full p-2 text-xs border border-border rounded-lg resize-none"
                rows="3"
                placeholder="Enter text content..."
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Font Size</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="8"
                  max="48"
                  step="1"
                  value={localElement?.style?.fontSize || 14}
                  onChange={(e) => handleStyleChange('fontSize', parseInt(e?.target?.value))}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8 text-center">
                  {localElement?.style?.fontSize || 14}px
                </span>
              </div>
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Font Family</label>
              <select
                value={localElement?.style?.fontFamily || 'Arial, sans-serif'}
                onChange={(e) => handleStyleChange('fontFamily', e?.target?.value)}
                className="w-full p-2 text-xs border border-border rounded-lg"
              >
                <option value="Arial, sans-serif">Arial</option>
                <option value="Helvetica, sans-serif">Helvetica</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="Verdana, sans-serif">Verdana</option>
              </select>
            </div>

            {/* Text Alignment */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Text Alignment</label>
              <div className="flex space-x-1">
                {['left', 'center', 'right']?.map((align) => (
                  <Button
                    key={align}
                    variant={localElement?.style?.textAlign === align ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStyleChange('textAlign', align)}
                    iconName={align === 'left' ? 'AlignLeft' : align === 'center' ? 'AlignCenter' : 'AlignRight'}
                    className="flex-1"
                  />
                ))}
              </div>
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Text Color</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={localElement?.style?.fill || '#374151'}
                  onChange={(e) => handleStyleChange('fill', e?.target?.value)}
                  className="w-12 h-8 p-1 rounded border"
                />
                <Input
                  type="text"
                  value={localElement?.style?.fill || '#374151'}
                  onChange={(e) => handleStyleChange('fill', e?.target?.value)}
                  className="flex-1 text-xs"
                  placeholder="#374151"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="text-xs text-muted-foreground text-center">
          Use Ctrl+Z/Y for undo/redo<br />
          Press Delete to remove element
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;