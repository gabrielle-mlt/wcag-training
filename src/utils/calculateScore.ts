/**
 * Calculate WCAG compliance score for the BadPage
 * Checks for common accessibility issues and compares against expected fixes
 */

interface ScoreResult {
  score: number
  details: {
    fixed: string[]
    remaining: string[]
  }
}

interface Check {
  name: string
  test: () => boolean
}

export function calculateScore(): ScoreResult {
  const checks: Check[] = [
    {
      name: 'Landmark principal',
      test: () => {
        const main = document.querySelector('main')
        return main !== null && main.querySelector('.content-wrapper') !== null
      }
    },
    {
      name: 'Hiérarchie de titres',
      test: () => {
        const h1 = document.querySelector('h1')
        const h2 = document.querySelector('h2')
        const h3 = document.querySelector('h3')

        // Should have h1 and h2, but the bad h3 should be replaced with h2
        if (!h1 || !h2) return false

        // Check if there's no h3 directly after h1 (the bad pattern)
        const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
        if (headings.length >= 2) {
          const firstH1Index = headings.findIndex(h => h.tagName === 'H1')
          const nextHeading = headings[firstH1Index + 1]
          // If the next heading after H1 is H2 (not H3), it's fixed
          return nextHeading && nextHeading.tagName === 'H2'
        }
        return false
      }
    },
    {
      name: 'Texte alternatif image',
      test: () => {
        const images = Array.from(document.querySelectorAll('img.banner-image'))
        if (images.length === 0) return false

        return images.every((img: Element) => {
          const alt = img.getAttribute('alt')
          // Alt should exist and be descriptive (not empty or just whitespace)
          return alt !== null && alt.trim().length > 5
        })
      }
    },
    {
      name: 'Contraste du texte',
      test: () => {
        const paragraphs = Array.from(document.querySelectorAll('p'))

        // Find the paragraph with important information
        const infoParagraph = paragraphs.find((p: Element) =>
          p.textContent?.includes('informations importantes')
        )

        if (!infoParagraph) return false

        const style = window.getComputedStyle(infoParagraph as Element)
        const color = style.color

        // Check if color is NOT light gray (#ccc or similar)
        // Dark colors typically have lower RGB values
        const rgb = color.match(/\d+/g)
        if (!rgb) return false

        const [r, g, b] = rgb.map(Number)
        // If any RGB component is > 150, it's likely too light
        // Good contrast would have darker text (lower values)
        return r < 150 && g < 150 && b < 150
      }
    },
    {
      name: 'Labels des champs',
      test: () => {
        // Check for name input
        const nameInput = document.querySelector('input[type="text"]')
        const emailInput = document.querySelector('input[type="email"]')

        if (!nameInput || !emailInput) return false

        // Check if inputs have associated labels
        const nameId = nameInput.getAttribute('id')
        const emailId = emailInput.getAttribute('id')

        if (!nameId || !emailId) return false

        const nameLabel = document.querySelector(`label[for="${nameId}"]`)
        const emailLabel = document.querySelector(`label[for="${emailId}"]`)

        return nameLabel !== null && emailLabel !== null
      }
    },
    {
      name: 'Groupement des radios',
      test: () => {
        const fieldset = document.querySelector('fieldset')
        const legend = document.querySelector('legend')
        const radioInputs = Array.from(document.querySelectorAll('input[type="radio"]'))

        if (!fieldset || !legend || radioInputs.length === 0) return false

        // Check if radio buttons have proper labels
        return radioInputs.every((radio: Element) => {
          const id = radio.getAttribute('id')
          if (!id) return false
          const label = document.querySelector(`label[for="${id}"]`)
          return label !== null
        })
      }
    },
    {
      name: 'Texte accessible du bouton',
      test: () => {
        // Find the submit button
        const submitButton = document.querySelector('button[type="submit"], .v-btn[type="submit"]')

        if (!submitButton) return false

        // Button should have visible text content (not just an icon)
        const text = submitButton.textContent?.trim()
        return text !== null && text.length > 0
      }
    },
    {
      name: 'Texte de lien descriptif',
      test: () => {
        const links = Array.from(document.querySelectorAll('a'))

        // Find the "plus d'informations" link
        const infoLink = links.find((link: Element) => {
          const parent = link.parentElement
          return parent?.textContent?.includes("plus d'informations")
        })

        if (!infoLink) return false

        const linkText = infoLink.textContent?.trim().toLowerCase()

        // Should NOT be "cliquez ici" or similar non-descriptive text
        return linkText !== 'cliquez ici' && linkText && linkText.length > 5
      }
    },
    {
      name: 'Contraste du bouton',
      test: () => {
        // Find buttons that are not the FAB
        const buttons = Array.from(document.querySelectorAll('.v-btn'))

        // Look for a button with custom styling (the problematic one)
        const styledButton = buttons.find((btn: Element) => {
          const style = (btn as HTMLElement).style
          return style.backgroundColor && style.backgroundColor.includes('255')
        })

        // If the bad button still exists with light yellow, test fails
        if (styledButton) {
          const bgColor = (styledButton as HTMLElement).style.backgroundColor
          // Check if it's still light yellow (#ffff99 or rgb(255, 255, 153))
          if (bgColor.includes('255, 255')) return false
        }

        // If the bad styling is removed, it passes
        return true
      }
    },
    {
      name: 'Attributs ARIA du formulaire',
      test: () => {
        const form = document.querySelector('form')
        if (!form) return false

        // Check for aria-labelledby or aria-label
        const hasAriaLabel = form.hasAttribute('aria-labelledby') || form.hasAttribute('aria-label')

        // Check for aria-required on inputs
        const inputs = Array.from(form.querySelectorAll('input[type="text"], input[type="email"]'))
        const hasAriaRequired = inputs.some((input: Element) =>
          input.hasAttribute('aria-required') || input.hasAttribute('required')
        )

        return hasAriaLabel && hasAriaRequired
      }
    }
  ]

  // Run all checks
  const results = checks.map(check => ({
    name: check.name,
    passed: check.test()
  }))

  // Calculate score
  const passedCount = results.filter(r => r.passed).length
  const totalCount = results.length
  const score = Math.round((passedCount / totalCount) * 100)

  // Build details
  const fixed = results.filter(r => r.passed).map(r => r.name)
  const remaining = results.filter(r => !r.passed).map(r => r.name)

  return {
    score,
    details: {
      fixed,
      remaining
    }
  }
}
