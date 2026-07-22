# Design System

## 1. Theme / Tone

- **Style**: Minimal, clean, YouTube-inspired but not a clone
- **Mode**: Light + Dark (user-toggleable, saved in localStorage)
- **Tone**: Professional, focused on content, not flashy

## 2. Color Palette

### Light Mode

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary | Blue | `#3B82F6` | Buttons, links, active states |
| Secondary | Gray | `#6B7280` | Muted text, borders |
| Background | White | `#FFFFFF` | Page background |
| Surface | Light Gray | `#F3F4F6` | Cards, comment boxes |
| Text Primary | Dark | `#111827` | Headings, body text |
| Text Secondary | Medium Gray | `#6B7280` | Timestamps, metadata |
| Accent | Red | `#EF4444` | Likes, errors, notifications |
| Success | Green | `#10B981` | Success messages |
| Border | Light Border | `#E5E7EB` | Dividers, card borders |

### Dark Mode

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary | Blue | `#60A5FA` | Buttons, links, active states |
| Secondary | Gray | `#9CA3AF` | Muted text, borders |
| Background | Near Black | `#0F172A` | Page background |
| Surface | Dark Gray | `#1E293B` | Cards, comment boxes |
| Text Primary | White | `#F1F5F9` | Headings, body text |
| Text Secondary | Light Gray | `#94A3B8` | Timestamps, metadata |
| Accent | Red | `#F87171` | Likes, errors, notifications |
| Success | Green | `#34D399` | Success messages |
| Border | Dark Border | `#334155` | Dividers, card borders |

## 3. Typography

| Element | Font | Size | Weight | Usage |
|---|---|---|---|---|
| H1 | Inter | 28px | 700 | Page titles |
| H2 | Inter | 22px | 600 | Section headings |
| H3 | Inter | 18px | 600 | Card titles, comment author |
| Body | Inter | 14px | 400 | Comment text, descriptions |
| Caption | Inter | 12px | 400 | Timestamps, metadata |
| Button | Inter | 14px | 500 | All buttons |

**Font Family**: `Inter` (Google Fonts) — clean, readable, modern

## 4. Spacing & Layout

| Element | Value |
|---|---|
| Page max-width | `1200px` |
| Card padding | `16px` |
| Section gap | `24px` |
| Comment indent | `24px` per thread level |
| Border radius (cards) | `8px` |
| Border radius (buttons) | `6px` |

## 5. Components

| Component | Style |
|---|---|
| Primary Button | Blue bg, white text, hover darken |
| Secondary Button | Gray border, transparent bg |
| Comment Box | Surface bg, rounded, subtle border |
| Video Card | Surface bg, thumbnail top, text below |
| Input Fields | Border, rounded, focus ring (primary color) |
| Theme Toggle | Sun/Moon icon, top-right corner |
