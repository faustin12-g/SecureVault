# SecureVault Dashboard - Design System

## Brand Identity
**Theme**: Dark & Light Modes, Cyber-Secure, Precise, Fast
**Target Users**: Lawyers, bankers, power users who need fast navigation and accessibility
**Principle**: Minimal 4-color system, no gradients, variable-based colors for theme flexibility

---

## Color Palette

### 4-Color System (Dark & Light Modes)

**CSS Custom Properties** (defined in `src/index.css`):

#### Dark Theme (Default)
```css
--color-bg: #000000;           /* Pure black background */
--color-surface: #181819;      /* Slightly lighter for UI elements */
--color-primary: #C6A75A;      /* Golden accent for interactive elements */
--color-text: #E5E7EB;         /* Light gray text */
--color-border: #161616;       /* Subtle borders */
```

#### Light Theme (Toggle via Sun/Moon Icon)
```css
--color-bg: #FFFFFF;           /* White background */
--color-surface: #F5F5F5;      /* Light gray for UI elements */
--color-primary: #C6A75A;      /* Same golden accent */
--color-text: #101011;         /* Dark text for contrast */
--color-border: #8d8e90;       /* Gray borders */
```

### Design Philosophy
- **No gradients**: All solid colors for consistency
- **No opacity variants**: Each color is intentional and explicit
- **Semantic naming**: Variables describe purpose, not hue
- **Theme agnostic**: Same primary golden color works in both modes
- **Easy maintenance**: Change 4 variables, entire app updates

---

## Typography Scale

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| **Header** | 20px | 700 (bold) | Section headers ("MY VAULT", "PROPERTIES") |
| **Headline 2** | 18px | 600 | File name in properties panel |
| **Body Large** | 14px | 500 (medium) | File/folder names in tree |
| **Body Regular** | 13px | 400 (normal) | Description text, properties labels |
| **Body Small** | 12px | 400 | Metadata, file sizes, tags |
| **Label Small** | 11px | 700 | Section labels ("VAULT", "STORAGE") |
| **Mono** | 12px | 400 | File extensions, technical info |

**Font Family**: System stack for performance
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

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
- **Placeholder**: color text (higher opacity in light mode)

---

## Layout Architecture

### 3-Column Layout
```
┌─────────────────────────────────────────┐
│ [☰] Hamburger  Sidebar  [☀/☾] Theme    │ ← Header Bar (50px)
├─────────────────────────────────────────┤
│        │ EXPLORER (flex: 1) │ PROPERTIES│
│ SIDEBAR│ • Folders/Files   │ (350px)  │
│ (220px)│ • Keyboard Nav    │ • Metadata│
│ Toggle │ • Search Auto-Exp │ • Tags    │
│ Icons  │                   │ • Actions │
│(60px)  │                   │           │
└─────────────────────────────────────────┘
```

### 3-Column Layout
```
┌─────────────────────────────────────────┐
│ [☰] Hamburger        [☀/☾] Theme       │ ← Header Bar (50px fixed)
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
- **Theme Toggle**: Right side, FiSun (dark mode) / FiMoon (light mode) icons
- **Icons**: Both interactive with hover states using primary color

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

### Theme Toggle (Feature)
- **Icon**: FiSun (dark mode) or FiMoon (light mode)
- **Position**: Top-right header bar
- **Action**: Toggles `data-theme` attribute on `<html>` element
- **Storage**: localStorage persistence as 'theme'
- **Transition**: 200ms color transition

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
| Theme switch | Color transition | 200ms | ease-in-out |
| Focus ring | Outline fade | 100ms | ease-in |

**Principle**: Fast, snappy, no jarring delays. Max 300ms for any animation.

---

## Component Hierarchy

```
App (Global State Management - focusSection: sidebar|explorer|properties)
├── Header Bar (50px fixed)
│   ├── HamburgerToggle (sidebar 220px ↔ 70px)
│   └── ThemeToggle (FiSun / FiMoon)
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
│       │           ├── Chevron (expand/collapse)
│       │           ├── Icon (file type colored)
│       │           ├── Name (flex grow)
│       │           ├── Size (monospace)
│       │           └── Children (if expanded)
│       └── SidePanel
│           ├── Header ("PROPERTIES" + close btn)
│           ├── FileHeader (icon + name)
│           ├── DetailsSection (Name, Type, Size, Location, Modified, Created, Owner)
│           ├── TagsSection (HR, Policies, Document, +add)
│           ├── PermissionsSection (access level + manage)
│           └── ActionsSection (Download, Share, Copy Path)
```

---

## File Type Icons & Colors

Using React Icons (Feather + Font Awesome):

| Type | Icon | Color |
|------|------|-------|
| Folder | FiFolder | primary (#3B82F6) |
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

- **Keyboard Navigation**: Arrow keys, Enter, Tab focus management
- **Focus Management**: All interactive elements have visible focus ring (2px primary)
- **Color Contrast**: WCAG AA compliant
  - Dark mode: Light gray (#E5E7EB) on black meets AA
  - Light mode: Dark gray (#1F2937) on white meets AA
- **Screen Reader**: Proper semantic HTML, aria labels on buttons
- **Responsive**: Works on 1200px, 1024px, 768px breakpoints

---

## Performance Considerations

- **CSS Variables**: Single source of truth for colors, no re-renders needed on theme switch
- **No Gradients**: Solid colors are cheaper to render
- **Flex Layout**: GPU-accelerated, no layout thrashing
- **CSS Transitions**: Hardware accelerated animations
- **Minimal Re-renders**: React state focused, component separation proper

---

## Dark Mode Benefits

- **Reduce eye strain**: Especially for long work sessions (legal review)
- **Battery savings**: On OLED displays
- **Professional aesthetic**: Security-focused, serious tone
- **Accessibility**: Better for users with light sensitivity

---

## Light Mode Benefits

- **High contrast**: Better readability in bright environments
- **Accessibility**: Preference for some users, WCAG compliance
- **Professional variation**: Different context, same professional aesthetic
- **Theme flexibility**: User choice improves satisfaction

---

## File Type Icons Strategy

Simple emoji + text approach:
- Folder
- Document (.pdf, .docx, .txt)
- Spreadsheet (.xlsx, .csv)
- Image (.png, .jpg, .svg)
- Config (.yaml, .json, .config)
- Archive (.zip, .rar)
- Video (.mp4, .mov)
- Audio (.mp3, .wav)

---

## CSS Custom Properties (Reusable Color System)

All colors are defined as CSS custom properties in `:root` for easy reuse across the project:

```css
:root {
  --color-bg: #0B0F17;
  --color-surface: #111827;
  --color-surface-2: #1F2937;
  --color-border: #2D3748;
  --color-primary: #3B82F6;
  --color-text: #E5E7EB;
  --color-text-secondary: #9CA3AF;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
}
```

### Usage
Use `var(--color-*)` in any CSS file to reference these colors consistently.

Example:
```css
.component {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

### Tailwind Integration
Colors are also available in Tailwind CSS as `vault.*`:
```jsx
<div className="bg-vault-bg text-vault-text border border-vault-border">
  Content
</div>
```

---
