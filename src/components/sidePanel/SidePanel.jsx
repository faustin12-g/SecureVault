import { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { 
  FiFile, 
  FiFileText, 
  FiCode, 
  FiImage, 
  FiMusic, 
  FiVideo, 
  FiDownload, 
  FiShare2, 
  FiCopy,
  FiFolder,
  FiX
} from 'react-icons/fi';
import { FaFilePdf, FaFileExcel, FaFileWord } from 'react-icons/fa';
import '../sidePanel/SidePanel.css';

const SidePanel = forwardRef(({ selectedFile, selectedFilePath, onClose, isFocused, onFocusChange }, ref) => {
  const [focusedButtonIndex, setFocusedButtonIndex] = useState(0);
  const actionButtonsRef = useRef([]);
  const panelRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusPanel: () => {
      if (selectedFile && actionButtonsRef.current.length > 0) {
        setFocusedButtonIndex(0);
        setTimeout(() => actionButtonsRef.current[0]?.focus(), 0);
      }
      onFocusChange?.();
    }
  }));
  const formatFileType = (fileName) => {
    if (!fileName) return 'Unknown';
    const ext = fileName.split('.').pop().toUpperCase();
    if (ext === fileName.toUpperCase()) {
      return 'Folder';
    }
    return ext;
  };

  const getFileIcon = (fileName) => {
    if (!fileName) return <FiFile />;
    const name = fileName.toLowerCase();
    
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

  const getFileCategory = (fileName) => {
    if (!fileName) return 'Unknown';
    const name = fileName.toLowerCase();
    
    if (name.endsWith('.pdf') || name.endsWith('.docx') || name.endsWith('.doc') || name.endsWith('.txt')) {
      return 'Document';
    }
    if (name.endsWith('.xlsx') || name.endsWith('.csv')) {
      return 'Spreadsheet';
    }
    if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.svg')) {
      return 'Image';
    }
    if (name.endsWith('.yaml') || name.endsWith('.json') || name.endsWith('.config')) {
      return 'Configuration';
    }
    if (name.endsWith('.zip') || name.endsWith('.rar')) {
      return 'Archive';
    }
    if (name.endsWith('.mp4') || name.endsWith('.mov')) {
      return 'Video';
    }
    if (name.endsWith('.mp3') || name.endsWith('.wav')) {
      return 'Audio';
    }
    
    return 'File';
  };

  const handleActionButtonKeyDown = (e, index) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = index > 0 ? index - 1 : actionButtonsRef.current.length - 1;
      setFocusedButtonIndex(newIndex);
      setTimeout(() => actionButtonsRef.current[newIndex]?.focus(), 0);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = index < actionButtonsRef.current.length - 1 ? index + 1 : 0;
      setFocusedButtonIndex(newIndex);
      setTimeout(() => actionButtonsRef.current[newIndex]?.focus(), 0);
    }
  };

  return (
    <div className="side-panel-container" ref={panelRef}>
      {selectedFile ? (
        <>
          <div className="panel-header">
            <h3>PROPERTIES</h3>
            <button className="close-btn" onClick={onClose} onFocus={onFocusChange}>
              <FiX size={20} />
            </button>
          </div>

          <div className="panel-content">
            {/* File Icon and Name */}
            <div className="file-header">
              <div className="file-icon-large">
                {getFileIcon(selectedFile.name)}
              </div>
              <h2 className="file-name">{selectedFile.name}</h2>
            </div>

            {/* Details Section */}
            <div className="details-section">
              <h4>DETAILS</h4>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Type</span>
                  <span className="detail-value">{formatFileType(selectedFile.name)}</span>
                </div>

                {selectedFile.size && (
                  <div className="detail-item">
                    <span className="detail-label">Size</span>
                    <span className="detail-value">{selectedFile.size}</span>
                  </div>
                )}

                <div className="detail-item">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{selectedFilePath}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Modified</span>
                  <span className="detail-value">May 19, 2024 10:45 AM</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Created</span>
                  <span className="detail-value">Feb 3, 2024 09:30 AM</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Owner</span>
                  <span className="detail-value">You</span>
                </div>
              </div>
            </div>

            {/* Tags Section */}
            <div className="tags-section">
              <h4>TAGS</h4>
              <div className="tags-container">
                <span className="tag-badge">HR</span>
                <span className="tag-badge">Policies</span>
                <span className="tag-badge">Document</span>
                <button className="tag-add">+</button>
              </div>
            </div>

            {/* Permissions Section */}
            <div className="permissions-section">
              <h4>PERMISSIONS</h4>
              <p className="permission-text">Only you have access</p>
              <button className="manage-access-btn">Manage Access</button>
            </div>

            {/* Actions Section */}
            <div className="actions-section">
              <button 
                className="action-btn primary"
                ref={(el) => actionButtonsRef.current[0] = el}
                tabIndex={isFocused && focusedButtonIndex === 0 ? 0 : -1}
                onKeyDown={(e) => handleActionButtonKeyDown(e, 0)}
                onFocus={() => {
                  setFocusedButtonIndex(0);
                  onFocusChange?.();
                }}
              >
                <FiDownload /> Download
              </button>
              <button 
                className="action-btn"
                ref={(el) => actionButtonsRef.current[1] = el}
                tabIndex={isFocused && focusedButtonIndex === 1 ? 0 : -1}
                onKeyDown={(e) => handleActionButtonKeyDown(e, 1)}
                onFocus={() => {
                  setFocusedButtonIndex(1);
                  onFocusChange?.();
                }}
              >
                <FiShare2 /> Share
              </button>
              <button 
                className="action-btn"
                ref={(el) => actionButtonsRef.current[2] = el}
                tabIndex={isFocused && focusedButtonIndex === 2 ? 0 : -1}
                onKeyDown={(e) => handleActionButtonKeyDown(e, 2)}
                onFocus={() => {
                  setFocusedButtonIndex(2);
                  onFocusChange?.();
                }}
              >
                <FiCopy /> Copy Path
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-selection">
          <div className="empty-icon"><FiFolder size={64} /></div>
          <h3>No file selected</h3>
          <p>Click on a file in the explorer to view its properties</p>
        </div>
      )}
    </div>
  );
});

SidePanel.displayName = 'SidePanel';

export default SidePanel;
