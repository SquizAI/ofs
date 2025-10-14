# OFS Typography Guidelines

## Overview

While specific font families are not explicitly documented in publicly available materials, OFS uses clean, modern, professional typography that aligns with their brand values of craftsmanship, sophistication, and approachability.

---

## Typography Principles

### 1. Legibility First
- Clear, readable fonts for all applications
- Appropriate sizing for context
- Sufficient line spacing
- Strong contrast with backgrounds

### 2. Professional Aesthetic
- Modern sans-serif for digital
- Clean, refined appearance
- Consistent with contract furniture industry standards
- Accessible to broad audiences

### 3. Brand Alignment
- Typography reflects craftsmanship and quality
- Timeless rather than trendy
- Sophisticated but approachable
- Complements visual brand identity

---

## Recommended Typography Approach

### Digital Applications (Web, Apps, Email)

**Primary Font Stack (Recommended):**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
```

**Characteristics:**
- System fonts for optimal performance
- Excellent readability
- Native look and feel
- No font loading delays

**Alternative Modern Sans-Serif Options:**
- Helvetica Neue
- Arial
- Inter
- Open Sans
- Lato
- Source Sans Pro

### Print Applications

**Body Text:**
- Clean sans-serif or serif
- 9-12pt depending on application
- Adequate leading (line spacing)

**Headlines:**
- Bold sans-serif
- Uppercase or title case
- Generous spacing

---

## Type Hierarchy

### Headings

**H1 - Page Titles**
- Weight: Bold (700)
- Size: 32-48px (digital) / 24-36pt (print)
- Color: #796e65 or #000000
- Usage: Page headers, major sections

**H2 - Section Headers**
- Weight: Bold (700) or Semi-Bold (600)
- Size: 24-32px (digital) / 18-24pt (print)
- Color: #796e65 or #000000
- Usage: Main section divisions

**H3 - Subsections**
- Weight: Semi-Bold (600)
- Size: 18-24px (digital) / 14-18pt (print)
- Color: #796e65 or #333333
- Usage: Subsection headers

**H4 - Minor Headers**
- Weight: Semi-Bold (600)
- Size: 16-18px (digital) / 12-14pt (print)
- Color: #333333 or #666666
- Usage: Minor divisions, callouts

### Body Text

**Paragraph Text**
- Weight: Regular (400)
- Size: 16-18px (digital) / 10-12pt (print)
- Line Height: 1.5-1.7
- Color: #333333 or #000000
- Max Width: 65-75 characters for readability

**Small Text / Captions**
- Weight: Regular (400)
- Size: 14px (digital) / 8-9pt (print)
- Color: #666666
- Usage: Captions, footnotes, disclaimers

### Emphasis

**Bold**
- Weight: Bold (700)
- Usage: Emphasis, key terms, callouts

**Italic**
- Usage: Product names, emphasis, quotes (use sparingly)

---

## Spacing Guidelines

### Letter Spacing (Tracking)
- Headlines: 0 to -0.02em (slight tightening acceptable)
- Body text: 0 (normal)
- All caps: +0.05em to +0.1em (open up for readability)
- Small text: +0.01em

### Line Spacing (Leading)
- Headlines: 1.1 to 1.3
- Body text: 1.5 to 1.7
- Small text: 1.4 to 1.6

### Paragraph Spacing
- Between paragraphs: 1em to 1.5em
- Between sections: 2em to 3em

---

## Color Application

### Text Colors

**Primary Text:**
- Hex: #000000 or #333333
- Usage: Main body copy, high-priority content

**Secondary Text:**
- Hex: #666666
- Usage: Supporting information, captions

**Brand Color Text:**
- Hex: #796e65
- Usage: Headers, emphasis, links, calls-to-action

**Light Text (on dark backgrounds):**
- Hex: #FFFFFF
- Usage: Reversed applications, hero sections

### Accessibility

**Minimum Contrast Ratios (WCAG AA):**
- Normal text (under 18pt): 4.5:1
- Large text (18pt+ or 14pt+ bold): 3:1

**Test combinations:**
- #000000 on #FFFFFF: 21:1 ✓
- #333333 on #FFFFFF: 12.6:1 ✓
- #796e65 on #FFFFFF: 4.54:1 ✓ (AA for normal text)
- #666666 on #FFFFFF: 5.74:1 ✓

---

## Specialized Applications

### Taglines & Slogans

**"Imagine a Place®"**
- Treatment: Clean, readable font
- Registration mark: Always include ®
- Placement: Near logo or standalone
- Size: Proportional to context

### Product Names

**Formatting:**
- Title case (e.g., "Adler", "Obee", "Ally")
- Regular or italic weight
- Can use brand color (#796e65) for emphasis
- Examples: **Adler**, *Obee*, Ally

### Pull Quotes

**Styling:**
- Size: 20-28px (digital) / 14-18pt (print)
- Weight: Regular or Semi-Bold
- Color: #796e65 or #333333
- Quotation marks: Use smart quotes (" ")
- Line height: 1.3-1.5

### Numbers & Data

**Large Numbers:**
- Weight: Bold (700)
- Size: 36-60px
- Color: #796e65
- Usage: Statistics, metrics, impact numbers

**Body Numbers:**
- Match body text styling
- Use tabular figures if available
- Align properly in tables

---

## Formatting Rules

### Caps Usage

**ALL CAPS:**
- Sparingly used
- Short headings or labels only
- Increase letter-spacing (+0.05em to +0.1em)
- Example: FEATURED PRODUCTS, NEW ARRIVALS

**Title Case:**
- Product names
- Section headers
- Navigation items
- Button labels

**Sentence case:**
- Body text
- Descriptions
- Most headlines

### Alignment

**Body Text:**
- Left-aligned (primary)
- Justified (acceptable for print, avoid for web)
- Never right-aligned or center-aligned for paragraphs

**Headings:**
- Left-aligned (primary)
- Centered (hero sections, special applications)

---

## Web-Specific Guidelines

### Responsive Typography

**Mobile (320-767px):**
- H1: 28-32px
- H2: 22-26px
- Body: 16px
- Line height: 1.6

**Tablet (768-1024px):**
- H1: 32-40px
- H2: 26-32px
- Body: 16-18px
- Line height: 1.6

**Desktop (1025px+):**
- H1: 40-48px
- H2: 32-36px
- Body: 18px
- Line height: 1.7

### Web Accessibility

- Minimum 16px body text
- Allow text resizing (no fixed pixel heights)
- Sufficient color contrast
- Clear focus states for interactive elements
- Readable on all devices and zoom levels

---

## CSS Example

```css
:root {
  --ofs-primary-color: #796e65;
  --ofs-text-dark: #333333;
  --ofs-text-medium: #666666;
  --ofs-text-light: #999999;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
               "Helvetica Neue", Arial, sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: var(--ofs-text-dark);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  color: var(--ofs-primary-color);
  line-height: 1.2;
}

h1 { font-size: 48px; }
h2 { font-size: 36px; }
h3 { font-size: 24px; }

a {
  color: var(--ofs-primary-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

---

## Print-Specific Guidelines

### Business Cards
- Name: 10-12pt, Bold
- Title: 8-9pt, Regular
- Contact: 7-8pt, Regular
- Logo: Prominent placement

### Brochures
- Headlines: 18-24pt, Bold
- Body: 10-11pt, Regular
- Captions: 8-9pt, Regular or Italic

### Catalogs
- Product names: 12-14pt, Bold
- Descriptions: 9-10pt, Regular
- Specifications: 7-8pt, Regular

---

## Don'ts

**DON'T:**
- ❌ Use more than 2-3 font families
- ❌ Use decorative or script fonts
- ❌ Set body text below 14px (mobile) or 16px (desktop)
- ❌ Use low-contrast color combinations
- ❌ Stretch or condense fonts artificially
- ❌ Use excessive ALL CAPS
- ❌ Set long paragraphs in italic
- ❌ Use centered text for body copy
- ❌ Create narrow line lengths (<45 characters)
- ❌ Create overly wide line lengths (>90 characters)

---

*For specific font licensing or custom typography needs, contact the OFS marketing team.*
