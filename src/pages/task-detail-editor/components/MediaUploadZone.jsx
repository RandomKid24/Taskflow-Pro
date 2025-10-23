import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MediaUploadZone = ({ attachments, onAttachmentsUpdate }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    files?.forEach((file) => {
      if (file?.size > 50 * 1024 * 1024) { // 50MB limit
        alert(`File ${file?.name} is too large. Maximum size is 50MB.`);
        return;
      }

      const fileId = Date.now() + Math.random();
      
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev?.[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            // Add to attachments when upload complete
            const newAttachment = {
              id: fileId,
              name: file?.name,
              size: file?.size,
              type: file?.type,
              url: URL.createObjectURL(file),
              uploadedAt: new Date()?.toISOString()
            };
            onAttachmentsUpdate([...attachments, newAttachment]);
            
            // Remove from progress tracking
            const { [fileId]: removed, ...rest } = prev;
            return rest;
          }
          return { ...prev, [fileId]: currentProgress + 10 };
        });
      }, 200);
    });
  };

  const removeAttachment = (attachmentId) => {
    const updatedAttachments = attachments?.filter(att => att?.id !== attachmentId);
    onAttachmentsUpdate(updatedAttachments);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (type) => {
    if (type?.startsWith('image/')) return 'Image';
    if (type?.startsWith('video/')) return 'Video';
    if (type?.startsWith('audio/')) return 'Music';
    if (type?.includes('pdf')) return 'FileText';
    if (type?.includes('word') || type?.includes('document')) return 'FileText';
    if (type?.includes('sheet') || type?.includes('excel')) return 'Table';
    if (type?.includes('presentation') || type?.includes('powerpoint')) return 'Presentation';
    return 'File';
  };

  const isImageFile = (type) => type?.startsWith('image/');
  const isVideoFile = (type) => type?.startsWith('video/');

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
            <Icon name="Upload" size={24} className="text-muted-foreground" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Support for images, videos, documents, and more. Max file size: 50MB
            </p>
            
            <Button
              variant="outline"
              onClick={() => fileInputRef?.current?.click()}
              iconName="Plus"
            >
              Choose Files
            </Button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
        />
      </div>
      {/* Upload Progress */}
      {Object.keys(uploadProgress)?.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Uploading...</h4>
          {Object.entries(uploadProgress)?.map(([fileId, progress]) => (
            <div key={fileId} className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">Uploading file...</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Attachments List */}
      {attachments?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">
            Attachments ({attachments?.length})
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {attachments?.map((attachment) => (
              <div key={attachment?.id} className="bg-card border border-border rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  {/* File Preview/Icon */}
                  <div className="flex-shrink-0">
                    {isImageFile(attachment?.type) ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={attachment?.url}
                          alt={`Preview of ${attachment?.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : isVideoFile(attachment?.type) ? (
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Icon name="Video" size={20} className="text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Icon name={getFileIcon(attachment?.type)} size={20} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-foreground truncate">
                      {attachment?.name}
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(attachment?.size)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(attachment.uploadedAt)?.toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(attachment?.url, '_blank')}
                      iconName="ExternalLink"
                      className="w-8 h-8 p-0"
                      title="View file"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(attachment?.id)}
                      iconName="Trash2"
                      className="w-8 h-8 p-0 text-destructive hover:text-destructive"
                      title="Remove file"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUploadZone;