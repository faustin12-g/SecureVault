import React from 'react';
import { FiFolder, FiShare2, FiClock, FiStar, FiTrash2 } from 'react-icons/fi';
import '../sidebar/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
        <div className="vault-logo">
          <FiFolder size={24} />
          <span>SecureVault</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3>VAULT</h3>
          <ul className="nav-list">
            <li className="nav-item active">
              <FiFolder size={18} />
              <span>My Vault</span>
            </li>
            <li className="nav-item">
              <FiShare2 size={18} />
              <span>Shared with me</span>
            </li>
            <li className="nav-item">
              <FiClock size={18} />
              <span>Recent</span>
            </li>
            <li className="nav-item">
              <FiStar size={18} />
              <span>Starred</span>
            </li>
            <li className="nav-item">
              <FiTrash2 size={18} />
              <span>Trash</span>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-storage">
        <h4>STORAGE</h4>
        <div className="storage-info">
          <div className="storage-bar">
            <div className="storage-used" style={{ width: '68%' }}></div>
          </div>
          <p className="storage-text">68% used</p>
          <p className="storage-size">34.2 GB of 50 GB</p>
          <button className="upgrade-btn">Upgrade Storage</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
