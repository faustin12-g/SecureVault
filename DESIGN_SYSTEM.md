# SecureVault Dashboard - Design System

## Brand Identity
**Theme**: Dark Mode, Cyber-Secure, Precise, Fast
**Target Users**: Lawyers, bankers, power users who need fast navigation

---

## Color Palette

### Primary Colors
- **Background**: `#0B0F17` - Deep dark background
- **Surface**: `#111827` - Primary surface for cards/panels
- **Surface-2**: `#1F2937` - Secondary surface for nested elements
- **Border**: `#2D3748` - Border and divider color
- **Primary**: `#3B82F6` - Primary action and accent (Blue)
- **Text**: `#E5E7EB` - Primary text color (Light gray)
- **Text Secondary**: `#9CA3AF` - Secondary/muted text

### Semantic Colors
- **Success**: `#10B981` - Green for active/open folders
- **Warning**: `#F59E0B` - Amber for large files
- **Error**: `#EF4444` - Red for restricted files
- **Focus**: `#00D9FF` - Cyan highlight for keyboard focus

---

## Typography Scale

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| **Headline 1** | 28px | 700 (bold) | Main title |
| **Headline 2** | 24px | 700 | Section titles |
| **Body Large** | 16px | 500 (medium) | File/folder names |
| **Body Regular** | 14px | 400 (normal) | Description text |
| **Body Small** | 12px | 400 | Metadata, sizes |
| **Mono** | 12px | 400 | File types, code |

**Font Family**: System stack for performance
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

---

## Spacing Grid
Base unit: **4px**

| Scale | Pixels | Usage |
|-------|--------|-------|
| xs | 4px | Micro spacing |
| sm | 8px | Padding within items |
| md | 12px | Component padding |
| lg | 16px | Section spacing |
| xl | 24px | Large spacing |
| 2xl | 32px | Major section spacing |

---

## Component States

### File/Folder Item States
1. **Idle**: Normal appearance, subtle border
2. **Hover**: Background slight highlight, opacity increase
3. **Focus (Keyboard)**: Cyan border, glow effect
4. **Selected**: Cyan background, bright text
5. **Expanded** (folder): Icon rotates, children visible

### Interactive Elements
- **Hover**: Background opacity +5%, cursor pointer
- **Focus**: 2px cyan border, glow shadow
- **Active**: Cyan background with full opacity
- **Disabled**: Reduced opacity (50%), no cursor

---

## Layout Grid

### Main Layout
- **Sidebar/Explorer**: 100% viewport height, scrollable
- **Properties Panel**: Fixed right side (300px), full height
- **Responsive**: Stack vertically on mobile

### File Item
- **Height**: 32px (comfortable touch target)
- **Padding**: 8px left indent per level, 8px vertical padding
- **Icon**: 16px, left margin 8px
- **Text**: Flex grow, max-width handling

---

## Border & Shadow

### Borders
- **Subtle Divider**: `1px solid rgba(0, 217, 255, 0.1)` - Barely visible
- **Focus Ring**: `2px solid #00D9FF` - High contrast
- **Interactive Border**: `1px solid rgba(0, 217, 255, 0.3)` - On hover

### Shadows
- **No shadow** - Keep it flat and fast
- **Glow on Focus**: `0 0 12px rgba(59, 130, 246, 0.4)` - Subtle blue glow

---

## Animation & Transitions

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Hover state | Background fade | 150ms | ease-in-out |
| Folder expand | Icon rotate + children fade-in | 200ms | ease-out |
| Selection | Background + text transition | 100ms | ease-in |
| Focus glow | Subtle fade | 100ms | ease-in |

**Principle**: Fast, snappy, no delay. Max 200ms for any animation.

---

## Component Hierarchy

```
App
├── FileExplorer (main tree, left side)
│   └── FileNode (recursive)
│       ├── FileIcon (folder/file icon)
│       ├── FileName (text)
│       └── Children (recursive FileNodes)
└── SidePanel (properties, right side)
    ├── PanelHeader
    ├── FileMetadata (Name, Type, Size, Path)
    └── FileActions (optional: download, etc.)
```

---

## Accessibility

- **Keyboard Navigation**: Arrow keys, Enter, focus indicators
- **Focus Management**: Cyan glow ring on all interactive elements
- **Color Contrast**: WCAG AA minimum (cyan #00D9FF on #0A0E27)
- **Screen Reader**: Proper aria labels, semantic HTML

---

## Performance Notes

- Use `position: fixed` for side panel (GPU accelerated)
- Virtual scrolling for 1000+ items (future enhancement)
- CSS transitions instead of JS animations
- Lazy load deeply nested folders (collapse by default)

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
