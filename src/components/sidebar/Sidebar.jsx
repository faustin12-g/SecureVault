import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { FiFolder, FiShare2, FiClock, FiStar, FiTrash2 } from 'react-icons/fi';
import vaultIcon from '../../assets/images/icon.png';
import '../sidebar/Sidebar.css';

const Sidebar = forwardRef(({ isOpen, isFocused, onFocusChange }, ref) => {
  const [focusedNavItem, setFocusedNavItem] = useState(0);
  const navItemsRef = useRef([]);

  const navItems = [
    { id: 'vault', icon: FiFolder, label: 'My Vault' },
    { id: 'shared', icon: FiShare2, label: 'Shared with me' },
    { id: 'recent', icon: FiClock, label: 'Recent' },
    { id: 'starred', icon: FiStar, label: 'Starred' },
    { id: 'trash', icon: FiTrash2, label: 'Trash' },
  ];

  useImperativeHandle(ref, () => ({
    focusSidebar: () => {
      setFocusedNavItem(0);
      setTimeout(() => navItemsRef.current[0]?.focus(), 0);
      onFocusChange?.();
    }
  }));

  const handleNavKeyDown = (e, index) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = index > 0 ? index - 1 : navItems.length - 1;
      setFocusedNavItem(newIndex);
      setTimeout(() => navItemsRef.current[newIndex]?.focus(), 0);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = index < navItems.length - 1 ? index + 1 : 0;
      setFocusedNavItem(newIndex);
      setTimeout(() => navItemsRef.current[newIndex]?.focus(), 0);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // TODO: Handle nav item click
      console.log('Selected nav item:', navItems[index].label);
    }
  };

  return (
    <aside className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="vault-logo">
          <img src={vaultIcon} alt="SecureVault" className="vault-logo-icon" />
          {isOpen && <span>SecureVault</span>}
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          {isOpen && <h3>VAULT</h3>}
          <ul className="nav-list">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li 
                  key={item.id}
                  className={`nav-item ${index === 0 ? 'active' : ''} ${isFocused && focusedNavItem === index ? 'focus-ring' : ''}`}
                  title={!isOpen ? item.label : ""}
                  ref={(el) => navItemsRef.current[index] = el}
                  onKeyDown={(e) => handleNavKeyDown(e, index)}
                  onFocus={() => {
                    setFocusedNavItem(index);
                    onFocusChange?.();
                  }}
                  onClick={() => {
                    setFocusedNavItem(index);
                    onFocusChange?.();
                  }}
                  tabIndex={isFocused && focusedNavItem === index ? 0 : -1}
                >
                  <Icon size={18} />
                  {isOpen && <span>{item.label}</span>}
                </li>
              );
            })}
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
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
