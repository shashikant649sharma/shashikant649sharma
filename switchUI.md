# Dual-Mode Portfolio & Blog - Switch UI Documentation

## 📋 Overview

This document outlines the switching mechanism and UI system for a dual-mode website that seamlessly transitions between a **Professional Portfolio** mode and a **Personal Blog** mode.

---

## 🎨 Design Philosophy

### Two Contrasting Identities — "Terminal" vs "Journal"

**Portfolio Mode — "Terminal" (EXISTS in `newSite/`)**
- Near-black background (`#050505`) with acid-yellow accent (`#ffeb3b`)
- Monospace body font (Space Mono) + geometric heading font (Space Grotesk)
- UPPERCASE headings, tight letter-spacing, technical labels
- Grid-based project cards with bordered tag chips
- 1px solid borders, sharp 6px radius
- Cold, precise, engineered — "I build systems"

**Blog Mode — "Journal" (TO BE BUILT)**
- Warm parchment background (`#faf7f2`) with burnt amber accent (`#b45309`)
- Humanist sans body (Source Sans 3) + classic serif headings (Libre Baskerville)
- Sentence case headings, generous spacing, editorial feel
- Linear single-column reading layout (680px max)
- Soft shadows instead of borders, rounded 12px radius
- Warm, personal, storytelling — "Let me tell you about what I build"

> **Key principle:** Same content through two lenses. The portfolio says "hire me" — the blog says "get to know me." Shared DNA (Space Mono for metadata, amber from the same hue family as yellow) keeps them feeling like one person.

---

## 🔄 Switching Methods

### 1. Navigation Buttons (Top Left)
**Purpose:** Primary, explicit navigation control

**Features:**
- Two buttons: "Portfolio" | "Blog"
- Active state indicator
- Always visible at top of page
- Desktop and mobile friendly

**User Experience:**
- Most intuitive method
- Clear labels
- Immediate visual feedback
- No learning curve required

**Technical Implementation:**
```javascript
// Direct mode selection
portfolioBtn.addEventListener('click', () => {
    if (!isPortfolioMode) toggleMode();
});

blogBtn.addEventListener('click', () => {
    if (isPortfolioMode) toggleMode();
});
```

**Design Specs:**
- Position: `fixed, top: 30px, left: 30px`
- Button size: `padding: 14px 32px`
- Border radius: `50px` (pill shape)
- Active state: Gradient background + border
- Inactive state: Transparent background + border

---

### 2. Floating Action Button (Bottom Right)
**Purpose:** Quick-access toggle for power users

**Features:**
- Circular button with 🔄 icon
- Pulse animation draws attention
- Rotates 180° on interaction
- Follows user as they scroll

**User Experience:**
- Always accessible
- Visual delight with animations
- Quick toggle without scrolling up
- Mobile-thumb friendly position

**Technical Implementation:**
```javascript
// Toggle between modes
fabSwitch.addEventListener('click', () => {
    toggleMode();
});
```

**Design Specs:**
- Position: `fixed, bottom: 40px, right: 40px`
- Size: `75px x 75px`
- Shape: Perfect circle (`border-radius: 50%`)
- Animation: Pulse effect (2.5s infinite)
- Hover: Scale 1.15 + rotate 180deg
- Shadow: Elevated with depth

**Animations:**
```css
@keyframes pulse {
    0%, 100% { 
        box-shadow: 0 6px 25px rgba(0,0,0,0.3);
        transform: scale(1);
    }
    50% { 
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        transform: scale(1.05);
    }
}
```

---

### 3. Shake Detection (Mobile/Touch Devices)
**Purpose:** Delightful Easter egg / gesture control

**Features:**
- Detects device shake motion
- Shows confirmation notification
- Mobile/tablet only
- iOS 13+ permission handling

**User Experience:**
- Fun, playful interaction
- Natural mobile gesture
- Haptic-like feedback
- Surprise and delight factor

**Technical Implementation:**
```javascript
// DeviceMotion API
window.addEventListener('devicemotion', (e) => {
    const acceleration = e.accelerationIncludingGravity;
    const currentTime = new Date().getTime();
    
    if (lastX !== undefined && (currentTime - lastShakeTime) > shakeTimeout) {
        const deltaX = Math.abs(acceleration.x - lastX);
        const deltaY = Math.abs(acceleration.y - lastY);
        const deltaZ = Math.abs(acceleration.z - lastZ);
        
        if (deltaX + deltaY + deltaZ > shakeThreshold) {
            lastShakeTime = currentTime;
            toggleMode(true); // Show notification
        }
    }
    
    lastX = acceleration.x;
    lastY = acceleration.y;
    lastZ = acceleration.z;
});
```

**Design Specs:**
- Threshold: `20` (sensitivity)
- Timeout: `1000ms` (prevents rapid triggers)
- Notification: Center popup, 1 second display
- Permission: iOS 13+ requires user consent

**Notification:**
- Position: Center screen
- Background: `rgba(0, 0, 0, 0.8)` with blur
- Text: "📱 Mode Switched!"
- Duration: 1 second
- Animation: Scale from 0 to 1

---

## 🎯 Mode Toggle Logic

### Core Toggle Function
```javascript
function toggleMode(showNotification = false) {
    isPortfolioMode = !isPortfolioMode;
    
    if (isPortfolioMode) {
        body.classList.remove('blog-mode');
        body.classList.add('portfolio-mode');
        portfolioBtn.classList.add('active');
        blogBtn.classList.remove('active');
    } else {
        body.classList.remove('portfolio-mode');
        body.classList.add('blog-mode');
        portfolioBtn.classList.remove('active');
        blogBtn.classList.add('active');
    }

    if (showNotification) {
        // Show shake notification
    }
}
```

### State Management
- Single boolean: `isPortfolioMode`
- CSS class toggling: `.portfolio-mode` / `.blog-mode`
- All UI elements respond to class changes
- No page reload required

---

## 🎨 Visual Design System

> The two modes are designed as **maximum contrast pairs** — every design decision in blog mode is the opposite of portfolio mode. Same person, opposite energy.

---

### Portfolio Mode — "TERMINAL" (Existing, already built)

**Source of truth:** `newSite/style.css` `:root` variables

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#050505` | Near-black background |
| `--bg-elevated` | `#0a0a0a` | Card/surface background |
| `--bg-hover` | `#0f0f0f` | Hover state |
| `--fg` | `#ffffff` | Primary text |
| `--grey` | `#888888` | Secondary text |
| `--grey-dim` | `#555555` | Tertiary text |
| `--border` | `#222222` | Dividers, card borders |
| `--acid` | `#ffeb3b` | Primary accent (yellow) |
| `--acid-glow` | `rgba(255,235,59,0.15)` | Accent glow/bg tint |
| `--alert` | `#ff3333` | CTA / contact red |

**Typography:**
- Headings: `Space Grotesk` (geometric sans) — weights 300, 500, 700
- Body: `Space Mono` (monospace) — weights 400, 700
- Style: UPPERCASE headings, tight letter-spacing (-2px), technical labels
- Line-height: 1.7 body, 0.95 hero heading

**Visual Traits:**
- Hard edges (6px radius max)
- 1px solid borders everywhere
- Grid-based card layouts
- Minimal color — white text on black, yellow pops
- Dashed spinning circle around hero image
- Section counters in pill badges
- Timeline with vertical line + dots
- Tags as bordered chips
- Glows on hover (box-shadow with accent)
- Monospaced technical labels (`ESP32 // LOW POWER // WIRELESS`)

**Emotional tone:** Cold → Precise → Engineered → "I build systems"

---

### Blog Mode — "JOURNAL" (New — to be built)

**Design philosophy:** If portfolio is a terminal, blog is a notebook. Warm, readable, personal, editorial.

#### Color Palette

| Token | Value | Swatch | Role |
|-------|-------|--------|------|
| `--bg` | `#faf7f2` | warm parchment | Page background |
| `--bg-elevated` | `#ffffff` | pure white | Card/surface |
| `--bg-hover` | `#f3efe8` | warm hover | Hover state |
| `--fg` | `#1c1917` | warm black | Primary text |
| `--grey` | `#78716c` | stone-500 | Secondary text |
| `--grey-dim` | `#a8a29e` | stone-400 | Tertiary/muted text |
| `--border` | `#e7e5e4` | stone-200 | Dividers, card borders |
| `--accent` | `#b45309` | amber-700 | Primary accent (burnt amber) |
| `--accent-glow` | `rgba(180,83,9,0.08)` | — | Accent tint/hover bg |
| `--accent-light` | `#f59e0b` | amber-500 | Links, highlights |
| `--alert` | `#dc2626` | red-600 | Warnings/CTA |

**Why burnt amber?** It's the warm complement of acid-yellow — same hue family pushed to warmth. Portfolio screams with electric yellow on black; blog whispers with amber on parchment. They share DNA but feel completely different.

#### Typography

| Role | Font | Source | Why |
|------|------|--------|-----|
| Headings | `Libre Baskerville` | Google Fonts | Classic serif, editorial authority, sharp contrast to geometric Space Grotesk |
| Body | `Source Sans 3` | Google Fonts | Humanist sans — readable at length, warm, not cold like monospace |
| Code/Meta | `Space Mono` | (shared) | Same mono for dates/tags keeps a thread between modes |

```css
/* Blog mode typography */
--font-head: 'Libre Baskerville', Georgia, serif;
--font-body: 'Source Sans 3', 'Segoe UI', sans-serif;
--font-mono: 'Space Mono', monospace;  /* shared with portfolio */
```

**Style rules:**
- Headings: Sentence case (not UPPERCASE), generous letter-spacing (0 to +0.5px)
- Body: 18px base, line-height 1.85 (optimized for long-form reading)
- Max content width: 680px (reading column), not full 1100px
- Paragraphs: margin-bottom 1.5em, comfortable spacing

#### Visual Traits (contrast map)

| Element | Portfolio ("Terminal") | Blog ("Journal") |
|---------|----------------------|-------------------|
| Background | Near-black `#050505` | Warm parchment `#faf7f2` |
| Text color | White on dark | Dark on light |
| Accent | Electric yellow `#ffeb3b` | Burnt amber `#b45309` |
| Heading font | Geometric sans (Space Grotesk) | Classic serif (Libre Baskerville) |
| Body font | Monospace (Space Mono) | Humanist sans (Source Sans 3) |
| Heading case | UPPERCASE | Sentence case |
| Border radius | 6px (sharp) | 12px (soft) |
| Borders | 1px solid, visible | Subtle or none, soft shadows instead |
| Card depth | Border-outlined | Drop shadow (`0 1px 3px rgba(0,0,0,0.06)`) |
| Layout | Grid (multi-column cards) | Linear (single reading column) |
| Spacing | Tight, dense | Generous, breathing room |
| Hover effect | Yellow glow, translateY | Subtle shadow lift, warm bg tint |
| Hero | Big uppercase title + status badge | Casual intro paragraph, handwritten feel |
| Section headers | `DEPLOYMENT LOG` + pill counter | "Recent thoughts" — lowercase, friendly |
| Tags | Bordered chips `[ESP32]` | Inline colored text or simple pills |
| Images | Grayscale with color-on-hover | Full color, rounded corners (12px) |
| Animations | Sharp, fast (0.35s) | Gentle, slow (0.5s ease-out) |
| Scrollbar | Default | Styled thin, warm tones |
| Overall feel | "I build systems" | "Let me tell you a story" |

#### Card Design — Blog Posts

```
┌─────────────────────────────────────┐
│                                     │
│  Jan 15, 2026  ·  5 min read        │  ← mono font, amber color
│                                     │
│  Why I switched from Arduino        │  ← serif heading, sentence case
│  to bare-metal STM32                │
│                                     │
│  After two years of prototyping     │  ← sans body, generous line-height
│  with Arduino, I hit a wall with    │
│  power consumption on my tank       │
│  monitor project...                 │
│                                     │
│  IoT  ·  Firmware  ·  Opinion       │  ← tags as subtle text, dot-separated
│                                     │
└─────────────────────────────────────┘
  ↑ white bg, subtle shadow, 12px radius
```

vs. Portfolio project card:
```
┌─────────────────────────────────────┐
│▀▀▀ (3px yellow top border)          │
│                                     │
│  ESP32 // LOW POWER // WIRELESS     │  ← mono, yellow, uppercase
│                                     │
│  WIRELESS TANK MONITOR              │  ← sans heading, uppercase
│                                     │
│  A multi-node battery-powered       │  ← mono body
│  system monitoring underground...   │
│                                     │
│  ┌──────┐ ┌──────────┐ ┌────────┐  │
│  │ ESP32│ │Battery Opt│ │Arch.   │  │  ← bordered tag chips
│  └──────┘ └──────────┘ └────────┘  │
│                                     │
└─────────────────────────────────────┘
  ↑ dark bg (#0a0a0a), border-outlined
```

#### CSS Variable Override Strategy

The switch works by overriding CSS custom properties on `<body>`:

```css
/* Default = Portfolio mode (already exists) */
:root {
    --bg: #050505;
    --bg-elevated: #0a0a0a;
    --fg: #ffffff;
    --accent: #ffeb3b;
    --font-head: 'Space Grotesk', sans-serif;
    --font-body: 'Space Mono', monospace;
    --radius: 6px;
    /* ... etc */
}

/* Blog mode — override everything */
body.blog-mode {
    --bg: #faf7f2;
    --bg-elevated: #ffffff;
    --bg-hover: #f3efe8;
    --fg: #1c1917;
    --grey: #78716c;
    --grey-dim: #a8a29e;
    --border: #e7e5e4;
    --accent: #b45309;
    --accent-glow: rgba(180, 83, 9, 0.08);
    --alert: #dc2626;
    --font-head: 'Libre Baskerville', Georgia, serif;
    --font-body: 'Source Sans 3', 'Segoe UI', sans-serif;
    --radius: 12px;
}
```

This means **most existing CSS rules don't need to change** — they already reference variables. The switch just swaps the variable values. Only layout/structural differences (grid → linear column, card styles) need mode-specific CSS classes.

#### Google Fonts Load (both modes)

```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600;700&family=Space+Grotesk:wght@300;500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

---

## 📱 Responsive Behavior

### Desktop (>768px)
- All three switching methods active
- Full button sizes
- Complete animations
- Optimal spacing
- Blog mode: 680px reading column centered

### Mobile (<768px)
```css
Navigation Buttons:
- Smaller padding: 12px 24px
- Reduced font: 13px

FAB:
- Smaller size: 65px x 65px
- Closer to edge: bottom: 30px, right: 30px

Content:
- Reduced padding
- Single column layouts (both modes)
- Touch-optimized hit areas
- Blog reading column: full width with padding
```

---

## ⚡ Performance Considerations

### Transitions
- Duration: `0.6s` for mode switch
- Easing: `ease` for natural feel
- Hardware acceleration: `transform` and `opacity`
- No layout thrashing

### Animations
- CSS-based (GPU accelerated)
- Paused on hover for FAB pulse
- Minimal repaints
- 60fps smooth

### Content Strategy
- Opacity transitions (cheaper than display)
- Absolute positioning for hidden content
- `pointer-events: none` prevents interaction
- Single DOM, no loading

---

## 🔧 Technical Requirements

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Custom Properties (optional enhancement)
- DeviceMotion API (mobile only)

### Dependencies
- **None** - Pure HTML, CSS, JavaScript
- No frameworks required
- No build process needed
- Single file deployment

### File Structure
```
portfolio-blog-final.html
├── HTML Structure
│   ├── Navigation Buttons
│   ├── FAB Switch
│   ├── Shake Notification
│   ├── Portfolio Content
│   └── Blog Content
├── CSS Styles (embedded)
│   ├── Layout & Positioning
│   ├── Mode-specific Styles
│   ├── Animations
│   └── Responsive Rules
└── JavaScript (embedded)
    ├── Toggle Function
    ├── Event Listeners
    └── Shake Detection
```

---

## 🎯 User Experience Flow

### First Visit
1. Page loads in Portfolio mode (default)
2. User sees navigation buttons (primary CTA)
3. FAB pulses to draw attention
4. User explores one mode

### Mode Switching
1. User clicks any switching method
2. Smooth 0.6s transition begins
3. Background gradient crossfades
4. Content fades out/in
5. Navigation updates active state
6. User sees new mode

### Return Visits
- Could implement localStorage to remember preference
- Quick switching between modes
- No page reloads
- Instant gratification

---

## 🚀 Future Enhancement Ideas

### Additional Switch Methods (Optional)
- **Keyboard Shortcuts:** Press 'S' or Spacebar
- **URL Hash:** `#portfolio` or `#blog`
- **Swipe Gestures:** Left/right swipe on mobile
- **Voice Commands:** "Switch to blog mode"
- **Timer:** Auto-switch after X seconds
- **Scroll Detection:** Switch at certain scroll depth

### Advanced Features
- **Smooth Scroll:** Scroll to top on switch
- **Loading States:** Brief animation during transition
- **Analytics:** Track which mode is more popular
- **Preferences:** Remember user's last mode
- **Share Links:** Direct link to specific mode

---

## 📊 Design Rationale

### Why Three Methods?

**1. Navigation Buttons (Explicit)**
- For first-time users
- Clear and obvious
- No guessing required
- Professional appearance

**2. FAB (Convenience)**
- For returning users
- Always accessible
- Quick toggle
- Adds visual interest

**3. Shake Detection (Delight)**
- For mobile users
- Fun discovery
- Natural gesture
- Memorable experience

### Method Distribution
- **Primary:** Navigation buttons (70% usage expected)
- **Secondary:** FAB (25% usage expected)
- **Tertiary:** Shake (5% usage expected)

---

## ✅ Quality Checklist

### Functionality
- [ ] All three methods work independently
- [ ] Smooth transitions between modes
- [ ] No layout shifts or jumps
- [ ] Active state updates correctly
- [ ] Mobile shake detection works
- [ ] iOS permission handling works

### Design
- [ ] Contrasting color schemes
- [ ] Readable typography
- [ ] Proper spacing and alignment
- [ ] Consistent border radius
- [ ] Appropriate shadows and depth
- [ ] Hover states on all interactive elements

### Performance
- [ ] 60fps animations
- [ ] Fast page load (<2s)
- [ ] No jank during transitions
- [ ] Minimal DOM manipulation
- [ ] Optimized CSS selectors

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Sufficient color contrast
- [ ] Touch targets >44px
- [ ] Semantic HTML structure

### Responsive
- [ ] Works on mobile (320px+)
- [ ] Works on tablet (768px+)
- [ ] Works on desktop (1024px+)
- [ ] Touch and mouse input
- [ ] Portrait and landscape

---

## 🎨 Customization Guide

### Colors
To change the color scheme, update these CSS variables:

**Portfolio Mode:**
```css
body.portfolio-mode {
    background: [YOUR_GRADIENT];
}
.nav-btn.active {
    background: [YOUR_ACCENT_COLOR];
}
.tech-tag {
    background: [YOUR_TAG_COLOR];
}
```

**Blog Mode:**
```css
body.blog-mode {
    background: [YOUR_GRADIENT];
}
.blog-post-date {
    color: [YOUR_ACCENT_COLOR];
}
.read-more {
    border-color: [YOUR_ACCENT_COLOR];
}
```

### Typography
```css
body {
    font-family: [YOUR_FONT_FAMILY];
}
.portfolio-header h1,
.blog-header h1 {
    font-size: [YOUR_SIZE];
    font-weight: [YOUR_WEIGHT];
}
```

### Layout
```css
.portfolio-grid {
    grid-template-columns: repeat(auto-fit, minmax([YOUR_MIN], 1fr));
    gap: [YOUR_GAP];
}
```

---

## 📝 Code Comments Guide

Key areas to document in the code:

1. **Toggle Function** - Core switching logic
2. **Event Listeners** - How each method triggers
3. **Shake Detection** - Threshold and timing values
4. **CSS Transitions** - Duration and easing choices
5. **Responsive Breakpoints** - Why 768px chosen
6. **Animation Keyframes** - Purpose of each animation

---

## 🐛 Known Issues & Solutions

### Issue: Shake too sensitive on some devices
**Solution:** Adjust `shakeThreshold` value (increase = less sensitive)

### Issue: FAB blocks content on small screens
**Solution:** Reduce size or adjust positioning in mobile breakpoint

### Issue: iOS requires permission prompt
**Solution:** Already handled with requestPermission() on first click

### Issue: Transition flicker in Safari
**Solution:** Add `-webkit-backface-visibility: hidden`

---

## 📚 Resources & References

### APIs Used
- **DeviceMotion API:** For shake detection
- **classList API:** For mode toggling
- **CSS Transitions:** For smooth animations

### Design Inspiration
- Material Design (FAB concept)
- iOS App Switcher (gesture control)
- Modern portfolio websites (dark themes)
- Medium/Substack (blog layouts)

---

## 📄 License & Credits

This is a concept/template for educational purposes.
Feel free to customize and adapt for your projects.

**Created:** 2024
**Version:** 1.0
**Status:** Ready for customization

---

## 🎓 Learning Outcomes

Building this project teaches:
- CSS Grid & Flexbox layouts
- CSS transitions and animations
- JavaScript event handling
- Mobile device APIs (DeviceMotion)
- Responsive design principles
- State management without frameworks
- User experience design
- Progressive enhancement

---

## 🔮 Next Steps

1. **Finalize Design Language** - Choose final colors, fonts, spacing
2. **Add Real Content** - Replace placeholder text and projects
3. **Optimize Images** - Add project screenshots and blog images
4. **Test Thoroughly** - Cross-browser and cross-device testing
5. **Deploy** - Host on GitHub Pages, Netlify, or Vercel
6. **Gather Feedback** - User testing and iterations
7. **Add Analytics** - Track user behavior and preferences
8. **SEO Optimization** - Meta tags, semantic HTML, performance

---

## 📞 Support & Maintenance

### Regular Updates Needed
- Content updates (projects, blog posts)
- Browser compatibility checks
- Performance monitoring
- User feedback incorporation

### Potential Improvements
- Add more projects/posts
- Implement search functionality
- Add filtering/categorization
- Include contact form
- Integrate CMS for easy updates

---

**End of Documentation**

*Last Updated: [Current Date]*
*Version: 1.0*
*Status: Ready for Design Finalization*
