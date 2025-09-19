<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  const { t } = useI18n()

  const items = computed<NavigationMenuItem[]>(() => [
    {
      label: t('landing.header.feature'),
      to: '#features',
      icon: 'i-heroicons-cube-20-solid'
    },
    {
      label: t('landing.header.demo'),
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
