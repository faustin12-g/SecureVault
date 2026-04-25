import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import FileExplorer from './components/filexplorer/FileExplorer';
import SidePanel from './components/sidePanel/SidePanel';
import fileData from './assets/data.json';
import './App.css';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilePath, setSelectedFilePath] = useState('');
  const [data, setData] = useState(fileData);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [focusSection, setFocusSection] = useState('explorer'); // 'sidebar', 'explorer', 'properties'
  
  const sidebarRef = useRef(null);
  const explorerRef = useRef(null);
  const panelRef = useRef(null);

  // Global keyboard handler for cross-section navigation
  const handleGlobalKeyDown = (e) => {
    // Tab key to move focus right between sections
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Tab - move focus left
        if (focusSection === 'properties') {
          setFocusSection('explorer');
          setTimeout(() => explorerRef.current?.focusExplorer(), 0);
        } else if (focusSection === 'explorer') {
          setFocusSection('sidebar');
          setTimeout(() => sidebarRef.current?.focusSidebar(), 0);
        }
      } else {
        // Tab - move focus right
        if (focusSection === 'sidebar') {
          setFocusSection('explorer');
          setTimeout(() => explorerRef.current?.focusExplorer(), 0);
        } else if (focusSection === 'explorer') {
          setFocusSection('properties');
          setTimeout(() => panelRef.current?.focusPanel(), 0);
        }
      }
      return;
    }

    // Arrow keys for section navigation (only when not in search input)
    const activeElement = document.activeElement;
    const isSearchActive = activeElement?.className?.includes('search-input');
    const isSidePanelInput = activeElement?.className?.includes('panel-input') || activeElement?.tagName === 'INPUT';

    if (!isSearchActive && !isSidePanelInput) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (focusSection === 'sidebar') {
          setFocusSection('explorer');
          setTimeout(() => explorerRef.current?.focusExplorer(), 0);
        } else if (focusSection === 'explorer' && selectedFile) {
          setFocusSection('properties');
          setTimeout(() => panelRef.current?.focusPanel(), 0);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (focusSection === 'properties') {
          setFocusSection('explorer');
          setTimeout(() => explorerRef.current?.focusExplorer(), 0);
        } else if (focusSection === 'explorer') {
          setFocusSection('sidebar');
          setTimeout(() => sidebarRef.current?.focusSidebar(), 0);
        }
      }
    }
  };

  useEffect(() => {
    // Add global keyboard listener for cross-section navigation
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [focusSection, selectedFile, handleGlobalKeyDown]);

  const handleSelectFile = (file, path = '') => {
    setSelectedFile(file);
    setSelectedFilePath(path);
  };

  const handleCloseProperties = () => {
    setSelectedFile(null);
    setSelectedFilePath('');
  };



  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-container">
      <Sidebar 
        ref={sidebarRef}
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar}
        isFocused={focusSection === 'sidebar'}
        onFocusChange={() => setFocusSection('sidebar')}
      />
      <main className="app-main">
        <div className="explorer-header-bar">
          <button className="sidebar-toggle-btn" onClick={toggleSidebar} title="Toggle sidebar">
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
        <div className="main-content">
          <div className="explorer-section">
            <FileExplorer
              ref={explorerRef}
              data={data}
              onSelectFile={handleSelectFile}
              selectedFile={selectedFile}
              onFocusChange={() => setFocusSection('explorer')}
            />
          </div>

          <div className="properties-section">
            <SidePanel 
              ref={panelRef}
              selectedFile={selectedFile} 
              selectedFilePath={selectedFilePath}
              onClose={handleCloseProperties}
              isFocused={focusSection === 'properties'}
              onFocusChange={() => setFocusSection('properties')}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
