import React, { useState, forwardRef, useEffect, useRef } from 'react';
import { 
  FiChevronRight, 
  FiFolder, 
  FiFile, 
  FiFileText, 
  FiCode, 
  FiImage, 
  FiMusic, 
  FiVideo, 
  FiDownload
} from 'react-icons/fi';
import { FaFilePdf, FaFileExcel, FaFileWord } from 'react-icons/fa';
import '../fileNode/FileNode.css';

const FileNode = forwardRef(({ 
  node, 
  onSelectFile, 
  selectedId, 
  onExpandChange,
  expandedFolders,
  level = 0,
  onKeyDown: parentKeyDown,
  registerRef
}, ref) => {
  const nodeRef = useRef(null);

  // Register this node's ref when mounted
  useEffect(() => {
    if (registerRef && nodeRef.current) {
      registerRef(node.id, nodeRef.current);
    }
    return () => {
      if (registerRef) {
        registerRef(node.id, null);
      }
    };
  }, [node.id, registerRef]);
  const isFolder = node.type === 'folder';
  const isExpanded = expandedFolders.has(node.id);
  const isSelected = selectedId === node.id;

  const handleToggleExpand = (e) => {
    e.stopPropagation();
    onExpandChange(node.id);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (isFolder) {
      onExpandChange(node.id);
    } else {
      onSelectFile(node);
    }
  };

  const handleKeyDown = (e) => {
    // Pass up to parent handler for navigation
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      parentKeyDown?.(e);
      return;
    }

    // Handle expand/collapse for arrow keys
    if (e.key === 'ArrowRight' && isFolder && !isExpanded) {
      e.preventDefault();
      onExpandChange(node.id);
    } else if (e.key === 'ArrowLeft' && isFolder && isExpanded) {
      e.preventDefault();
      onExpandChange(node.id);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (isFolder) {
        onExpandChange(node.id);
      } else {
        onSelectFile(node);
      }
    }
  };

  // Get file type icon
  const getFileIcon = () => {
    if (isFolder) {
      return <FiFolder />;
    }

    const name = node.name.toLowerCase();
    if (name.endsWith('.pdf')) return <FaFilePdf style={{ color: '#EF4444' }} />;
    if (name.endsWith('.docx') || name.endsWith('.doc')) return <FaFileWord style={{ color: '#3B82F6' }} />;
    if (name.endsWith('.xlsx') || name.endsWith('.csv')) return <FaFileExcel style={{ color: '#10B981' }} />;
    if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.svg')) return <FiImage style={{ color: '#A855F7' }} />;
    if (name.endsWith('.yaml') || name.endsWith('.json') || name.endsWith('.config')) return <FiCode style={{ color: '#F97316' }} />;
    if (name.endsWith('.zip') || name.endsWith('.rar')) return <FiDownload style={{ color: '#EAB308' }} />;
    if (name.endsWith('.mp4') || name.endsWith('.mov')) return <FiVideo style={{ color: '#EC4899' }} />;
    if (name.endsWith('.mp3') || name.endsWith('.wav')) return <FiMusic style={{ color: '#8B5CF6' }} />;
    if (name.endsWith('.txt')) return <FiFileText style={{ color: '#6B7280' }} />;
    return <FiFile />;
  };

  return (
    <div className="file-node-wrapper">
      <div
        ref={(el) => {
          nodeRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        className={`file-node ${isSelected ? 'selected' : ''} ${isFolder ? 'folder' : 'file'}`}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="treeitem"
        aria-expanded={isFolder ? isExpanded : undefined}
      >
        <div className="node-content">
          {isFolder && (
            <span 
              className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
              onClick={handleToggleExpand}
            >
              <FiChevronRight />
            </span>
          )}
          {!isFolder && <span className="expand-icon invisible"><FiChevronRight /></span>}
          
          <span className="file-icon">{getFileIcon()}</span>
          
          <span className="file-name">{node.name}</span>
          
          {!isFolder && node.size && (
            <span className="file-size">{node.size}</span>
          )}
        </div>
      </div>

      {isFolder && isExpanded && node.children && node.children.length > 0 && (
        <div className="children-container">
          {node.children.map(child => (
            <FileNode
              key={child.id}
              node={child}
              onSelectFile={onSelectFile}
              selectedId={selectedId}
              onExpandChange={onExpandChange}
              expandedFolders={expandedFolders}
              level={level + 1}
              onKeyDown={parentKeyDown}
              registerRef={registerRef}
            />
          ))}
        </div>
      )}

      {isFolder && isExpanded && (!node.children || node.children.length === 0) && (
        <div className="empty-folder">
          <span>Empty folder</span>
        </div>
      )}
    </div>
  );
});

FileNode.displayName = 'FileNode';

export default FileNode;
