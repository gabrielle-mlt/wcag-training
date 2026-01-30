<script setup>
import { useRoute } from 'vue-router'
import './assets/hero-background.css'

const route = useRoute()
</script>

<template>
  <v-app class="app-background">
    <!-- Decorative background bubbles (fixed, all pages) -->
    <div class="bg-bubbles" aria-hidden="true" role="presentation">
      <div class="bubble bubble-1"></div>
      <div class="bubble bubble-2"></div>
      <div class="bubble bubble-3"></div>
      <div class="bubble bubble-4"></div>
    </div>

    <v-app-bar color="transparent" flat class="app-bar px-6">
      <!-- Logo / Brand on left -->
      <div class="brand">
        <v-icon size="32" color="primary" class="mr-2">mdi-human-handsup</v-icon>
        <span class="brand-text">Formation WCAG</span>
      </div>

      <v-spacer></v-spacer>

      <!-- Navigation in center -->
      <nav class="nav-center">
        <v-btn
          to="/"
          :class="{ 'nav-active': route.path === '/' }"
          variant="text"
          class="nav-btn"
        >
          Présentation
        </v-btn>

        <v-btn
          to="/rules"
          :class="{ 'nav-active': route.path === '/rules' }"
          variant="text"
          class="nav-btn"
        >
          Règles
        </v-btn>

        <v-btn
          to="/playground"
          :class="{ 'nav-active': route.path === '/playground' }"
          variant="text"
          class="nav-btn"
        >
          Atelier
        </v-btn>
      </nav>

      <v-spacer></v-spacer>

      <!-- Actions on right -->
      <div class="actions">
        <v-btn
          icon="mdi-github"
          variant="text"
          href="https://github.com"
          target="_blank"
          color="primary"
        ></v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  font-family: 'Poppins', sans-serif;
}

.app-background {
  background: linear-gradient(135deg, #f5f7fa 0%, hsl(219, 100%, 93%) 100%) !important;
  min-height: 100vh;
}

.app-bar {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.7) !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.brand {
  display: flex;
  align-items: center;
  min-width: 180px;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
}

.nav-center {
  display: flex;
  gap: 0.5rem;
}

.nav-btn {
  color: #64748b !important;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  color: #1e40af !important;
  background: rgba(30, 64, 175, 0.08) !important;
}

.nav-btn.nav-active {
  color: #1e40af !important;
  background: rgba(30, 64, 175, 0.12) !important;
}

.actions {
  min-width: 180px;
  display: flex;
  justify-content: flex-end;
}
</style>
