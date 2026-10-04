<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useArtStore } from '@/stores/artStore'

const store = useArtStore()
store.init()
</script>

<template>
  <AppHeader />
  <main>
    <p v-if="store.error" class="container section" role="alert">{{ store.error }}</p>
    <RouterView v-else-if="store.loaded" />
  </main>
  <AppFooter />
</template>
