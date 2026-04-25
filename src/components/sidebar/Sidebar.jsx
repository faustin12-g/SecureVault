import React from 'react';
import { FiFolder, FiShare2, FiClock, FiStar, FiTrash2 } from 'react-icons/fi';
import '../sidebar/Sidebar.css';

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <aside className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="vault-logo">
          <FiFolder size={24} />
          {isOpen && <span>SecureVault</span>}
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          {isOpen && <h3>VAULT</h3>}
          <ul className="nav-list">
            <li className="nav-item active" title={!isOpen ? "My Vault" : ""}>
              <FiFolder size={18} />
              {isOpen && <span>My Vault</span>}
            </li>
            <li className="nav-item" title={!isOpen ? "Shared with me" : ""}>
              <FiShare2 size={18} />
              {isOpen && <span>Shared with me</span>}
            </li>
            <li className="nav-item" title={!isOpen ? "Recent" : ""}>
              <FiClock size={18} />
              {isOpen && <span>Recent</span>}
            </li>
            <li className="nav-item" title={!isOpen ? "Starred" : ""}>
              <FiStar size={18} />
              {isOpen && <span>Starred</span>}
            </li>
            <li className="nav-item" title={!isOpen ? "Trash" : ""}>
              <FiTrash2 size={18} />
              {isOpen && <span>Trash</span>}
            </li>
          </ul>
        </div>
      </nav>

      {isOpen && (
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
      )}
    </aside>
  );
};

export default Sidebar;
