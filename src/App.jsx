import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import FileExplorer from './components/filexplorer/FileExplorer';
import SidePanel from './components/sidePanel/SidePanel';
import fileData from './assets/data.json';
import './App.css';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilePath, setSelectedFilePath] = useState('');
  const [data, setData] = useState(fileData);

  useEffect(() => {
    // Load data from JSON
    setData(fileData);
  }, []);

  const handleSelectFile = (file, path = '') => {
    setSelectedFile(file);
    setSelectedFilePath(path);
  };

  const handleCloseProperties = () => {
    setSelectedFile(null);
    setSelectedFilePath('');
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="app-main">
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
      </main>
    </div>
  );
};

export default App;
