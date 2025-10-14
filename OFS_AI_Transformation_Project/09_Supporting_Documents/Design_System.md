# Design System
## OFS AI-Enhanced Platform UI/UX Guidelines

**Version:** 1.0.0
**Last Updated:** January 2025
**Design Team:** OFS Digital Experience

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Visual Identity](#visual-identity)
3. [Component Library](#component-library)
4. [Typography](#typography)
5. [Color System](#color-system)
6. [Spacing & Layout](#spacing--layout)
7. [Iconography](#iconography)
8. [Motion & Animation](#motion--animation)
9. [Responsive Design](#responsive-design)
10. [Accessibility](#accessibility)

---

## Design Principles

### 1. **Conversational & Approachable**

The AI experience should feel like collaborating with a knowledgeable colleague, not interrogating a machine.

**Guiding Questions:**
- Does this feel human?
- Would a designer/facilities manager understand this immediately?
- Are we asking questions naturally?

**Example:**
```
❌ Bad: "Input workspace parameters: [employee_count, area_sqft, workstation_density]"
✅ Good: "Let's start with the basics—how many employees will be using this space?"
```

---

### 2. **Progressive Disclosure**

Show complexity only when needed. Start simple, reveal depth gradually.

**Implementation:**
- Default views show essentials
- "Advanced" or "See details" reveals more
- Smart defaults reduce cognitive load
- Tooltips explain specialized terms

**Example:**
```
Default view:
- Total Budget: $600,000
- 245 items
- [View detailed breakdown →]

Expanded view:
- Workstations: $300,000 (120 items)
- Seating: $180,000 (180 items)
- Tables: $85,000 (30 items)
- Storage: $35,000 (15 items)
```

---

### 3. **Transparent AI**

Users should understand *why* the AI makes recommendations and feel in control.

**Requirements:**
- Show confidence scores for AI decisions
- Explain reasoning in plain language
- Always provide alternatives
- Allow manual override without friction
- Track and show learning from feedback

**Example:**
```
Recommended: Executive Task Chair ($495)

Why this chair?
✓ Matches your "modern" style preference
✓ BIFMA Level 3 certified (your sustainability goal)
✓ 14-day lead time (meets your timeline)
✓ Popular choice for similar projects (87% satisfaction)

Confidence: 91%

[Not quite right? View 12 alternatives →]
```

---

### 4. **Speed & Efficiency**

Every interaction should feel instant. Minimize clicks, maximize automation.

**Performance Targets:**
- Page loads: <2 seconds
- AI responses: <3 seconds
- Search results: <500ms
- 3D renders: <10 seconds
- Auto-save: Every 2 seconds

**Efficiency Patterns:**
- Keyboard shortcuts for power users
- Bulk actions
- Smart defaults
- AI auto-complete
- One-click approvals

---

### 5. **Visual > Text**

Show, don't tell. Use visuals to communicate faster.

**Visual Hierarchy:**
1. 3D renders and floor plans (primary focus)
2. Charts and data visualizations
3. Icon badges (sustainability, certifications)
4. Text descriptions (supporting details)

**Examples:**
- Sustainability score: Show as visual gauge, not just "84/100"
- Budget: Progress bar with color coding (green = under, yellow = on target, red = over)
- Product comparison: Side-by-side images, not tables
- Space utilization: Heat map, not numbers

---

## Visual Identity

### Brand Colors

```css
/* Primary Colors */
--color-primary-900: #003D5C;    /* Deep OFS Navy */
--color-primary-800: #005580;
--color-primary-700: #006DA3;
--color-primary-600: #0085C7;    /* OFS Blue */
--color-primary-500: #009EEB;
--color-primary-400: #33B1EF;
--color-primary-300: #66C4F3;
--color-primary-200: #99D7F7;
--color-primary-100: #CCEBFB;
--color-primary-50: #E5F5FD;

/* Secondary Colors */
--color-secondary-900: #2D3436;  /* Charcoal */
--color-secondary-800: #4A4A4A;
--color-secondary-700: #696969;
--color-secondary-600: #878787;
--color-secondary-500: #A5A5A5;
--color-secondary-400: #BABABA;
--color-secondary-300: #D0D0D0;
--color-secondary-200: #E5E5E5;
--color-secondary-100: #F5F5F5;
--color-secondary-50: #FAFAFA;

/* Accent Colors */
--color-accent-orange: #FF6B35;  /* Energy & Innovation */
--color-accent-green: #00C896;   /* Sustainability */
--color-accent-purple: #7B68EE;  /* AI/Tech */

/* Semantic Colors */
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;
--color-info: #3B82F6;
```

### Typography

**Primary Font: Inter**
- Clean, modern, highly legible
- Excellent for UI and data display
- Variable font for performance

**Monospace Font: JetBrains Mono**
- Code snippets, SKUs, IDs
- Technical specifications

```css
/* Font Stack */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Monaco, monospace;

/* Font Sizes */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### Type Scale Examples

```
Heading 1 (Page Titles)
Font: Inter Bold, 36px/44px, #2D3436
Example: "Corporate HQ Renovation"

Heading 2 (Section Titles)
Font: Inter Semibold, 24px/32px, #2D3436
Example: "Recommended Products"

Heading 3 (Subsections)
Font: Inter Semibold, 20px/28px, #4A4A4A
Example: "Workstations"

Body Large (Primary Content)
Font: Inter Regular, 18px/28px, #4A4A4A
Example: Main descriptions, AI responses

Body (Default)
Font: Inter Regular, 16px/24px, #696969
Example: General content, labels

Body Small (Supporting)
Font: Inter Regular, 14px/20px, #878787
Example: Metadata, timestamps, helper text

Caption
Font: Inter Medium, 12px/16px, #A5A5A5
Example: Fine print, table headers, badges
```

---

## Component Library

### Buttons

```tsx
// Primary Button - Main actions
<Button variant="primary" size="lg">
  Generate Recommendations
</Button>

// Styles:
// - Background: Primary-600 (#0085C7)
// - Text: White, Inter Semibold 16px
// - Padding: 12px 24px
// - Border radius: 8px
// - Hover: Primary-700 (#006DA3)
// - Active: Primary-800 (#005580)
// - Shadow: 0 1px 2px rgba(0,0,0,0.05)

// Secondary Button - Alternative actions
<Button variant="secondary" size="md">
  View Alternatives
</Button>

// Styles:
// - Background: White
// - Border: 1px solid Secondary-300 (#D0D0D0)
// - Text: Secondary-700 (#696969), Inter Medium 14px
// - Padding: 10px 20px
// - Hover: Background Secondary-50 (#FAFAFA)

// Ghost Button - Subtle actions
<Button variant="ghost" size="sm">
  Cancel
</Button>

// Destructive Button - Dangerous actions
<Button variant="destructive" size="md">
  Delete Project
</Button>

// Icon Button
<Button variant="icon" icon={<ChevronDownIcon />} />

// Button with loading state
<Button variant="primary" loading={true}>
  Generating...
</Button>
```

### Input Fields

```tsx
// Text Input
<Input
  label="Project Name"
  placeholder="Enter project name"
  helpText="This will help you identify this project"
  error={errors.name}
/>

// Styles:
// - Height: 44px
// - Border: 1px solid Secondary-300
// - Border radius: 6px
// - Focus: 2px ring Primary-600
// - Error: Border Error-500, ring Error-200
// - Padding: 12px 14px
// - Font: Inter Regular 16px

// Text Area
<TextArea
  label="Description"
  rows={4}
  placeholder="Describe your project requirements..."
/>

// Select Dropdown
<Select
  label="Space Type"
  options={[
    { value: 'open_office', label: 'Open Office' },
    { value: 'private_offices', label: 'Private Offices' },
    { value: 'hybrid', label: 'Hybrid Workspace' }
  ]}
/>

// Number Input with Units
<NumberInput
  label="Total Area"
  unit="sq ft"
  min={0}
  step={100}
/>

// Search Input with icon
<SearchInput
  placeholder="Search products..."
  onSearch={handleSearch}
/>
```

### Cards

```tsx
// Product Card
<ProductCard>
  <ProductCard.Image src="..." alt="..." />
  <ProductCard.Badge type="sustainability" score={87} />
  <ProductCard.Title>Executive Task Chair</ProductCard.Title>
  <ProductCard.Meta>
    <span>SKU: OFS-CHAIR-001</span>
    <span>$495</span>
  </ProductCard.Meta>
  <ProductCard.Actions>
    <Button variant="secondary" size="sm">View Details</Button>
    <IconButton icon={<HeartIcon />} />
  </ProductCard.Actions>
</ProductCard>

// Styles:
// - Background: White
// - Border: 1px solid Secondary-200
// - Border radius: 12px
// - Padding: 16px
// - Shadow: 0 1px 3px rgba(0,0,0,0.1)
// - Hover: Subtle lift, shadow increases

// Info Card - Key metrics
<InfoCard>
  <InfoCard.Icon><DollarIcon /></InfoCard.Icon>
  <InfoCard.Label>Total Budget</InfoCard.Label>
  <InfoCard.Value>$600,000</InfoCard.Value>
  <InfoCard.Change>+5% from initial</InfoCard.Change>
</InfoCard>

// Recommendation Card - AI suggestions
<RecommendationCard confidence={0.91}>
  <RecommendationCard.Header>
    <Badge>AI Recommended</Badge>
    <ConfidenceScore score={91} />
  </RecommendationCard.Header>
  <RecommendationCard.Content>
    {/* Product details */}
  </RecommendationCard.Content>
  <RecommendationCard.Reasoning>
    Why we recommend this: Matches your style preferences...
  </RecommendationCard.Reasoning>
  <RecommendationCard.Actions>
    <Button variant="primary">Accept</Button>
    <Button variant="secondary">See Alternatives</Button>
  </RecommendationCard.Actions>
</RecommendationCard>
```

### Badges & Tags

```tsx
// Status Badge
<Badge variant="success">Completed</Badge>
<Badge variant="warning">In Progress</Badge>
<Badge variant="error">Rejected</Badge>
<Badge variant="info">Draft</Badge>

// Certification Badge
<CertificationBadge type="BIFMA_LEVEL_3" />
<CertificationBadge type="GREENGUARD_GOLD" />
<CertificationBadge type="FSC_CERTIFIED" />

// Score Badge
<ScoreBadge
  score={87}
  label="Sustainability"
  color="green"
/>

// Styles:
// - Pill-shaped (border-radius: 9999px)
// - Padding: 4px 12px
// - Font: Inter Medium 12px
// - Success: Green-50 background, Green-700 text
// - Warning: Orange-50 background, Orange-700 text
// - Error: Red-50 background, Red-700 text
```

### Data Visualization

```tsx
// Progress Bar
<ProgressBar
  value={65}
  max={100}
  label="Project Progress"
  showPercentage={true}
/>

// Styles:
// - Height: 8px
// - Background: Secondary-200
// - Fill: Primary-600
// - Border radius: 4px
// - Animated fill transition

// Sustainability Gauge
<SustainabilityGauge
  score={87}
  grade="A-"
  size="lg"
/>

// Budget Comparison Chart
<BudgetChart
  scenarios={[
    { name: 'Conservative', total: 575000 },
    { name: 'Balanced', total: 600000 },
    { name: 'Aggressive', total: 630000 }
  ]}
/>

// ROI Timeline
<ROITimeline
  data={[
    { year: 1, roi: 28.2M },
    { year: 2, roi: 53.5M },
    { year: 3, roi: 77M }
  ]}
/>
```

### Modals & Dialogs

```tsx
// Standard Modal
<Modal open={isOpen} onClose={handleClose}>
  <Modal.Header>
    <Modal.Title>Confirm Action</Modal.Title>
    <Modal.Close />
  </Modal.Header>
  <Modal.Body>
    Are you sure you want to delete this project?
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="destructive" onClick={handleDelete}>
      Delete Project
    </Button>
  </Modal.Footer>
</Modal>

// Styles:
// - Backdrop: rgba(0,0,0,0.5)
// - Container: White background, 600px max-width
// - Border radius: 16px
// - Shadow: 0 20px 25px rgba(0,0,0,0.15)
// - Animation: Fade in + scale up

// Slide-over Panel (for details, forms)
<SlideOver open={isOpen} side="right">
  <SlideOver.Header>
    <SlideOver.Title>Product Details</SlideOver.Title>
  </SlideOver.Header>
  <SlideOver.Body>
    {/* Content */}
  </SlideOver.Body>
</SlideOver>

// Confirmation Dialog
<ConfirmDialog
  title="Approve Recommendations?"
  message="This will lock in your selections and proceed to ordering."
  confirmLabel="Approve"
  confirmVariant="primary"
  onConfirm={handleApprove}
  onCancel={handleCancel}
/>
```

### Navigation

```tsx
// Top Navigation Bar
<Navbar>
  <Navbar.Brand>
    <Logo />
  </Navbar.Brand>
  <Navbar.Menu>
    <Navbar.Item href="/projects">Projects</Navbar.Item>
    <Navbar.Item href="/products">Products</Navbar.Item>
    <Navbar.Item href="/analytics">Analytics</Navbar.Item>
  </Navbar.Menu>
  <Navbar.Actions>
    <NotificationBell />
    <UserMenu />
  </Navbar.Actions>
</Navbar>

// Styles:
// - Height: 64px
// - Background: White
// - Border bottom: 1px solid Secondary-200
// - Sticky positioning
// - Shadow on scroll: 0 1px 3px rgba(0,0,0,0.1)

// Sidebar Navigation
<Sidebar>
  <Sidebar.Section label="Project">
    <Sidebar.Item icon={<HomeIcon />} active={true}>
      Overview
    </Sidebar.Item>
    <Sidebar.Item icon={<PlanIcon />}>
      Floor Plan
    </Sidebar.Item>
    <Sidebar.Item icon={<ProductIcon />}>
      Products
    </Sidebar.Item>
  </Sidebar.Section>
</Sidebar>

// Breadcrumbs
<Breadcrumbs>
  <Breadcrumb href="/projects">Projects</Breadcrumb>
  <Breadcrumb href="/projects/123">Corporate HQ</Breadcrumb>
  <Breadcrumb>Recommendations</Breadcrumb>
</Breadcrumbs>
```

---

## Color System

### Semantic Color Usage

| Use Case | Color Token | Value | Usage |
|----------|-------------|-------|-------|
| **Success** | `--color-success` | #10B981 | Confirmations, completed states |
| **Warning** | `--color-warning` | #F59E0B | Alerts, cautions |
| **Error** | `--color-error` | #EF4444 | Errors, destructive actions |
| **Info** | `--color-info` | #3B82F6 | Informational messages |
| **Sustainability** | `--color-accent-green` | #00C896 | Eco-friendly, green features |
| **AI/Tech** | `--color-accent-purple` | #7B68EE | AI-powered features |
| **Premium** | `--color-accent-orange` | #FF6B35 | Premium options, highlights |

### Color Accessibility

All color combinations meet WCAG 2.1 AA standards (4.5:1 contrast ratio minimum).

```css
/* Accessible Pairings */
✅ Primary-600 text on White background (7.8:1)
✅ Secondary-700 text on White background (5.2:1)
✅ White text on Primary-600 background (7.8:1)
✅ White text on Secondary-900 background (15.1:1)

/* Avoid */
❌ Primary-400 text on White background (2.8:1)
❌ Secondary-400 text on White background (3.1:1)
```

---

## Spacing & Layout

### Spacing Scale

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.5rem;    /* 24px */
--space-6: 2rem;      /* 32px */
--space-8: 3rem;      /* 48px */
--space-10: 4rem;     /* 64px */
--space-12: 6rem;     /* 96px */
--space-16: 8rem;     /* 128px */
```

### Grid System

**12-column grid with 24px gutters**

```css
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Breakpoints */
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Laptop */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Large desktop */
```

### Common Layouts

```tsx
// Two-column layout (Sidebar + Main)
<Layout>
  <Layout.Sidebar width={280}>
    {/* Navigation */}
  </Layout.Sidebar>
  <Layout.Main>
    {/* Main content */}
  </Layout.Main>
</Layout>

// Three-column layout (Sidebar + Main + Details)
<Layout>
  <Layout.Sidebar width={280} />
  <Layout.Main flex={1} />
  <Layout.Details width={360} />
</Layout>

// Full-width with container
<Layout>
  <Layout.Container maxWidth="1440px">
    {/* Centered content */}
  </Layout.Container>
</Layout>
```

---

## Iconography

### Icon System

**Library:** Heroicons v2 (primary), Custom OFS icons (specialized)

**Sizes:**
- `xs`: 12px
- `sm`: 16px
- `md`: 20px (default)
- `lg`: 24px
- `xl`: 32px

**Stroke Width:** 1.5px (consistent with Heroicons)

```tsx
// Usage
import { PlusIcon, TrashIcon, SparklesIcon } from '@heroicons/react/24/outline'

<PlusIcon className="w-5 h-5 text-primary-600" />

// AI-specific icons
<SparklesIcon className="w-4 h-4 text-purple-600" />  // AI-powered feature
<LightBulbIcon className="w-4 h-4 text-orange-600" /> // Insights
<ChartBarIcon className="w-4 h-4 text-blue-600" />    // Analytics
```

### Custom Icons

```tsx
// Sustainability leaf icon
<SustainabilityIcon size="md" score={87} />

// 3D viewer icon
<View3DIcon size="lg" />

// Floor plan icon
<FloorPlanIcon size="md" />
```

---

## Motion & Animation

### Animation Principles

1. **Purposeful:** Every animation should have a reason
2. **Fast:** Default to 200-300ms
3. **Natural:** Use easing functions (ease-out for entrances, ease-in for exits)
4. **Respectful:** Honor `prefers-reduced-motion`

### Timing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Durations */
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

### Common Animations

```tsx
// Fade in
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

// Slide up
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Scale in
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

// Loading spinner
<Spinner size="md" />  // Smooth rotation animation

// Skeleton loading
<Skeleton width="100%" height="20px" />  // Subtle shimmer effect
```

---

## Responsive Design

### Mobile-First Approach

Design for small screens first, enhance for larger screens.

```tsx
// Component example
<Stack
  direction={{ base: 'column', md: 'row' }}
  spacing={{ base: 4, md: 6 }}
>
  <Box width={{ base: '100%', md: '50%' }}>
    {/* Content */}
  </Box>
</Stack>
```

### Breakpoint Strategy

| Breakpoint | Width | Target Device | Layout Changes |
|------------|-------|---------------|----------------|
| `base` | < 640px | Mobile | Single column, stacked nav |
| `sm` | ≥ 640px | Mobile landscape | 2-column grids possible |
| `md` | ≥ 768px | Tablet | Sidebar appears, 3-column grids |
| `lg` | ≥ 1024px | Laptop | Full layout, side panels |
| `xl` | ≥ 1280px | Desktop | Maximum density |
| `2xl` | ≥ 1536px | Large display | Contained max-width |

---

## Accessibility

### WCAG 2.1 AA Compliance

**Focus States:**
```css
:focus-visible {
  outline: 2px solid var(--color-primary-600);
  outline-offset: 2px;
}
```

**Keyboard Navigation:**
- All interactive elements reachable via Tab
- Skip links for main content
- Arrow key navigation in lists
- Escape key closes modals

**Screen Reader Support:**
```tsx
<Button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</Button>

<Image src="..." alt="Executive task chair in blue fabric" />

<div role="status" aria-live="polite">
  Recommendations generated successfully
</div>
```

**Color Independence:**
- Never use color alone to convey information
- Always pair with icons, text, or patterns

**Form Accessibility:**
```tsx
<FormField
  id="budget-min"
  label="Minimum Budget"
  required={true}
  error="Please enter a valid amount"
  helpText="Enter your minimum budget in USD"
/>

// Generates:
<label htmlFor="budget-min">
  Minimum Budget <span aria-label="required">*</span>
</label>
<input
  id="budget-min"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby="budget-min-help budget-min-error"
/>
<div id="budget-min-help">Enter your minimum budget in USD</div>
<div id="budget-min-error" role="alert">Please enter a valid amount</div>
```

---

## Design Tokens (JSON)

```json
{
  "colors": {
    "primary": {
      "900": "#003D5C",
      "600": "#0085C7",
      "50": "#E5F5FD"
    },
    "semantic": {
      "success": "#10B981",
      "warning": "#F59E0B",
      "error": "#EF4444"
    }
  },
  "spacing": {
    "1": "0.25rem",
    "4": "1rem",
    "6": "2rem"
  },
  "typography": {
    "fontFamily": {
      "primary": "'Inter', sans-serif"
    },
    "fontSize": {
      "base": "1rem",
      "xl": "1.25rem"
    }
  },
  "borderRadius": {
    "sm": "0.25rem",
    "md": "0.375rem",
    "lg": "0.5rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px rgba(0,0,0,0.05)",
    "md": "0 4px 6px rgba(0,0,0,0.1)",
    "lg": "0 10px 15px rgba(0,0,0,0.15)"
  }
}
```

---

## Resources

- **Figma Design File:** [OFS AI Platform Design System](https://figma.com/...)
- **Component Storybook:** https://storybook.ofs.com
- **Icon Library:** https://heroicons.com
- **Accessibility Checker:** https://wave.webaim.org
- **Contrast Checker:** https://webaim.org/resources/contrastchecker

---

## Changelog

### v1.0.0 (January 2025)
- Initial design system release
- Core component library
- Typography and color system
- Accessibility guidelines
