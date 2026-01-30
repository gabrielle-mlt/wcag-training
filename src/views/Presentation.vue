<template>
  <div class="presentation">
    <!-- TOC flottante (style Notion) -->
    <nav class="toc" :class="{ visible: showToc }">
      <a
        v-for="section in contentSections"
        :key="section.id"
        :href="'#' + section.id"
        :class="{ active: activeSection === section.id }"
        @click.prevent="scrollToSection(section.id)"
      >
        {{ section.title }}
      </a>
    </nav>

    <!-- Zone Hero -->
    <section id="hero" class="hero-zone">
      <v-card class="hero-card">
        <div class="bubble bubble-1"></div>
        <div class="bubble bubble-2"></div>
        <div class="bubble bubble-3"></div>
        <div class="bubble bubble-4"></div>

        <div class="hero-content">
          <h1>Formation WCAG & RGAA</h1>
          <p class="hero-subtitle">
            Apprendre les bonnes pratiques d'accessibilité web par la pratique
          </p>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-value">15%</span>
              <span class="stat-label">de la population a un handicap</span>
            </div>
            <div class="stat">
              <span class="stat-value">~10</span>
              <span class="stat-label">problèmes à corriger</span>
            </div>
            <div class="stat">
              <span class="stat-value">20min</span>
              <span class="stat-label">durée de l'atelier</span>
            </div>
          </div>
          <v-btn
            color="primary"
            size="large"
            to="/playground"
            class="mt-6"
          >
            Commencer l'atelier
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-card>
    </section>

    <!-- Zone Contenu -->
    <div class="content">
      <!-- Section Citation -->
      <section id="quote" class="section quote-section">
        <v-row class="align-center">
          <v-col class="text-left" cols="4">
            <h2>Ambition de Tim Berners-Lee</h2>
            <p class="quote-subtitle">inventeur du Web et fondateur du W3C</p>
          </v-col>
          <v-col>
            <blockquote class="quote-block">
              Mettre le Web et ses services à la disposition de tous
              les individus, quels que soient leur matériel ou logiciel,
              leur infrastructure réseau, leur langue maternelle,
              leur culture, leur localisation géographique, ou leurs
              aptitudes physiques et mentales.
            </blockquote>
          </v-col>
        </v-row>
      </section>

      <!-- Section impacts -->
      <section id="impacts" class="section impacts-section">
            <h2>Les enjeux de l'accessibilité numérique</h2>
            <p class="section-intro">
              <strong style="font-size: 3rem;">{{ enjeux.total.label }}</strong> <br> 
              sont concernées par un handicap en France.
            </p>
            <v-row dense>
              <v-col v-for="h in enjeux.handicaps" :key="h.type" cols="12" sm="6">
                <v-card variant="tonal" :title="h.type" :prepend-icon="h.icon" color="deep-purple" class="pa-3 text-left">
                  <v-card-text class="d-flex align-center ga-2 ">

                  <div class="text-body-2 text-medium-emphasis">{{ h.description }}</div>
                  </v-card-text>

                </v-card>
              </v-col>
            </v-row>
      </section>

      <!-- Section Introduction -->
      <section id="introduction" class="section">
        <h2>Introduction</h2>

        <v-card variant="elevated" class="mb-4 pa-5">
          <v-card-title class="text-h6 px-0 pt-0">Qu'est-ce que le WCAG ?</v-card-title>
          <v-card-text class="px-0 pb-0">
            <strong>WCAG</strong> (Web Content Accessibility Guidelines) sont les normes internationales
            développées par le W3C pour rendre le contenu web plus accessible aux personnes en situation de handicap.
          </v-card-text>
        </v-card>

        <v-card variant="elevated" class="mb-4 pa-5">
          <v-card-title class="text-h6 px-0 pt-0">Qu'est-ce que le RGAA ?</v-card-title>
          <v-card-text class="px-0 pb-0">
            <strong>RGAA</strong> (Référentiel Général d'Amélioration de l'Accessibilité) est le cadre
            d'accessibilité du gouvernement français basé sur les WCAG, obligatoire pour les sites du secteur public.
          </v-card-text>
        </v-card>

        <v-card color="deep-purple" variant="tonal" class="mt-4 pa-4">
          <div class="d-flex align-center mb-2">
            <v-icon color="deep-purple" class="mr-2">mdi-information</v-icon>
            <span class="text-subtitle-1 font-weight-bold">Pourquoi c'est important ?</span>
          </div>
          <v-list density="compact" bg-color="transparent" class="pa-0 text-left">
            <v-list-item v-for="item in whyItMatters" :key="item" prepend-icon="mdi-check-circle-outline">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </section>

      <section id="resources" class="section">
        <h2>Ressources utiles</h2>

        <v-list density="comfortable" bg-color="transparent" class="pa-0 text-left">
          <v-list-item
            href="https://www.w3.org/WAI/standards-guidelines/wcag/"
            target="_blank"
            prepend-icon="mdi-web"
          >
            <v-list-item-title>WCAG - Web Content Accessibility Guidelines (W3C)</v-list-item-title>
          </v-list-item>

          <v-list-item
            href="https://accessibilite.numerique.gouv.fr/"
            target="_blank"
            prepend-icon="mdi-file-document-outline"
          >
            <v-list-item-title>RGAA - Référentiel Général d'Amélioration de l'Accessibilité</v-list-item-title>
          </v-list-item>

          <v-list-item
            href="https://design.numerique.gouv.fr/outils/memo-dev/"
            target="_blank"
            prepend-icon="mdi-clipboard-check-outline"
          >
            <v-list-item-title>Mémo développeur — Bonnes pratiques accessibilité</v-list-item-title>
          </v-list-item>

          <v-list-item
            href="https://disic.github.io/guide-integrateur/"
            target="_blank"
            prepend-icon="mdi-book-open-variant"
          >
            <v-list-item-title>Guide de l'intégrateur — DISIC</v-list-item-title>
          </v-list-item>

          <v-list-item
            href="https://www.systeme-de-design.gouv.fr/version-courante/fr"
            target="_blank"
            prepend-icon="mdi-palette-outline"
          >
            <v-list-item-title>DSFR — Système de Design de l'État</v-list-item-title>
          </v-list-item>

        </v-list>
        </section>

      <!-- Section Principes POUR -->
      <section id="principles" class="section">
        <h2>Les 4 principes : POUR</h2>

        <v-row>
          <v-col v-for="principle in principles" :key="principle.letter" cols="12" md="6">
            <v-card variant="elevated" class="pa-5 h-100">
              <v-avatar :color="principle.color" size="40" class="mb-3">
                <span class="text-h6 font-weight-bold">{{ principle.letter }}</span>
              </v-avatar>
              <v-card-title class="text-h6 px-0 pt-0">{{ principle.title }}</v-card-title>
              <v-card-text class="px-0 pb-0">
                <p class="text-body-2 text-medium-emphasis mb-3">{{ principle.description }}</p>
                <v-list density="compact" bg-color="transparent" class="pa-0">
                  <v-list-item
                    v-for="item in principle.items"
                    :key="item"
                    prepend-icon="mdi-circle-small"
                    class="px-0"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Section Niveaux de conformité -->
      <section id="levels" class="section">
        <h2>Niveaux de conformité</h2>

        <div class="levels-stack text-left">
          <v-card v-for="level in levels" :key="level.badge" variant="elevated" class="pa-5">
            <div class="d-flex align-start ga-4">
              <v-avatar :color="level.color" size="48" rounded="lg" class="flex-shrink-0">
                <span class="text-h6 font-weight-bold">{{ level.badge }}</span>
              </v-avatar>
              <div class="flex-grow-1">
                <v-card-title class="text-h6 px-0 pt-0">
                  {{ level.title }}
                  <v-chip size="x-small" variant="tonal" class="ml-2">{{ level.tag }}</v-chip>
                </v-card-title>
                <p class="text-body-2 text-medium-emphasis mb-2">{{ level.description }}</p>
                <v-list density="compact" bg-color="transparent" class="pa-0">
                  <v-list-item
                    v-for="item in level.items"
                    :key="item"
                    prepend-icon="mdi-circle-small"
                    class="px-0"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </v-card>
        </div>

        <v-card color="success" variant="tonal" class="mt-4 pa-4">
          <div class="d-flex align-center">
            <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
            <span><strong>Objectif du jour :</strong> Apprendre à identifier et corriger les problèmes de niveau A et AA !</span>
          </div>
        </v-card>
      </section>

      <!-- Section Pratique -->
      <section id="practice" class="section">
        <h2>Prêt à pratiquer ?</h2>

        <p class="section-intro">
          Vous allez maintenant travailler sur une page avec des problèmes d'accessibilité.<br>
          Votre mission : corriger autant de violations WCAG que possible !
        </p>

        <v-timeline side="end" class="mb-6">
          <v-timeline-item
            v-for="step in steps"
            :key="step.number"
            :dot-color="step.color"
            :icon="step.icon"
            fill-dot
          >
            <v-card variant="flat" class="pa-4">
              <div class="d-flex align-center ga-3 mb-1">
                <v-chip :color="step.color"  variant="flat" label>
                  Étape {{ step.number }}
                </v-chip>
                <span class="text-subtitle-1 font-weight-bold">{{ step.title }}</span>
              </div>
              <p class="text-body-2 text-left ml-3 text-medium-emphasis mb-0">{{ step.description }}</p>
            </v-card>
          </v-timeline-item>
        </v-timeline>

        <div class="cta-section">
          <v-btn
            color="primary"
            size="x-large"
            to="/playground"
          >
            Commencer l'atelier
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import '../assets/hero-background.css'
import '../assets/presentation.css'

const contentSections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'principles', title: 'Principes POUR' },
  { id: 'levels', title: 'Niveaux de conformité' },
  { id: 'practice', title: 'Pratique' }
]

const whyItMatters = [
  '15% de la population mondiale a une forme de handicap',
  'Obligations légales dans de nombreux pays',
  'Meilleure expérience pour tous les utilisateurs',
  'Amélioration du référencement (SEO)'
]

const principles = [
  {
    letter: 'P',
    title: 'Perceptible',
    color: '#dbeafe',
    description: "L'information doit être présentée de manière perceptible par tous.",
    items: ['Alternatives textuelles pour les images', 'Sous-titres pour les vidéos', 'Contraste de couleurs suffisant']
  },
  {
    letter: 'O',
    title: 'Opérable',
    color: '#dcfce7',
    description: 'Les composants de l\'interface doivent être utilisables.',
    items: ['Accessible au clavier', 'Temps suffisant pour lire le contenu', 'Pas de contenu provoquant des crises']
  },
  {
    letter: 'U',
    title: 'Compréhensible',
    color: '#fef3c7',
    description: "L'information et l'interface doivent être compréhensibles.",
    items: ['Texte lisible', 'Navigation prévisible', 'Aide à la saisie']
  },
  {
    letter: 'R',
    title: 'Robuste',
    color: '#f3e8ff',
    description: 'Le contenu doit fonctionner avec les technologies actuelles et futures.',
    items: ['HTML valide', 'Compatible avec les technologies d\'assistance', 'Balisage sémantique']
  }
]

const levels = [
  {
    badge: 'A',
    title: 'Niveau A',
    tag: 'Indispensable',
    color: 'success',
    description: 'Fonctionnalités d\'accessibilité de base',
    items: [
      'Les images ont un texte alternatif',
      'Les champs de formulaire ont des labels',
      'Hiérarchie de titres correcte',
      'Navigation au clavier fonctionnelle',
      'La page a un titre'
    ]
  },
  {
    badge: 'AA',
    title: 'Niveau AA',
    tag: 'Recommandé',
    color: 'primary',
    description: 'Accessibilité améliorée — cible la plus courante',
    items: [
      'Ratio de contraste minimum 4.5:1',
      'Texte redimensionnable jusqu\'à 200%',
      'Focus visible sur les éléments interactifs',
      'Plusieurs moyens de trouver les pages',
      'Navigation cohérente'
    ]
  },
  {
    badge: 'AAA',
    title: 'Niveau AAA',
    tag: 'Avancé',
    color: 'deep-purple',
    description: 'Niveau d\'accessibilité le plus élevé',
    items: [
      'Ratio de contraste 7:1',
      'Interprétation en langue des signes',
      'Audio-descriptions étendues'
    ]
  }
]

const steps = [
  { number: 1, title: 'Ouvrir EditMe.vue', description: 'Ouvrez le fichier dans votre IDE côte à côte avec le navigateur', color: 'lime-accent-1', icon: 'mdi-file-code-outline' },
  { number: 2, title: 'Identifier les problèmes', description: 'Cherchez ~10 violations d\'accessibilité dans le code', color: 'lime-accent-2', icon: 'mdi-magnify' },
  { number: 3, title: 'Corriger et sauvegarder', description: 'Appliquez vos corrections.', color: 'lime-accent-3', icon: 'mdi-wrench-outline' },
  { number: 4, title: 'Vérifier le score', description: 'Cliquez sur « Vérifier le score » pour voir votre progression', color: 'lime-accent-4', icon: 'mdi-check-decagram' }
]

const enjeux = {
  "total": {
    "value": 12000000,
    "label": "12 millions de personnes",
    "location": "France"
  },
  "handicaps": [
    {
      "type": "Handicap moteur",
      "description": "atteinte partielle ou totale de la motricité",
      "icon": "mdi-wheelchair-accessibility"
    },
    {
      "type": "Handicap visuel",
      "description": "personnes malvoyantes et non-voyantes",
      "icon": "mdi-eye-off-outline"
    },
    {
      "type": "Handicap auditif",
      "description": "personnes sourdes et malentendantes",
      "icon": "mdi-ear-hearing-off"
    },
    {
      "type": "Handicap psychique",
      "description": "troubles mentaux, affectifs et émotionnels",
      "icon": "mdi-head-heart-outline"
    },
    {
      "type": "Déficience intellectuelle",
      "description": "privation des facultés intellectuelles",
      "icon": "mdi-brain"
    },
    {
      "type": "Maladies invalidantes",
      "description": "maladies respiratoires, digestives, infectieuses",
      "icon": "mdi-hospital-box-outline"
    }
  ]
}


const activeSection = ref('introduction')
const showToc = ref(false)

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleScroll = () => {
  const scrollPosition = window.scrollY + 150

  const heroElement = document.getElementById('hero')
  if (heroElement) {
    showToc.value = scrollPosition > heroElement.offsetHeight
  }

  for (const section of contentSections) {
    const element = document.getElementById(section.id)
    if (element) {
      const { offsetTop, offsetHeight } = element
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.id
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
