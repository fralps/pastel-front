<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Features',
    to: '#features',
    icon: 'i-heroicons-cube-20-solid'
  },
  {
    label: 'Demo',
    to: '#demo',
    icon: 'i-heroicons-play-circle-20-solid',
  }
])
</script>

<template>
  <UHeader>
    <template #title>
     <span class="text-primary text-2xl">Pastel</span>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <LocaleSelect />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
