<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import type { SelectItem } from '@nuxt/ui'

  const { locale, locales, setLocale } = useI18n({ useScope: 'global' })

  const items = ref<SelectItem[]>(locales.value.map((locale) => ({
    label: locale.name,
    code: locale.code,
    value: locale.code
  })))
  const currentLocale = ref(locale.value)

  useSeoMeta({
    title: 'Pastel - Accueil',
    ogTitle: 'Pastel - Accueil',
    description: 'Bienvenue sur Pastel, votre plateforme de création de contenu.',
    ogDescription: 'Bienvenue sur Pastel, votre plateforme de création de contenu.',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen">
    <h1 class="font-bold text-2xl text-(--ui-primary)">
      Pastel
    </h1>

    {{ $t('welcome') }}

    <USelect v-model="currentLocale" :items="items" @change="() => setLocale(currentLocale)" />

    <NuxtLink to="/about">About</NuxtLink>

    <div class="flex items-center gap-2">
      <UButton
        label="Documentation"
        icon="i-lucide-square-play"
        to="https://ui.nuxt.com/getting-started/installation/nuxt"
        target="_blank"
      />

      <UButton
        label="GitHub"
        color="neutral"
        variant="outline"
        icon="i-simple-icons-github"
        to="https://github.com/nuxt/ui"
        target="_blank"
      />
    </div>
  </div>
</template>