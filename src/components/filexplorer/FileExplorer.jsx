import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { FiFolder, FiSearch, FiX } from 'react-icons/fi';
import FileNode from '../fileNode/FileNode';
import '../filexplorer/FileExplorer.css';

const FileExplorer = forwardRef(({ data, onSelectFile, selectedFile, onFocusChange }, ref) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [focusedNodeId, setFocusedNodeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const explorerRef = useRef(null);
  const nodeRefsMap = useRef(new Map());

  useImperativeHandle(ref, () => ({
    focusExplorer: () => {
      if (focusedNodeId && nodeRefsMap.current.has(focusedNodeId)) {
        nodeRefsMap.current.get(focusedNodeId)?.focus();
      } else {
        // Focus first visible node if none selected
        const nodeIds = buildNodeList(filteredData);
        if (nodeIds.length > 0) {
          const firstNodeId = nodeIds[0];
          setFocusedNodeId(firstNodeId);
          setTimeout(() => nodeRefsMap.current.get(firstNodeId)?.focus(), 0);
        }
      }
      onFocusChange?.();
    }
  }));

  // Register a node ref
  const registerNodeRef = (nodeId, ref) => {
    if (ref) {
      nodeRefsMap.current.set(nodeId, ref);
    } else {
      nodeRefsMap.current.delete(nodeId);
    }
  };

  // Expand/collapse folder
  const handleExpandChange = (folderId) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  // Select a file
  const handleSelectFile = (file) => {
    // Find the path to this file
    const findPath = (items, targetId, currentPath = 'My Vault') => {
      for (let item of items) {
        if (item.id === targetId) {
          return currentPath + ' / ' + item.name;
        }
        if (item.children) {
          const path = findPath(item.children, targetId, currentPath + ' / ' + item.name);
          if (path) return path;
        }
      }
      return null;
    };

    const filePath = findPath(data, file.id) || 'My Vault';
    onSelectFile(file, filePath);
  };

  // Build flat list of all visible nodes for keyboard nav
  const buildNodeList = (nodes, result = []) => {
    nodes.forEach(node => {
      result.push(node.id);
      if (node.type === 'folder' && expandedFolders.has(node.id) && node.children) {
        buildNodeList(node.children, result);
      }
    });
    return result;
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    const nodeIds = buildNodeList(filteredData);
    const currentIndex = focusedNodeId ? nodeIds.indexOf(focusedNodeId) : -1;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : nodeIds.length - 1;
      if (nodeIds.length > 0) {
        const prevNodeId = nodeIds[prevIndex];
        setFocusedNodeId(prevNodeId);
        // Focus the ref after state update
        setTimeout(() => {
          nodeRefsMap.current.get(prevNodeId)?.focus();
        }, 0);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = currentIndex < nodeIds.length - 1 ? currentIndex + 1 : 0;
      if (nodeIds.length > 0) {
        const nextNodeId = nodeIds[nextIndex];
        setFocusedNodeId(nextNodeId);
        // Focus the ref after state update
        setTimeout(() => {
          nodeRefsMap.current.get(nextNodeId)?.focus();
        }, 0);
      }
    }
  };

  // Filter nodes based on search query
  const filterAndExpandNodes = (nodes, query, parentFolders = new Set()) => {
    if (!query.trim()) return { filtered: nodes, toExpand: new Set() };

    const lowerQuery = query.toLowerCase();
    const toExpand = new Set(parentFolders);
    let hasMatch = false;

    const filter = (nodeList) => {
      return nodeList.reduce((acc, node) => {
        const nameMatches = node.name.toLowerCase().includes(lowerQuery);
        const isFolder = node.type === 'folder';
        let childrenMatch = false;
        let filteredChildren = [];

        if (isFolder && node.children) {
          const result = filter(node.children);
          filteredChildren = result.filtered;
          childrenMatch = result.hasMatch;
          if (childrenMatch) {
            toExpand.add(node.id);
          }
        }

        if (nameMatches || childrenMatch) {
          acc.push({
            ...node,
            children: filteredChildren,
          });
          hasMatch = true;
        }

        return acc;
      }, []);
    };

    const filtered = filter(nodes);
    return { filtered, toExpand, hasMatch };
  };

  // Apply search filter
  const { filtered: filteredData, toExpand: nodesToExpand } = filterAndExpandNodes(data, searchQuery);

  // Auto-expand folders with search matches
  useEffect(() => {
    if (searchQuery.trim()) {
      setExpandedFolders(prev => {
        const newSet = new Set(prev);
        nodesToExpand.forEach(id => newSet.add(id));
        return newSet;
      });
      setFocusedNodeId(null);
    }
  }, [searchQuery, nodesToExpand]);

  // Reset focused node when data changes
  useEffect(() => {
    setFocusedNodeId(null);
  }, [filteredData]);

  return (
    <div
      className="file-explorer-container"
      ref={explorerRef}
      role="tree"
    >
      <div className="explorer-header">
        <h2><FiFolder /> My Vault</h2>
      </div>

      <div className="explorer-search">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => setSearchQuery('')}
          >
            <FiX />
          </button>
        )}
      </div>

      <div className="explorer-content">
        {filteredData && filteredData.length > 0 ? (
          <div className="tree-view">
            {filteredData.map(node => (
              <FileNode
                key={node.id}
                node={node}
                onSelectFile={handleSelectFile}
                selectedId={selectedFile?.id}
                onExpandChange={handleExpandChange}
                expandedFolders={expandedFolders}
                level={0}
                onKeyDown={handleKeyDown}
                registerRef={registerNodeRef}
                onFocusChange={onFocusChange}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>{searchQuery ? 'No results found' : 'No files or folders'}</p>
          </div>
        )}
      </div>

      <div className="explorer-footer">
        <small>Use ↑↓ to navigate, →/← to move between sections, Enter to select</small>
      </div>
    </div>
  );
});

FileExplorer.displayName = 'FileExplorer';

export default FileExplorer;
