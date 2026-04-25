# SecureVault-Dashboard

A high-performance, keyboard-accessible file explorer UI built for SecureVault Inc. Built without any component libraries—fully custom React components and CSS.

## Getting Started

### Setup Instructions

#### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager

#### Getting Started

1. Clone the repository from GitHub
2. Install dependencies using npm or yarn
3. Run the development server
4. The application will open in your browser with Hot Module Replacement enabled for live editing

#### Production Build

Build an optimized production bundle and preview it locally before deployment. The output is ready for deployment to any static hosting service.

---

## Design File

Link to complete design documentation: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)

---

## Recursive Strategy Explanation

### How We Managed the Data Structure

The file tree uses a recursive React component pattern that elegantly handles unlimited nesting depth without performance degradation.

#### The FileNode Component

The FileNode component is responsible for rendering individual file and folder items. It accepts data about each item, the depth level in the tree, and information about which folders are expanded.

**How it works:**
1. Each FileNode renders a single item (file or folder) with proper indentation based on its depth level
2. For folder items, it checks if the folder is marked as expanded in the application state
3. If expanded, it recursively renders a FileNode for each child item, with the depth level increased by one
4. If collapsed, the children are not rendered at all—this prevents unnecessary DOM nodes

#### Performance Optimizations

- **Only visible items render**: Collapsed folders don't create DOM nodes for their children, keeping memory usage low
- **CSS-based indentation**: Each level adds 16px of left padding through CSS, avoiding complex JavaScript calculations
- **Smart focus management**: Uses React refs to jump directly to specific items during keyboard navigation
- **Efficient state updates**: Only the expanded/collapsed state of specific folders is tracked, not entire tree snapshots

#### Data Structure Support

The JSON data structure supports unlimited nesting depth. Each item can have a `children` array containing more items of any depth. This flexibility allows the file tree to handle any organizational structure that users might have.

---

## Wildcard Feature Explanation

### Feature 1: Search with Intelligent Auto-Expand

**Problem Solved**: Users need to find files buried deep in folder structures without manually expanding every parent folder.

**Solution**: When you search for a term, parent folders automatically expand to reveal all matching files.

**How It Works**:

1. **Real-time filtering**: As you type in the search bar, the UI filters visible items
2. **Smart parent detection**: A recursive function identifies all parent folders that contain matches
3. **Auto-expansion**: Those parent folder IDs are added to the application state
4. **Visual feedback**: Results appear in context with auto-expanded hierarchy
5. **Smart reset**: When search clears, folders return to their previous expansion state

**Why this matters**: Law firms and banks can locate documents in seconds instead of minutes—critical for fast-paced negotiations and compliance reviews.

### Feature 2: Cross-Section Keyboard Navigation

**How It Works**:

1. **Global keyboard tracking**: The application monitors keyboard events across all sections
2. **Focus tracking**: The application knows which section currently has focus (sidebar, file explorer, or properties)
3. **Smart navigation**: 
   - Tab moves focus right through sections
   - Shift+Tab moves focus left through sections  
   - Arrow Right/Left also navigate between sections
4. **Input awareness**: Search bar and text inputs aren't intercepted—normal typing works as expected
5. **Section-specific focus**: Each section manages its own internal navigation while also responding to cross-section commands

**Why this matters**: Users who navigate hundreds of files per day can work entirely with the keyboard, improving speed and accessibility compliance.
