# SecureVault Dashboard - Design System

## Brand Identity
**Theme**: Dark Mode (Cyber-Secure Aesthetic)
**Target Users**: Lawyers, bankers, power users who need fast navigation and accessibility
**Principle**: Minimal 4-color system.

---

## Color Palette

### 4-Color Dark Mode System

**CSS Custom Properties** (defined in `src/index.css`):

```css
--color-bg: #000000;        
--color-surface: #181819;   
--color-primary: #C6A75A;     
--color-text: #E5E7EB;        
--color-border: #161616;      
```

### Design Philosophy
- **Semantic naming**: Variables describe purpose, not hue
- **Dark mode only**: Cyber-secure, precise, fast aesthetic
- **Easy maintenance**: Change 4 variables, entire app updates

---

## Typography Scale

**Font Family**: Inter (imported from Google Fonts)

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| **H1** | 24px | Semi Bold (600) | Major headers, titles |
| **H2** | 18px | Medium (500) | Section headers ("MY VAULT", "PROPERTIES") |
| **H3** | 16px | Medium (500) | Subsection headers, tag buttons |
| **Body** | 14px | Regular (400) | File/folder names, descriptions, UI text |
| **Caption** | 12px | Regular (400) | Labels, metadata, file sizes, hints |

**CSS Variables** (defined in `src/index.css`):
```css
--font-family: "Inter", system fonts fallback;
--h1-font-size: 24px;   --h1-font-weight: 600;
--h2-font-size: 18px;   --h2-font-weight: 500;
--h3-font-size: 16px;   --h3-font-weight: 500;
--body-font-size: 14px; --body-font-weight: 400;
--caption-font-size: 12px; --caption-font-weight: 400;
```

**Usage**: Apply typography variables across all components for consistency

---

## Spacing Grid
Base unit: **4px**

| Scale | Pixels | Usage |
|-------|--------|-------|
| xs | 4px | Icon borders, minimal gaps |
| sm | 8px | Padding within items, small gaps |
| md | 12px | Component padding, field gaps |
| lg | 16px | Section padding, main spacing |
| xl | 24px | Large section separation |
| 2xl | 32px | Page/major boundaries |

---

## Component States

### File/Folder Item States
1. **Idle**: Normal appearance, text-color
2. **Hover**: background-color surface, text-color text
3. **Focus (Keyboard)**: border-color primary, outline 2px
4. **Selected**: background-color surface, border-left 2px primary
5. **Expanded** (folder): Chevron rotates 90°, children visible

### Interactive Buttons
- **Idle**: Transparent background, border 1px surface, text-color text
- **Hover**: background-color surface, border-color primary
- **Active**: background-color primary, color bg (inverted)
- **Disabled**: Opacity 50%, no pointer

### Search Input
- **Idle**: background-color bg, border 1px surface
- **Focus**: border-color primary, background-color surface
- **Placeholder**: color text with reduced opacity

---

## Layout Architecture

### 3-Column Layout
```
┌─────────────────────────────────────────┐
│ [☰] Hamburger                           │ ← Header Bar (50px fixed)
├─────────────────────────────────────────┤
│        │ EXPLORER (flex: 1) │ PROPERTIES│
│ SIDEBAR│ • Folders/Files   │ (350px)  │
│ (220px)│ • Keyboard Nav    │ • Metadata│
│ Toggle │ • Search Auto-Exp │ • Tags    │
│ Icons  │ • Cross-section   │ • Actions │
│(70px)  │   keyboard nav    │           │
└─────────────────────────────────────────┘
```

### Sidebar States
- **Open**: 220px width, text labels visible, storage section visible
- **Closed**: 70px width (hamburger icon minimizes it), icons only, storage hidden, tooltips on hover
- **Transition**: 300ms smooth animation between states

### Header Bar Features
- **Position**: 50px fixed at top, spans full width
- **Hamburger Toggle**: Left side, toggles sidebar open/closed
- **Icons**: Interactive with hover states using primary color

### File Item
- **Height**: 32px (comfortable touch target)
- **Padding**: 8px vertical, left padding = level × 16px (each nesting level)
- **Icon**: 18px, color primary for interactive elements
- **Text**: Flex grow, ellipsis on overflow
- **Size Badge**: Right-aligned, monospace, secondary text color

### Properties Panel
- **Width**: 350px fixed, right-aligned
- **Header**: 50px with close button (X icon)
- **Content**: Scrollable with custom scrollbar
- **Sections**: Details, Tags, Permissions, Actions
- **Empty State**: Folder icon + message when no file selected

---

## Feature-Specific Styling

### Keyboard Navigation - Universal (Wildcard Feature)
**Within Sidebar:**
- **Arrow Up/Down**: Navigate between nav items (My Vault, Shared, Recent, Starred, Trash)
- **Visual Feedback**: Focus ring (2px solid primary, outline-offset -2px)

**Within File Explorer:**
- **Arrow Up/Down**: Navigate through visible file tree items
- **Arrow Right**: Expand folder / Move to Properties panel (if file selected)
- **Arrow Left**: Collapse folder / Move to Sidebar
- **Enter**: Select/open file

**Within Properties Panel:**
- **Arrow Up/Down**: Navigate between action buttons (Download, Share, Copy Path)
- **Enter**: Activate button

**Cross-Section Navigation (NEW):**
- **Tab**: Move focus right → Sidebar → Explorer → Properties
- **Shift+Tab**: Move focus left → Properties → Explorer → Sidebar
- **Arrow Right**: Navigate right between sections (when not in search)
- **Arrow Left**: Navigate left between sections (when not in search)
- **Smart boundaries**: Search input and panel inputs don't trigger section nav

### Search & Auto-Expand (Wildcard Feature)
- **Search Bar**: Integrated in explorer header, styled with primary border on focus
- **Results**: Parent folders auto-expand, matching items highlighted
- **Case Insensitive**: User-friendly search
- **Clear Button**: X icon appears when text present
- **Real-time**: Updates as user types

### Sidebar Toggle - Hamburger (Feature)
- **Icon**: 3 horizontal bars (hamburger)
- **Position**: Top-left header bar
- **States**: 
  - Open: Sidebar = 220px, full labels and storage
  - Closed: Sidebar = 70px, only icons, storage hidden
- **Animation**: 300ms width + opacity transition
- **Tooltips**: On closed state, hover shows label

---

## Border & Dividers

### Borders
- **Subtle Dividers**: `1px solid var(--color-border)` - Between sections
- **Focus Ring**: `2px solid var(--color-primary)` - On keyboard focus
- **Interactive Hover**: `1px solid var(--color-primary)` - On button hover
- **Left Accent**: `2px solid var(--color-primary)` - Selected file indicator

### Implementation
All borders use CSS variables for theme consistency. No hardcoded colors.

---

## Animation & Transitions

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Folder expand/collapse | Icon rotate + children fade | 200ms | ease-out |
| Item hover | Background fade | 150ms | ease-in-out |
| Button click | Scale + opacity | 150ms | ease-in-out |
| Sidebar toggle | Width transition | 300ms | ease-in-out |
| Focus ring | Outline fade | 100ms | ease-in |

**Principle**: Fast, snappy, no jarring delays. Max 300ms for any animation.

---

## Component Hierarchy

```
App (Global State Management - focusSection: sidebar|explorer|properties)
├── Header Bar (50px fixed)
│   └── HamburgerToggle (sidebar 220px ↔ 70px)
├── Sidebar (220px / 70px with transition)
│   ├── Header (Custom Logo: assets/images/icon.png)
│   ├── Nav Section
│   │   └── Nav Items (keyboard: ↑↓ ArrowUp/Down)
│   │       • My Vault (FiFolder)
│   │       • Shared with me (FiShare2)
│   │       • Recent (FiClock)
│   │       • Starred (FiStar)
│   │       • Trash (FiTrash2)
│   └── Storage Section (68% used, progress bar)
└── Main Content (flex row)
    ├── FileExplorer
    │   ├── Header ("MY VAULT" + icon)
    │   ├── SearchBar (keyboard: ↑↓ ArrowUp/Down or →← to switch sections)
    │   └── TreeView (recursive)
    │       └── FileNode (recursive, keyboard: ↑↓→← and Enter)
    │           ├── Chevron (expand/collapse, →← keys)
    │           ├── Icon (file type colored)
    │           ├── Name (flex grow, ellipsis)
    │           ├── Size (monospace, right-aligned)
    │           └── Children (if expanded)
    └── SidePanel (350px fixed)
        ├── Header ("PROPERTIES" + close btn)
        ├── FileHeader (icon 80×80 + filename)
        ├── DetailsSection (7 fields)
        ├── TagsSection (badge pills + add)
        ├── PermissionsSection (access + manage btn)
        └── ActionsSection (3 buttons, keyboard: ↑↓ ArrowUp/Down)
```

**Cross-Section Keyboard Navigation:**
- `Tab` → Sidebar → Explorer → Properties
- `Shift+Tab` ← Properties ← Explorer ← Sidebar
- `Arrow Right` / `Arrow Left` ← → Between sections

---

## File Type Icons & Colors

Using React Icons (Feather + Font Awesome):

| Type | Icon | Color |
|------|------|-------|
| Folder | FiFolder | text (#E5E7EB) |
| PDF | FaFilePdf | #EF4444 (red) |
| Word | FaFileWord | #3B82F6 (blue) |
| Excel | FaFileExcel | #10B981 (green) |
| Image | FiImage | #A855F7 (purple) |
| Code/Config | FiCode | #F97316 (orange) |
| Archive | FiDownload | #EAB308 (yellow) |
| Video | FiVideo | #EC4899 (pink) |
| Audio | FiMusic | #8B5CF6 (violet) |
| Text | FiFileText | #6B7280 (gray) |

---

## Accessibility

- **Keyboard Navigation**: Arrow keys, Enter, Tab focus management for cross-section navigation
- **Focus Management**: All interactive elements have visible focus ring (2px primary)
- **Color Contrast**: WCAG AA compliant - Light gray (#E5E7EB) on black background
- **Screen Reader**: Proper semantic HTML, aria labels on buttons
- **Responsive**: Works on 1200px, 1024px, 768px breakpoints

---

## Performance Considerations

- **CSS Variables**: Single source of truth for colors, consistent theming
- **Flex Layout**: GPU-accelerated, no layout thrashing
- **CSS Transitions**: Hardware accelerated animations
- **Minimal Re-renders**: React state focused, component separation proper

---

## Dark Mode Only

**Why Dark Mode?**
- **Reduce eye strain**: Especially for long work sessions (legal review and financial analysis)
- **Battery savings**: On OLED displays
- **Professional aesthetic**: Security-focused, serious tone appropriate for SecureVault Inc.
- **Accessibility**: Better for users with light sensitivity
- **Single source of truth**: Eliminates theme toggle complexity and reduces CSS variable overhead

---

