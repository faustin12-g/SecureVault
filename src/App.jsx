import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
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
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Load data from JSON
    setData(fileData);
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleSelectFile = (file, path = '') => {
    setSelectedFile(file);
    setSelectedFilePath(path);
  };

  const handleCloseProperties = () => {
    setSelectedFile(null);
    setSelectedFilePath('');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <main className="app-main">
        <div className="explorer-header-bar">
          <button className="sidebar-toggle-btn" onClick={toggleSidebar} title="Toggle sidebar">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle light/dark mode">
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
        <div className="main-content">
          <div className="explorer-section">
            <FileExplorer
              data={data}
              onSelectFile={handleSelectFile}
              selectedFile={selectedFile}
            />
          </div>

          <div className="properties-section">
            <SidePanel 
              selectedFile={selectedFile} 
              selectedFilePath={selectedFilePath}
              onClose={handleCloseProperties} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
