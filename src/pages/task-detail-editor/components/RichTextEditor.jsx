import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RichTextEditor = ({ content, onContentChange, placeholder = "Start writing your task description..." }) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [activeFormats, setActiveFormats] = useState(new Set());
  const editorRef = useRef(null);

  const formatButtons = [
    { command: 'bold', icon: 'Bold', title: 'Bold (Ctrl+B)' },
    { command: 'italic', icon: 'Italic', title: 'Italic (Ctrl+I)' },
    { command: 'underline', icon: 'Underline', title: 'Underline (Ctrl+U)' },
    { command: 'strikeThrough', icon: 'Strikethrough', title: 'Strikethrough' }
  ];

  const listButtons = [
    { command: 'insertUnorderedList', icon: 'List', title: 'Bullet List' },
    { command: 'insertOrderedList', icon: 'ListOrdered', title: 'Numbered List' }
  ];

  const alignButtons = [
    { command: 'justifyLeft', icon: 'AlignLeft', title: 'Align Left' },
    { command: 'justifyCenter', icon: 'AlignCenter', title: 'Align Center' },
    { command: 'justifyRight', icon: 'AlignRight', title: 'Align Right' }
  ];

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    updateActiveFormats();
    editorRef?.current?.focus();
  };

  const updateActiveFormats = () => {
    const formats = new Set();
    formatButtons?.forEach(({ command }) => {
      if (document.queryCommandState(command)) {
        formats?.add(command);
      }
    });
    setActiveFormats(formats);
  };

  const handleInput = () => {
    const htmlContent = editorRef?.current?.innerHTML || '';
    onContentChange(htmlContent);
    updateActiveFormats();
  };

  const handleKeyDown = (e) => {
    // Handle keyboard shortcuts
    if (e?.ctrlKey || e?.metaKey) {
      switch (e?.key) {
        case 'b':
          e?.preventDefault();
          handleFormat('bold');
          break;
        case 'i':
          e?.preventDefault();
          handleFormat('italic');
          break;
        case 'u':
          e?.preventDefault();
          handleFormat('underline');
          break;
      }
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      handleFormat('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      handleFormat('insertImage', url);
    }
  };

  const handleHeading = (level) => {
    handleFormat('formatBlock', `h${level}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Toolbar */}
      {isToolbarVisible && (
        <div className="border-b border-border p-3 bg-muted/30">
          <div className="flex flex-wrap items-center gap-1">
            {/* Heading Dropdown */}
            <div className="flex items-center mr-2">
              <select
                onChange={(e) => handleHeading(e?.target?.value)}
                className="text-sm border border-border rounded px-2 py-1 bg-background"
                defaultValue=""
              >
                <option value="">Normal</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
              </select>
            </div>

            <div className="w-px h-6 bg-border mx-1"></div>

            {/* Format Buttons */}
            {formatButtons?.map(({ command, icon, title }) => (
              <Button
                key={command}
                variant={activeFormats?.has(command) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleFormat(command)}
                title={title}
                iconName={icon}
                className="w-8 h-8 p-0"
              />
            ))}

            <div className="w-px h-6 bg-border mx-1"></div>

            {/* List Buttons */}
            {listButtons?.map(({ command, icon, title }) => (
              <Button
                key={command}
                variant="ghost"
                size="sm"
                onClick={() => handleFormat(command)}
                title={title}
                iconName={icon}
                className="w-8 h-8 p-0"
              />
            ))}

            <div className="w-px h-6 bg-border mx-1"></div>

            {/* Alignment Buttons */}
            {alignButtons?.map(({ command, icon, title }) => (
              <Button
                key={command}
                variant="ghost"
                size="sm"
                onClick={() => handleFormat(command)}
                title={title}
                iconName={icon}
                className="w-8 h-8 p-0"
              />
            ))}

            <div className="w-px h-6 bg-border mx-1"></div>

            {/* Link and Image */}
            <Button
              variant="ghost"
              size="sm"
              onClick={insertLink}
              title="Insert Link"
              iconName="Link"
              className="w-8 h-8 p-0"
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={insertImage}
              title="Insert Image"
              iconName="Image"
              className="w-8 h-8 p-0"
            />

            <div className="w-px h-6 bg-border mx-1"></div>

            {/* Additional Actions */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFormat('removeFormat')}
              title="Clear Formatting"
              iconName="Eraser"
              className="w-8 h-8 p-0"
            />

            <div className="ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsToolbarVisible(false)}
                title="Hide Toolbar"
                iconName="ChevronUp"
                className="w-8 h-8 p-0"
              />
            </div>
          </div>
        </div>
      )}
      {/* Show Toolbar Button */}
      {!isToolbarVisible && (
        <div className="p-2 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsToolbarVisible(true)}
            iconName="ChevronDown"
          >
            Show Toolbar
          </Button>
        </div>
      )}
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-96 p-4 focus:outline-none text-foreground"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ minHeight: '384px' }}
        data-placeholder={placeholder}
      />
      {/* Editor Footer */}
      <div className="border-t border-border p-3 bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Words: {content?.replace(/<[^>]*>/g, '')?.split(/\s+/)?.filter(Boolean)?.length}</span>
          <span>Characters: {content?.replace(/<[^>]*>/g, '')?.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Save" size={14} />
          <span>Auto-saved</span>
        </div>
      </div>
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;