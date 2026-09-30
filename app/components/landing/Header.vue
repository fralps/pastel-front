<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { t } = useI18n();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t('landing.header.feature'),
    to: '#features',
    icon: 'i-lucide-box'
  },
  {
    label: t('landing.header.demo'),
    to: '#demo',
    icon: 'i-lucide-circle-play'
  },
  {
    label: t('landing.header.faq'),
    to: '#faq',
    icon: 'i-lucide-circle-help'
  }
]);
</script>

<template>
  <UHeader>
    <template #title>
      <span class="text-2xl text-primary">Pastel</span>
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
