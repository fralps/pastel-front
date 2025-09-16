<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import type { SelectItem, NavigationMenuItem  } from '@nuxt/ui'

  
  const { locale, locales, setLocale } = useI18n({ useScope: 'global' })

  const items = ref<SelectItem[]>(locales.value.map((locale) => ({
    label: locale.name,
    code: locale.code,
    value: locale.code
  })))
  const currentLocale = ref(locale.value)

  const links = ref([
    {
      label: 'Documentation',
      to: 'https://ui.nuxt.com/getting-started/installation/nuxt',
      color: 'neutral',
      icon: 'i-lucide-square-play'
    },
    {
      label: 'Github',
      to: 'https://github.com/nuxt/ui',
      color: 'neutral',
      variant: 'outline',
      trailingIcon: 'i-simple-icons-github'
    }
  ])

  useSeoMeta({
    title: 'Pastel - Accueil',
    ogTitle: 'Pastel - Accueil',
    description: 'Bienvenue sur Pastel, votre plateforme de création de contenu.',
    ogDescription: 'Bienvenue sur Pastel, votre plateforme de création de contenu.',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
  })

const route = useRoute()

const navLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Docs',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs/getting-started')
  },
  {
    label: 'Components',
    to: '/docs/components',
    active: route.path.startsWith('/docs/components')
  },
  {
    label: 'Figma',
    to: 'https://go.nuxt.com/figma-ui',
    target: '_blank'
  },
  {
    label: 'Releases',
    to: 'https://github.com/nuxt/ui/releases',
    target: '_blank'
  }
])
</script>

<template>
  <div>
    <UHeader>
      <template #title>
        <Logo class="h-6 w-auto" />
      </template>

      <UNavigationMenu :items="navLinks" />

      <template #right>
        <UColorModeButton />

        <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
          <UButton
            color="neutral"
            variant="ghost"
            to="https://github.com/nuxt/ui"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
          />
        </UTooltip>
      </template>
    </UHeader>
    <UPageHero
      title="Pastel"
      description="Create and keep your dreams alive."
      :links="links"
      headline="The ultimate dreams diary platform"
    />

    {{ $t('welcome') }}

      <USelect v-model="currentLocale" :items="items" @change="() => setLocale(currentLocale)" />

    <NuxtLink to="/about">About</NuxtLink>
  </div>
</template>