<template>
  <div class="rules-page">
    <!-- TOC flottante -->
    <nav class="toc" :class="{ visible: showToc }">
      <a
        v-for="cat in categories"
        :key="cat.id"
        :href="'#' + cat.id"
        :class="{ active: activeSection === cat.id }"
        @click.prevent="scrollToSection(cat.id)"
      >
        {{ cat.title }}
      </a>
    </nav>

    <div class="rules-content">
      <h1 class="mb-2">Règles WCAG — Niveaux A & AA</h1>
      <p class="text-body-1 text-medium-emphasis mb-8">
        Les règles essentielles pour rendre vos interfaces accessibles, avec des exemples concrets de code.
      </p>

      <section
        v-for="cat in categories"
        :key="cat.id"
        :id="cat.id"
        class="rules-section"
      >
        <div class="d-flex align-center ga-3 mb-4">
          <v-avatar :color="cat.color" size="40">
            <v-icon color="white">{{ cat.icon }}</v-icon>
          </v-avatar>
          <h2 class="text-h5 font-weight-bold">{{ cat.title }}</h2>
        </div>

        <v-card
          v-for="rule in rulesByCategory(cat.id)"
          :key="rule.id"
          class="rule-card mb-5 pa-5"
        >
          <div class="d-flex align-center flex-wrap ga-2 mb-2">
            <span class="text-h6 font-weight-bold">{{ rule.title }}</span>
            <v-chip size="small" color="primary" variant="outlined" label>
              WCAG {{ rule.wcag }}
            </v-chip>
            <v-chip
              size="small"
              :color="rule.level === 'A' ? 'success' : 'info'"
              variant="flat"
              label
            >
              Niveau {{ rule.level }}
            </v-chip>
          </div>

          <p class="text-body-2 text-medium-emphasis mb-4">{{ rule.description }}</p>

          <v-row dense>
            <!-- Mauvais exemple -->
            <v-col cols="12" md="6">
              <div class="code-block code-block--bad">
                <div class="code-header">
                  <div class="d-flex align-center ga-2">
                    <v-icon size="16" color="error">mdi-close-circle</v-icon>
                    <span class="code-label">{{ rule.bad.label || 'Mauvais' }}</span>
                  </div>
                  <v-btn
                    icon
                    size="x-small"
                    variant="text"
                    @click="copyCode(rule.id + '-bad', rule.bad.code)"
                  >
                    <v-icon size="16">{{ copiedId === rule.id + '-bad' ? 'mdi-check' : 'mdi-content-copy' }}</v-icon>
                  </v-btn>
                </div>
                <pre class="code-body"><code>{{ rule.bad.code }}</code></pre>
              </div>
            </v-col>

            <!-- Bon exemple -->
            <v-col cols="12" md="6">
              <div class="code-block code-block--good">
                <div class="code-header">
                  <div class="d-flex align-center ga-2">
                    <v-icon size="16" color="success">mdi-check-circle</v-icon>
                    <span class="code-label">{{ rule.good.label || 'Bon' }}</span>
                  </div>
                  <v-btn
                    icon
                    size="x-small"
                    variant="text"
                    @click="copyCode(rule.id + '-good', rule.good.code)"
                  >
                    <v-icon size="16">{{ copiedId === rule.id + '-good' ? 'mdi-check' : 'mdi-content-copy' }}</v-icon>
                  </v-btn>
                </div>
                <pre class="code-body"><code>{{ rule.good.code }}</code></pre>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import '../assets/rules.css'

const copiedId = ref(null)

const copyCode = async (id, code) => {
  try {
    await navigator.clipboard.writeText(code)
    copiedId.value = id
    setTimeout(() => {
      copiedId.value = null
    }, 2000)
  } catch {
    // fallback silencieux
  }
}

const categories = [
  { id: 'perceivable', title: 'Perceptible', color: '#1e40af', icon: 'mdi-eye-outline' },
  { id: 'operable', title: 'Opérable', color: '#166534', icon: 'mdi-keyboard-outline' },
  { id: 'understandable', title: 'Compréhensible', color: '#92400e', icon: 'mdi-head-lightbulb-outline' },
  { id: 'robust', title: 'Robuste', color: '#7c3aed', icon: 'mdi-shield-check-outline' },
  { id: 'navigation', title: 'Navigation & Liens', color: '#0e7490', icon: 'mdi-link-variant' }
]

const rules = [
  {
    id: 'alt-text',
    title: 'Texte alternatif des images',
    wcag: '1.1.1',
    level: 'A',
    category: 'perceivable',
    description: 'Toute image porteuse d\'information doit avoir un attribut alt décrivant son contenu. Les images décoratives doivent avoir un alt vide.',
    bad: {
      label: 'Mauvais — alt manquant',
      code: `<img src="graphique-ventes.png">

<!-- ou alt non descriptif -->
<img src="graphique-ventes.png" alt="image">`
    },
    good: {
      label: 'Bon — alt descriptif',
      code: `<!-- Image informative -->
<img src="graphique-ventes.png"
     alt="Graphique des ventes : +25% au T3 2024">

<!-- Image décorative -->
<img src="decoration.svg" alt="">`
    }
  },
  {
    id: 'semantic-structure',
    title: 'Information et relations',
    wcag: '1.3.1',
    level: 'A',
    category: 'perceivable',
    description: 'La structure et les relations entre les éléments doivent être déterminées par le code (balises sémantiques, landmarks, titres hiérarchiques).',
    bad: {
      label: 'Mauvais — div sans sémantique',
      code: `<div class="header">Mon site</div>
<div class="content">
  <div class="big-text">Titre</div>
  <div class="small-text">Sous-titre</div>
  <div>Paragraphe de texte...</div>
</div>`
    },
    good: {
      label: 'Bon — balises sémantiques',
      code: `<header>Mon site</header>
<main>
  <h1>Titre</h1>
  <h2>Sous-titre</h2>
  <p>Paragraphe de texte...</p>
</main>`
    }
  },
  {
    id: 'color-contrast',
    title: 'Contraste minimum',
    wcag: '1.4.3',
    level: 'AA',
    category: 'perceivable',
    description: 'Le texte doit avoir un ratio de contraste d\'au moins 4.5:1 avec son arrière-plan (3:1 pour le texte agrandi ≥ 24px ou 18.5px gras).',
    bad: {
      label: 'Mauvais — contraste insuffisant',
      code: `/* Ratio ~1.9:1 — illisible */
.text {
  color: #aaaaaa;
  background: #ffffff;
}

/* Ratio ~2.5:1 — insuffisant */
.link {
  color: #6699cc;
  background: #ffffff;
}`
    },
    good: {
      label: 'Bon — contraste suffisant',
      code: `/* Ratio ~7.4:1 — excellent */
.text {
  color: #333333;
  background: #ffffff;
}

/* Ratio ~4.6:1 — conforme AA */
.link {
  color: #2563eb;
  background: #ffffff;
}`
    }
  },
  {
    id: 'text-resize',
    title: 'Redimensionnement du texte',
    wcag: '1.4.4',
    level: 'AA',
    category: 'perceivable',
    description: 'Le texte doit pouvoir être agrandi jusqu\'à 200% sans perte de contenu ou de fonctionnalité. Utiliser des unités relatives.',
    bad: {
      label: 'Mauvais — unités fixes',
      code: `.container {
  width: 960px;
  overflow: hidden;
}

.text {
  font-size: 14px;
  line-height: 18px;
}`
    },
    good: {
      label: 'Bon — unités relatives',
      code: `.container {
  max-width: 60rem;
  overflow: visible;
}

.text {
  font-size: 0.875rem;
  line-height: 1.5;
}`
    }
  },
  {
    id: 'keyboard',
    title: 'Accès au clavier',
    wcag: '2.1.1',
    level: 'A',
    category: 'operable',
    description: 'Toutes les fonctionnalités doivent être utilisables au clavier. Ne pas utiliser de div ou span comme éléments interactifs sans les rendre accessibles.',
    bad: {
      label: 'Mauvais — div cliquable',
      code: `<!-- Non focusable, pas de rôle -->
<div class="btn" onclick="submit()">
  Envoyer
</div>

<!-- Gestionnaire souris uniquement -->
<span onmouseover="show()">
  Voir le menu
</span>`
    },
    good: {
      label: 'Bon — éléments natifs ou ARIA',
      code: `<!-- Bouton natif = clavier gratuit -->
<button type="submit">
  Envoyer
</button>

<!-- Si div nécessaire, ajouter rôle + clavier -->
<div role="button" tabindex="0"
     @click="show()" @keydown.enter="show()">
  Voir le menu
</div>`
    }
  },
  {
    id: 'skip-link',
    title: 'Contourner les blocs',
    wcag: '2.4.1',
    level: 'A',
    category: 'operable',
    description: 'Fournir un lien d\'évitement (skip link) permettant aux utilisateurs clavier d\'accéder directement au contenu principal.',
    bad: {
      label: 'Mauvais — pas de skip link',
      code: `<body>
  <nav>
    <!-- 20 liens de navigation -->
    <a href="/">Accueil</a>
    <a href="/about">À propos</a>
    <!-- ... -->
  </nav>
  <main>Contenu</main>
</body>`
    },
    good: {
      label: 'Bon — lien d\'évitement',
      code: `<body>
  <a href="#main" class="skip-link">
    Aller au contenu principal
  </a>
  <nav><!-- navigation --></nav>
  <main id="main">Contenu</main>
</body>

/* CSS */
.skip-link {
  position: absolute;
  top: -100%;
}
.skip-link:focus {
  top: 0;
}`
    }
  },
  {
    id: 'focus-visible',
    title: 'Visibilité du focus',
    wcag: '2.4.7',
    level: 'AA',
    category: 'operable',
    description: 'Les éléments interactifs doivent avoir un indicateur de focus visible lors de la navigation au clavier.',
    bad: {
      label: 'Mauvais — focus supprimé',
      code: `/* NE JAMAIS FAIRE ÇA */
*:focus {
  outline: none;
}

button:focus {
  outline: 0;
}`
    },
    good: {
      label: 'Bon — focus visible personnalisé',
      code: `/* Focus visible uniquement au clavier */
:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Masquer pour la souris */
:focus:not(:focus-visible) {
  outline: none;
}`
    }
  },
  {
    id: 'form-labels',
    title: 'Labels et instructions',
    wcag: '3.3.2',
    level: 'A',
    category: 'understandable',
    description: 'Chaque champ de formulaire doit avoir un label associé explicitement via l\'attribut for/id ou implicitement en englobant l\'input.',
    bad: {
      label: 'Mauvais — pas de label',
      code: `<form>
  <!-- Placeholder n'est pas un label -->
  <input type="text" placeholder="Nom">
  <input type="email" placeholder="Email">

  <!-- Label non associé -->
  <span>Téléphone</span>
  <input type="tel">
</form>`
    },
    good: {
      label: 'Bon — labels explicites',
      code: `<form>
  <label for="name">Nom</label>
  <input type="text" id="name"
         aria-required="true">

  <label for="email">Email</label>
  <input type="email" id="email"
         aria-required="true">

  <label for="phone">Téléphone</label>
  <input type="tel" id="phone">
</form>`
    }
  },
  {
    id: 'field-grouping',
    title: 'Groupes d\'éléments de formulaire',
    wcag: '1.3.1',
    level: 'A',
    category: 'understandable',
    description: 'Les champs de même nature doivent être regroupés avec une légende pertinente (RGAA 11.5, 11.6, 11.7). Les items de même nature dans une liste de choix doivent être regroupés (RGAA 11.8).',
    bad: {
      label: 'Mauvais — pas de regroupement',
      code: `<!-- Radios sans fieldset -->
<label>Civilité :</label>
<input type="radio" name="civ"> M.
<input type="radio" name="civ"> Mme

<!-- Select sans optgroup -->
<select>
  <option>Paris</option>
  <option>Lyon</option>
  <option>BMW</option>
  <option>Audi</option>
</select>`
    },
    good: {
      label: 'Bon — fieldset + optgroup',
      code: `<!-- Radios dans un fieldset -->
<fieldset>
  <legend>Civilité</legend>
  <label>
    <input type="radio" name="civ"> M.
  </label>
  <label>
    <input type="radio" name="civ"> Mme
  </label>
</fieldset>

<!-- Ou avec ARIA -->
<div role="group" aria-label="Civilité">
  ...
</div>

<!-- Select avec optgroup -->
<select>
  <optgroup label="Villes">
    <option>Paris</option>
    <option>Lyon</option>
  </optgroup>
  <optgroup label="Voitures">
    <option>BMW</option>
    <option>Audi</option>
  </optgroup>
</select>`
    }
  },
  {
    id: 'aria-roles',
    title: 'Nom, rôle, valeur',
    wcag: '4.1.2',
    level: 'A',
    category: 'robust',
    description: 'Les composants d\'interface doivent exposer leur nom, rôle et état aux technologies d\'assistance via des attributs ARIA quand les éléments HTML natifs ne suffisent pas.',
    bad: {
      label: 'Mauvais — pas d\'attributs ARIA',
      code: `<!-- Bouton icône sans texte accessible -->
<button>
  <svg><!-- icône fermer --></svg>
</button>

<!-- Menu custom sans ARIA -->
<div class="dropdown">
  <div class="trigger">Menu</div>
  <div class="items" style="display:none">
    <div>Option 1</div>
    <div>Option 2</div>
  </div>
</div>`
    },
    good: {
      label: 'Bon — ARIA descriptif',
      code: `<!-- Bouton avec label accessible -->
<button aria-label="Fermer la fenêtre">
  <svg aria-hidden="true"><!-- icône --></svg>
</button>

<!-- Menu avec rôles ARIA -->
<div role="menu" aria-label="Navigation">
  <button role="menuitem"
          aria-haspopup="true"
          aria-expanded="false">Menu</button>
  <div role="menu" hidden>
    <button role="menuitem">Option 1</button>
    <button role="menuitem">Option 2</button>
  </div>
</div>`
    }
  },
  {
    id: 'tab-order',
    title: 'Ordre de tabulation cohérent',
    wcag: '2.4.3',
    level: 'A',
    category: 'navigation',
    description: 'L\'ordre de tabulation doit être logique et cohérent (RGAA 12.8). Attention aux positionnements CSS, zones masquées et widgets ARIA. Limiter l\'usage des tabindex > 0.',
    bad: {
      label: 'Mauvais — tabindex arbitraire',
      code: `<!-- tabindex > 0 crée un ordre imprévisible -->
<input tabindex="3" placeholder="Nom">
<input tabindex="1" placeholder="Email">
<input tabindex="2" placeholder="Téléphone">

<!-- Élément visuellement déplacé en CSS
     mais toujours dans le flux clavier -->
<div style="position: absolute; right: 0;">
  <button>Action</button>
</div>`
    },
    good: {
      label: 'Bon — ordre naturel du DOM',
      code: `<!-- L'ordre du DOM correspond à l'ordre visuel -->
<input placeholder="Nom">
<input placeholder="Email">
<input placeholder="Téléphone">

<!-- tabindex="0" pour inclure dans le flux,
     tabindex="-1" pour exclure -->
<div role="dialog" aria-modal="true">
  <button tabindex="0">Confirmer</button>
  <button tabindex="0">Annuler</button>
</div>`
    }
  },
  {
    id: 'keyboard-trap',
    title: 'Pas de piège au clavier',
    wcag: '2.1.2',
    level: 'A',
    category: 'navigation',
    description: 'La navigation ne doit pas contenir de piège au clavier (RGAA 12.9). L\'utilisateur doit pouvoir quitter tout composant avec le clavier. Prévoir des échappatoires (Échap, tabindex itinérant).',
    bad: {
      label: 'Mauvais — piège clavier',
      code: `<!-- Modal sans gestion du focus -->
<div class="modal">
  <input type="text">
  <!-- Tab sort de la modal vers le fond
       mais l'utilisateur ne peut pas
       revenir au contenu principal -->
</div>

<!-- Widget qui capture le focus -->
<div @keydown.tab.prevent>
  <!-- Le focus ne peut jamais sortir -->
</div>`
    },
    good: {
      label: 'Bon — focus piégé correctement',
      code: `<!-- Modal avec focus trap + Échap -->
<div role="dialog" aria-modal="true"
     @keydown.esc="close()"
     @keydown.tab="trapFocus($event)">
  <button>Confirmer</button>
  <button @click="close()">Annuler</button>
</div>

// JavaScript
function trapFocus(event) {
  const focusable = dialog.querySelectorAll(
    'button, input, [tabindex="0"]'
  )
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    last.focus(); event.preventDefault()
  } else if (!event.shiftKey && document.activeElement === last) {
    first.focus(); event.preventDefault()
  }
}`
    }
  },
  {
    id: 'shortcut-keys',
    title: 'Raccourcis clavier contrôlables',
    wcag: '2.1.4',
    level: 'A',
    category: 'navigation',
    description: 'Les raccourcis clavier n\'utilisant qu\'une seule touche (lettre, chiffre, ponctuation, symbole) doivent pouvoir être désactivés ou reconfigurés (RGAA 12.10). Activer les raccourcis uniquement au focus.',
    bad: {
      label: 'Mauvais — raccourci global',
      code: `<!-- Raccourci actif partout -->
// JavaScript
document.addEventListener('keydown', (e) => {
  // "s" ouvre la recherche même en
  // tapant dans un champ texte
  if (e.key === 's') {
    openSearch()
  }
})`
    },
    good: {
      label: 'Bon — raccourci au focus uniquement',
      code: `<!-- Raccourci actif seulement au focus -->
<div class="search-zone" tabindex="0"
     @keydown.s="openSearch()">
  <!-- "s" n'agit que si ce composant
       a le focus -->
</div>

<!-- Ou avec modificateur -->
// JavaScript
document.addEventListener('keydown', (e) => {
  // Ctrl+K : raccourci avec modificateur OK
  if (e.ctrlKey && e.key === 'k') {
    openSearch()
  }
})`
    }
  },
  {
    id: 'additional-content',
    title: 'Contenus additionnels accessibles',
    wcag: '1.4.13',
    level: 'AA',
    category: 'navigation',
    description: 'Les contenus additionnels apparaissant au survol, à la prise de focus ou à l\'activation d\'un composant doivent être atteignables et masquables au clavier (RGAA 12.11).',
    bad: {
      label: 'Mauvais — tooltip souris uniquement',
      code: `<!-- Visible uniquement au survol souris -->
<div class="tooltip-wrapper">
  <span>Aide</span>
  <div class="tooltip"
       style="display:none">
    Texte d'aide important
  </div>
</div>

/* CSS */
.tooltip-wrapper:hover .tooltip {
  display: block;
}
/* Pas de :focus, pas de Échap */`
    },
    good: {
      label: 'Bon — accessible clavier + masquable',
      code: `<!-- Visible au hover ET au focus -->
<div class="tooltip-wrapper"
     tabindex="0"
     @keydown.esc="hideTooltip()">
  <span>Aide</span>
  <div role="tooltip"
       :class="{ visible: showTip }">
    Texte d'aide important
  </div>
</div>

/* CSS */
.tooltip-wrapper:hover .tooltip,
.tooltip-wrapper:focus-within .tooltip {
  display: block;
}`
    }
  },
  {
    id: 'explicit-links',
    title: 'Liens explicites',
    wcag: '2.4.4',
    level: 'A',
    category: 'navigation',
    description: 'Chaque lien doit être explicite : son intitulé (seul ou en contexte) doit permettre de comprendre sa destination ou sa fonction (RGAA 6.1). Le nom accessible doit contenir au moins l\'intitulé visible.',
    bad: {
      label: 'Mauvais — liens non explicites',
      code: `<!-- Intitulé non descriptif -->
<a href="/rapport-2024.pdf">
  Cliquez ici
</a>

<!-- Lien sans contexte -->
<p>Consultez nos résultats.
  <a href="/rapport">En savoir plus</a>
</p>

<!-- aria-label ne contient pas
     le texte visible -->
<a href="/aide"
   aria-label="Support technique">
  Aide
</a>`
    },
    good: {
      label: 'Bon — liens descriptifs',
      code: `<!-- Intitulé descriptif -->
<a href="/rapport-2024.pdf">
  Télécharger le rapport annuel 2024 (PDF)
</a>

<!-- Contexte via aria-label -->
<p>Consultez nos résultats.
  <a href="/rapport"
     aria-label="En savoir plus sur nos résultats">
    En savoir plus
  </a>
</p>

<!-- aria-label contient le texte visible -->
<a href="/aide"
   aria-label="Aide et support technique">
  Aide
</a>`
    }
  },
  {
    id: 'link-robustness',
    title: 'Intitulé des liens',
    wcag: '4.1.2',
    level: 'A',
    category: 'navigation',
    description: 'Chaque lien (hors ancres) doit avoir un intitulé (RGAA 6.2). Insérer un texte dans la balise <a>, même masqué en CSS si nécessaire. L\'attribut title seul ne suffit pas.',
    bad: {
      label: 'Mauvais — lien sans intitulé',
      code: `<!-- Lien vide -->
<a href="/accueil"></a>

<!-- Lien avec seulement un title -->
<a href="/accueil" title="Accueil"></a>

<!-- Lien icône sans texte -->
<a href="/panier">
  <svg><!-- icône panier --></svg>
</a>`
    },
    good: {
      label: 'Bon — intitulé toujours présent',
      code: `<!-- Texte visible -->
<a href="/accueil">Accueil</a>

<!-- Texte masqué visuellement -->
<a href="/accueil">
  <svg aria-hidden="true"><!-- icône --></svg>
  <span class="sr-only">Accueil</span>
</a>

<!-- Ou via alt sur l'image -->
<a href="/panier">
  <img src="cart.svg" alt="Panier (3 articles)">
</a>

/* CSS */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
}`
    }
  }
]

const rulesByCategory = (categoryId) => {
  return rules.filter(r => r.category === categoryId)
}

const activeSection = ref('perceivable')
const showToc = ref(false)

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleScroll = () => {
  const scrollPosition = window.scrollY + 150
  showToc.value = scrollPosition > 200

  for (const cat of categories) {
    const element = document.getElementById(cat.id)
    if (element) {
      const { offsetTop, offsetHeight } = element
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = cat.id
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
