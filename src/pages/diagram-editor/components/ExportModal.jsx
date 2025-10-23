import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [exportFormat, setExportFormat] = useState('png');
  const [exportQuality, setExportQuality] = useState('high');
  const [includeBackground, setIncludeBackground] = useState(true);
  const [exportSize, setExportSize] = useState('current');

  const formatOptions = [
    { value: 'png', label: 'PNG Image' },
    { value: 'jpg', label: 'JPEG Image' },
    { value: 'svg', label: 'SVG Vector' },
    { value: 'pdf', label: 'PDF Document' }
  ];

  const qualityOptions = [
    { value: 'low', label: 'Low (72 DPI)' },
    { value: 'medium', label: 'Medium (150 DPI)' },
    { value: 'high', label: 'High (300 DPI)' },
    { value: 'ultra', label: 'Ultra (600 DPI)' }
  ];

  const sizeOptions = [
    { value: 'current', label: 'Current View' },
    { value: 'fit', label: 'Fit to Content' },
    { value: 'custom', label: 'Custom Size' }
  ];

  const handleExport = () => {
    const exportSettings = {
      format: exportFormat,
      quality: exportQuality,
      includeBackground,
      size: exportSize
    };
    onExport(exportSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-elevation-3 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Export Diagram</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <Select
            label="Export Format"
            description="Choose the file format for your diagram"
            options={formatOptions}
            value={exportFormat}
            onChange={setExportFormat}
          />

          {/* Quality Settings */}
          {(exportFormat === 'png' || exportFormat === 'jpg' || exportFormat === 'pdf') && (
            <Select
              label="Quality"
              description="Higher quality results in larger file sizes"
              options={qualityOptions}
              value={exportQuality}
              onChange={setExportQuality}
            />
          )}

          {/* Size Settings */}
          <Select
            label="Export Size"
            description="Define the dimensions of the exported diagram"
            options={sizeOptions}
            value={exportSize}
            onChange={setExportSize}
          />

          {/* Background Option */}
          <Checkbox
            label="Include Background"
            description="Export with the canvas background and grid"
            checked={includeBackground}
            onChange={(e) => setIncludeBackground(e?.target?.checked)}
          />

          {/* Preview Info */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Export Preview</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Format: {formatOptions?.find(f => f?.value === exportFormat)?.label}</p>
                  {(exportFormat === 'png' || exportFormat === 'jpg' || exportFormat === 'pdf') && (
                    <p>Quality: {qualityOptions?.find(q => q?.value === exportQuality)?.label}</p>
                  )}
                  <p>Size: {sizeOptions?.find(s => s?.value === exportSize)?.label}</p>
                  <p>Background: {includeBackground ? 'Included' : 'Transparent'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
          >
            Export Diagram
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;