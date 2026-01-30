# WCAG & RGAA Training Workshop

An interactive training tool to learn Web Content Accessibility Guidelines (WCAG) and RGAA through hands-on practice.

## Overview

This project provides a complete training experience for learning web accessibility:

1. **Presentation** - A 10-minute introduction to WCAG and RGAA concepts
2. **Playground** - A 10-15 minute interactive exercise to practice fixing accessibility issues
3. **Correction** - Reference solution with detailed explanations

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd wcag-training

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to `http://localhost:5173`

## How to Use

### 1. Presentation Phase (10 minutes)

- Navigate to the home page
- Go through the 4-step presentation to learn:
  - What are WCAG and RGAA
  - The 4 POUR principles
  - Conformance levels A, AA, and AAA
  - Common accessibility issues

### 2. Playground Phase (10-15 minutes)

The real learning happens here!

**Instructions:**

1. Navigate to the "Playground" page (or click "Start Playground" from the presentation)
2. Open `src/views/BadPage.vue` in your IDE
3. The page contains ~10 WCAG violations (levels A and AA)
4. Position your IDE and browser side-by-side for the best experience
5. Fix the accessibility issues in the code based on what you learned
6. Save your changes (Vite will auto-reload the page)
7. Click "Check Score" in the right panel to see your progress
8. The score panel stays visible while you edit - no need to reopen dialogs!
9. Keep iterating until you achieve 100%

**The 10 Accessibility Issues to Fix:**

1. Missing `<main>` landmark
2. Improper heading hierarchy (H1 → H3)
3. Image without alt text
4. Low contrast text color
5. Form inputs without labels
6. Radio buttons without proper grouping
7. Button with only icon (no accessible name)
8. Non-descriptive link text ("click here")
9. Button with poor color contrast
10. Missing ARIA attributes on form

### 3. Correction Phase

- Navigate to the "Correction" page to see the properly fixed code
- Each fix is explained with:
  - What the issue was
  - How it was fixed
  - Which WCAG criterion applies

## Project Structure

```
wcag-training/
├── src/
│   ├── views/
│   │   ├── Presentation.vue      # Training presentation
│   │   ├── BadPage.vue            # Page with accessibility issues (edit this!)
│   │   └── CorrectionPage.vue     # Reference solution
│   ├── utils/
│   │   └── calculateScore.ts      # Score calculation logic
│   ├── router/
│   │   └── index.js               # Vue Router configuration
│   ├── App.vue                    # Main app component
│   └── main.js                    # App entry point
├── package.json
└── README.md
```

## Technology Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Fast build tool and dev server
- **Vuetify 3** - Material Design component library
- **Vue Router** - Official routing library
- **TypeScript** - For the scoring logic

## Learning Objectives

After completing this workshop, participants will be able to:

- Understand the importance of web accessibility
- Identify common WCAG Level A and AA violations
- Apply proper semantic HTML
- Implement accessible forms with labels and ARIA attributes
- Use proper heading hierarchy
- Ensure sufficient color contrast
- Create descriptive link text and button labels
- Use landmark regions appropriately

## WCAG Issues Covered

### Level A Issues
- 1.1.1 Non-text Content (alt text)
- 1.3.1 Info and Relationships (semantic structure)
- 2.4.4 Link Purpose (descriptive links)
- 3.3.2 Labels or Instructions (form labels)
- 4.1.2 Name, Role, Value (accessible names)

### Level AA Issues
- 1.4.3 Contrast (Minimum) - 4.5:1 ratio for normal text

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to deploy to any static hosting service.

## Customization

Want to modify the training content?

- **Add more issues**: Edit `src/views/BadPage.vue` and add more violations
- **Update scoring**: Modify `src/utils/calculateScore.ts` to check for new issues
- **Change presentation**: Edit `src/views/Presentation.vue` to update content
- **Add more examples**: Edit `src/views/CorrectionPage.vue` to show additional fixes

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [RGAA Documentation](https://accessibilite.numerique.gouv.fr/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## License

MIT

## Contributing

Feel free to submit issues or pull requests to improve this training tool!
