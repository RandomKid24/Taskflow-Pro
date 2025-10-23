import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DrawingCanvas = ({ 
  selectedTool, 
  selectedShape, 
  onElementSelect, 
  selectedElement, 
  onElementUpdate,
  zoomLevel,
  onZoomChange,
  canvasElements,
  onElementsChange
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [draggedElement, setDraggedElement] = useState(null);
  const [connectionStart, setConnectionStart] = useState(null);
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize] = useState(20);

  // Enhanced mouse event handlers
  const handleMouseDown = (e) => {
    const rect = canvasRef?.current?.getBoundingClientRect();
    const x = (e?.clientX - rect?.left - panOffset?.x) / zoomLevel;
    const y = (e?.clientY - rect?.top - panOffset?.y) / zoomLevel;

    // Snap to grid if enabled
    const snappedX = snapToGrid ? Math.round(x / gridSize) * gridSize : x;
    const snappedY = snapToGrid ? Math.round(y / gridSize) * gridSize : y;

    if (selectedTool === 'pan') {
      setIsPanning(true);
      setDragStart({ x: e?.clientX - panOffset?.x, y: e?.clientY - panOffset?.y });
      return;
    }

    if (selectedTool === 'select') {
      // Check if clicking on existing element
      const clickedElement = canvasElements?.find(el => 
        snappedX >= el?.x && snappedX <= el?.x + el?.width && 
        snappedY >= el?.y && snappedY <= el?.y + el?.height
      );
      
      if (clickedElement) {
        // Check if clicking on resize handle (8px from edges)
        const handleSize = 8;
        const isNearRightEdge = Math.abs(snappedX - (clickedElement.x + clickedElement.width)) < handleSize;
        const isNearBottomEdge = Math.abs(snappedY - (clickedElement.y + clickedElement.height)) < handleSize;
        const isNearLeftEdge = Math.abs(snappedX - clickedElement.x) < handleSize;
        const isNearTopEdge = Math.abs(snappedY - clickedElement.y) < handleSize;
        
        if (isNearRightEdge || isNearBottomEdge || isNearLeftEdge || isNearTopEdge) {
          // Start resizing
          onElementSelect(clickedElement);
          setIsResizing(true);
          setDraggedElement(clickedElement);
          setResizeHandle({
            right: isNearRightEdge,
            bottom: isNearBottomEdge,
            left: isNearLeftEdge,
            top: isNearTopEdge
          });
          setDragStart({ x: snappedX, y: snappedY });
        } else {
          // Start dragging
          onElementSelect(clickedElement);
          setIsDragging(true);
          setDraggedElement(clickedElement);
          setDragStart({ x: snappedX - clickedElement?.x, y: snappedY - clickedElement?.y });
        }
      } else {
        onElementSelect(null);
      }
      return;
    }

    if (selectedTool === 'connector') {
      const clickedElement = canvasElements?.find(el => 
        snappedX >= el?.x && snappedX <= el?.x + el?.width && 
        snappedY >= el?.y && snappedY <= el?.y + el?.height
      );
      
      if (clickedElement) {
        if (!connectionStart) {
          setConnectionStart(clickedElement);
        } else {
          // Create connection between elements
          const newConnection = {
            id: Date.now(),
            type: 'connection',
            from: connectionStart?.id,
            to: clickedElement?.id,
            fromX: connectionStart?.x + connectionStart?.width / 2,
            fromY: connectionStart?.y + connectionStart?.height / 2,
            toX: clickedElement?.x + clickedElement?.width / 2,
            toY: clickedElement?.y + clickedElement?.height / 2,
            style: {
              stroke: '#374151',
              strokeWidth: 2,
              markerEnd: 'url(#arrowhead)'
            }
          };
          onElementsChange([...canvasElements, newConnection]);
          setConnectionStart(null);
        }
      }
      return;
    }

    if (selectedTool === 'eraser') {
      const clickedElement = canvasElements?.find(el => 
        snappedX >= el?.x && snappedX <= el?.x + el?.width && 
        snappedY >= el?.y && snappedY <= el?.y + el?.height
      );
      
      if (clickedElement) {
        const updatedElements = canvasElements?.filter(el => el?.id !== clickedElement?.id);
        // Also remove any connections to this element
        const cleanedElements = updatedElements?.filter(el => 
          el?.type !== 'connection' || (el?.from !== clickedElement?.id && el?.to !== clickedElement?.id)
        );
        onElementsChange(cleanedElements);
        onElementSelect(null);
      }
      return;
    }

    if (selectedTool === 'shape' && selectedShape) {
      const newElement = {
        id: Date.now(),
        type: selectedShape?.type,
        x: snappedX,
        y: snappedY,
        width: selectedShape?.defaultWidth || 100,
        height: selectedShape?.defaultHeight || 60,
        text: selectedShape?.text || '',
        style: {
          fill: getShapeColor(selectedShape?.category || 'default'),
          stroke: getShapeStrokeColor(selectedShape?.category || 'default'),
          strokeWidth: 2
        }
      };
      onElementsChange([...canvasElements, newElement]);
      onElementSelect(newElement);
    }

    if (selectedTool === 'text') {
      const newTextElement = {
        id: Date.now(),
        type: 'text',
        x: snappedX,
        y: snappedY,
        width: 120,
        height: 30,
        text: 'Double-click to edit',
        style: {
          fontSize: 14,
          fontFamily: 'Arial, sans-serif',
          fill: '#374151',
          textAlign: 'center'
        }
      };
      onElementsChange([...canvasElements, newTextElement]);
      onElementSelect(newTextElement);
    }

    setIsDrawing(true);
    setDragStart({ x: snappedX, y: snappedY });
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef?.current?.getBoundingClientRect();
    const x = (e?.clientX - rect?.left - panOffset?.x) / zoomLevel;
    const y = (e?.clientY - rect?.top - panOffset?.y) / zoomLevel;

    if (isPanning && dragStart) {
      setPanOffset({
        x: e?.clientX - dragStart?.x,
        y: e?.clientY - dragStart?.y
      });
    }

    if (isResizing && draggedElement && resizeHandle && dragStart) {
      const snappedX = snapToGrid ? Math.round(x / gridSize) * gridSize : x;
      const snappedY = snapToGrid ? Math.round(y / gridSize) * gridSize : y;
      
      let newWidth = draggedElement.width;
      let newHeight = draggedElement.height;
      let newX = draggedElement.x;
      let newY = draggedElement.y;
      
      // Handle resizing from different corners/edges
      if (resizeHandle.right) {
        newWidth = Math.max(20, snappedX - draggedElement.x);
      }
      if (resizeHandle.bottom) {
        newHeight = Math.max(20, snappedY - draggedElement.y);
      }
      if (resizeHandle.left) {
        const deltaX = snappedX - dragStart.x;
        newWidth = Math.max(20, draggedElement.width - deltaX);
        newX = draggedElement.x + deltaX;
      }
      if (resizeHandle.top) {
        const deltaY = snappedY - dragStart.y;
        newHeight = Math.max(20, draggedElement.height - deltaY);
        newY = draggedElement.y + deltaY;
      }
      
      const updatedElement = {
        ...draggedElement,
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight
      };
      
      onElementUpdate(updatedElement);
      setDragStart({ x: snappedX, y: snappedY });
    }

    if (isDragging && draggedElement && dragStart) {
      const snappedX = snapToGrid ? Math.round((x - dragStart?.x) / gridSize) * gridSize : x - dragStart?.x;
      const snappedY = snapToGrid ? Math.round((y - dragStart?.y) / gridSize) * gridSize : y - dragStart?.y;
      
      const updatedElement = {
        ...draggedElement,
        x: Math.max(0, snappedX),
        y: Math.max(0, snappedY)
      };
      
      const updatedElements = canvasElements?.map(el => 
        el?.id === draggedElement?.id ? updatedElement : el
      );
      
      // Update connections that involve this element
      const finalElements = updatedElements?.map(el => {
        if (el?.type === 'connection') {
          if (el?.from === draggedElement?.id) {
            return {
              ...el,
              fromX: updatedElement?.x + updatedElement?.width / 2,
              fromY: updatedElement?.y + updatedElement?.height / 2
            };
          }
          if (el?.to === draggedElement?.id) {
            return {
              ...el,
              toX: updatedElement?.x + updatedElement?.width / 2,
              toY: updatedElement?.y + updatedElement?.height / 2
            };
          }
        }
        return el;
      });
      
      onElementsChange(finalElements);
      setDraggedElement(updatedElement);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setIsPanning(false);
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
    setDraggedElement(null);
    setDragStart(null);
  };

  // Enhanced zoom controls
  const handleZoomIn = () => {
    onZoomChange(Math.min(zoomLevel * 1.2, 5));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(zoomLevel / 1.2, 0.1));
  };

  const resetZoom = () => {
    onZoomChange(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const fitToScreen = () => {
    if (canvasElements?.length === 0) return;
    
    const bounds = canvasElements?.reduce((acc, el) => {
      return {
        minX: Math.min(acc?.minX, el?.x),
        minY: Math.min(acc?.minY, el?.y),
        maxX: Math.max(acc?.maxX, el?.x + el?.width),
        maxY: Math.max(acc?.maxY, el?.y + el?.height)
      };
    }, { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
    
    const rect = canvasRef?.current?.getBoundingClientRect();
    const padding = 50;
    const contentWidth = bounds?.maxX - bounds?.minX;
    const contentHeight = bounds?.maxY - bounds?.minY;
    const scaleX = (rect?.width - padding * 2) / contentWidth;
    const scaleY = (rect?.height - padding * 2) / contentHeight;
    const newZoom = Math.min(scaleX, scaleY, 2);
    
    onZoomChange(newZoom);
    setPanOffset({
      x: (rect?.width - contentWidth * newZoom) / 2 - bounds?.minX * newZoom,
      y: (rect?.height - contentHeight * newZoom) / 2 - bounds?.minY * newZoom
    });
  };

  // Color scheme for different shape categories
  const getShapeColor = (category) => {
    const colors = {
      process: '#3B82F6',
      decision: '#F59E0B',
      terminal: '#10B981',
      data: '#8B5CF6',
      event: '#EF4444',
      gateway: '#6366F1',
      task: '#3B82F6',
      phase: '#8B5CF6',
      person: '#10B981',
      infrastructure: '#64748B',
      service: '#3B82F6',
      default: '#6B7280'
    };
    return colors?.[category] || colors?.default;
  };

  const getShapeStrokeColor = (category) => {
    const colors = {
      process: '#1E40AF',
      decision: '#D97706',
      terminal: '#059669',
      data: '#7C3AED',
      event: '#DC2626',
      gateway: '#4F46E5',
      task: '#1E40AF',
      phase: '#7C3AED',
      person: '#059669',
      infrastructure: '#475569',
      service: '#1E40AF',
      default: '#4B5563'
    };
    return colors?.[category] || colors?.default;
  };

  // Render different shape types
  const renderShape = (element) => {
    const isSelected = selectedElement?.id === element?.id;
    const strokeClass = isSelected ? 'stroke-primary' : '';
    const strokeWidth = isSelected ? 3 : element?.style?.strokeWidth || 2;

    switch (element?.type) {
      case 'rectangle': case'process':
        return (
          <rect
            x={element?.x}
            y={element?.y}
            width={element?.width}
            height={element?.height}
            fill={element?.style?.fill}
            stroke={element?.style?.stroke}
            strokeWidth={strokeWidth}
            className={strokeClass}
            rx={element?.type === 'process' ? 5 : 0}
          />
        );
      
      case 'rounded-rectangle':
        return (
          <rect
            x={element?.x}
            y={element?.y}
            width={element?.width}
            height={element?.height}
            fill={element?.style?.fill}
            stroke={element?.style?.stroke}
            strokeWidth={strokeWidth}
            className={strokeClass}
            rx={15}
            ry={15}
          />
        );
      
      case 'circle': case'event-start': case'event-end':
        return (
          <ellipse
            cx={element?.x + element?.width / 2}
            cy={element?.y + element?.height / 2}
            rx={element?.width / 2}
            ry={element?.height / 2}
            fill={element?.style?.fill}
            stroke={element?.style?.stroke}
            strokeWidth={strokeWidth}
            className={strokeClass}
          />
        );
      
      case 'diamond': case'gateway-exclusive': case'gateway-parallel': case'gateway-inclusive':
        return (
          <polygon
            points={`${element?.x + element?.width/2},${element?.y} ${element?.x + element?.width},${element?.y + element?.height/2} ${element?.x + element?.width/2},${element?.y + element?.height} ${element?.x},${element?.y + element?.height/2}`}
            fill={element?.style?.fill}
            stroke={element?.style?.stroke}
            strokeWidth={strokeWidth}
            className={strokeClass}
          />
        );
      
      case 'hexagon':
        const hexOffset = element?.width * 0.2;
        return (
          <polygon
            points={`${element?.x + hexOffset},${element?.y} ${element?.x + element?.width - hexOffset},${element?.y} ${element?.x + element?.width},${element?.y + element?.height/2} ${element?.x + element?.width - hexOffset},${element?.y + element?.height} ${element?.x + hexOffset},${element?.y + element?.height} ${element?.x},${element?.y + element?.height/2}`}
            fill={element?.style?.fill}
            stroke={element?.style?.stroke}
            strokeWidth={strokeWidth}
            className={strokeClass}
          />
        );
      
      case 'cylinder':
        const ellipseHeight = element?.height * 0.15;
        return (
          <g>
            <ellipse
              cx={element?.x + element?.width / 2}
              cy={element?.y + ellipseHeight}
              rx={element?.width / 2}
              ry={ellipseHeight}
              fill={element?.style?.fill}
              stroke={element?.style?.stroke}
              strokeWidth={strokeWidth}
              className={strokeClass}
            />
            <rect
              x={element?.x}
              y={element?.y + ellipseHeight}
              width={element?.width}
              height={element?.height - ellipseHeight * 2}
              fill={element?.style?.fill}
              stroke={element?.style?.stroke}
              strokeWidth={strokeWidth}
              className={strokeClass}
            />
            <ellipse
              cx={element?.x + element?.width / 2}
              cy={element?.y + element?.height - ellipseHeight}
              rx={element?.width / 2}
              ry={ellipseHeight}
              fill={element?.style?.fill}
              stroke={element?.style?.stroke}
              strokeWidth={strokeWidth}
              className={strokeClass}
            />
          </g>
        );
      
      case 'cloud':
        return (
          <path
            d={`M ${element?.x + element?.width * 0.2} ${element?.y + element?.height * 0.5} 
               Q ${element?.x} ${element?.y + element?.height * 0.3} ${element?.x + element?.width * 0.15} ${element?.y + element?.height * 0.2}
               Q ${element?.x + element?.width * 0.4} ${element?.y} ${element?.x + element?.width * 0.6} ${element?.y + element?.height * 0.2}
               Q ${element?.x + element?.width} ${element?.y + element?.height * 0.1} ${element?.x + element?.width * 0.85} ${element?.y + element?.height * 0.4}
               Q ${element?.x + element?.width} ${element?.y + element?.height * 0.7} ${element?.x + element?.width * 0.7} ${element?.y + element?.height * 0.8}
               Q ${element?.x + element?.width * 0.3} ${element?.y + element?.height} ${element?.x + element?.width * 0.2} ${element?.y + element?.height * 0.5} Z`}
            fill={element?.style?.fill}
            stroke={element?.style?.stroke}
            strokeWidth={strokeWidth}
            className={strokeClass}
          />
        );
      
      default:
        return (
          <rect
            x={element?.x}
            y={element?.y}
            width={element?.width}
            height={element?.height}
            fill={element?.style?.fill}
            stroke={element?.style?.stroke}
            strokeWidth={strokeWidth}
            className={strokeClass}
          />
        );
    }
  };

  return (
    <div className="relative flex-1 bg-gray-50 overflow-hidden">
      {/* Enhanced Canvas Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        {/* Zoom Controls */}
        <div className="bg-white rounded-lg shadow-elevation-2 p-2 flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            iconName="Minus"
            title="Zoom Out"
          />
          <span className="text-sm font-medium px-2 min-w-16 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            iconName="Plus"
            title="Zoom In"
          />
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={resetZoom}
            iconName="RotateCcw"
            title="Reset Zoom"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={fitToScreen}
            iconName="Maximize2"
            title="Fit to Screen"
          />
        </div>

        {/* View Controls */}
        <div className="bg-white rounded-lg shadow-elevation-2 p-2 flex items-center space-x-1">
          <Button
            variant={showGrid ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setShowGrid(!showGrid)}
            iconName="Grid3X3"
            title="Toggle Grid"
          />
          <Button
            variant={snapToGrid ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSnapToGrid(!snapToGrid)}
            iconName="Magnet"
            title="Snap to Grid"
          />
        </div>
      </div>

      {/* Connection Mode Indicator */}
      {selectedTool === 'connector' && connectionStart && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <Icon name="Link" size={16} />
            <span className="text-sm font-medium">
              Click on another element to connect
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConnectionStart(null)}
              iconName="X"
              className="text-primary-foreground hover:bg-primary-foreground/20"
            />
          </div>
        </div>
      )}

      {/* Canvas */}
      <div 
        ref={canvasRef}
        className={`w-full h-full ${selectedTool === 'pan' ? 'cursor-grab' : selectedTool === 'eraser' ? 'cursor-crosshair' : 'cursor-crosshair'} ${isPanning ? 'cursor-grabbing' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `scale(${zoomLevel}) translate(${panOffset?.x / zoomLevel}px, ${panOffset?.y / zoomLevel}px)`,
          transformOrigin: '0 0'
        }}
      >
        <svg className="w-full h-full">
          {/* Enhanced Grid Pattern */}
          <defs>
            <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
              <path 
                d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} 
                fill="none" 
                stroke={showGrid ? "#E5E7EB" : "transparent"} 
                strokeWidth="0.5"
                opacity={showGrid ? 1 : 0}
              />
            </pattern>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Canvas Elements */}
          {canvasElements?.map((element) => (
            <g key={element?.id}>
              {element?.type === 'connection' ? (
                <line
                  x1={element?.fromX}
                  y1={element?.fromY}
                  x2={element?.toX}
                  y2={element?.toY}
                  stroke={element?.style?.stroke}
                  strokeWidth={element?.style?.strokeWidth}
                  markerEnd={element?.style?.markerEnd}
                />
              ) : (
                <>
                  {renderShape(element)}
                  {element?.text && (
                    <text
                      x={element?.x + element?.width / 2}
                      y={element?.y + element?.height / 2}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="text-sm font-medium fill-white pointer-events-none select-none"
                      style={{ fontSize: element?.style?.fontSize || 14 }}
                    >
                      {element?.text?.split('\n')?.map((line, index) => (
                        <tspan key={index} x={element?.x + element?.width / 2} dy={index === 0 ? 0 : '1.2em'}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                  )}
                </>
              )}
            </g>
          ))}

          {/* Connection Preview */}
          {selectedTool === 'connector' && connectionStart && (
            <circle
              cx={connectionStart?.x + connectionStart?.width / 2}
              cy={connectionStart?.y + connectionStart?.height / 2}
              r="5"
              fill="#3B82F6"
              stroke="#1E40AF"
              strokeWidth="2"
              className="animate-pulse"
            />
          )}
        </svg>
      </div>

      {/* Enhanced Canvas Info */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-elevation-2 px-4 py-2">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Layers" size={14} />
            <span>Elements: {canvasElements?.length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Tool" size={14} />
            <span>Tool: {selectedTool?.charAt(0)?.toUpperCase() + selectedTool?.slice(1)}</span>
          </div>
          {selectedElement && (
            <div className="flex items-center space-x-1">
              <Icon name="MousePointer" size={14} />
              <span>Selected: {selectedElement?.type}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Icon name="Grid3X3" size={14} />
            <span>Grid: {showGrid ? 'On' : 'Off'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;