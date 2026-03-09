<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { t } = useI18n();

const items: NavigationMenuItem[] = [
  {
    label: t('landing.footer.features'),
    to: '#features'
  },
  {
    label: t('landing.footer.demo'),
    to: '#demo'
  }
];
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-sm text-muted">Pastel, {{ t('landing.footer.rights') }} {{ new Date().getFullYear() }}</p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        size="xs"
        to="https://github.com/nuxt/nuxt"
        target="_blank"
        aria-label="GitHub"
      />
      <UButton
        icon="i-lucide-globe"
        color="neutral"
        variant="ghost"
        size="xs"
        to="https://fralps-dev.vercel.app/"
        target="_blank"
        aria-label="Portfolio"
      />
      <UButton
        icon="i-simple-icons-bento"
        color="neutral"
        variant="ghost"
        size="xs"
        to="https://bento.me/francoisloupias"
        target="_blank"
        aria-label="Bento"
      />
      <UButton
        icon="i-simple-icons-bluesky"
        color="neutral"
        variant="ghost"
        size="xs"
        to="https://bsky.app/profile/fralps.bsky.social"
        target="_blank"
        aria-label="Bluesky"
      />
      <UButton
        icon="i-simple-icons-x"
        color="neutral"
        variant="ghost"
        size="xs"
        to="https://x.com/fralps_dev"
        target="_blank"
        aria-label="X"
      />
    </template>
  </UFooter>
</template>
