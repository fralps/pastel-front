<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: $t('meta.landing.title'),
  ogTitle: $t('meta.landing.ogTitle'),
  description: $t('meta.landing.description'),
  ogDescription: $t('meta.landing.ogDescription'),
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image'
});

const links = ref([
  {
    label: $t('landing.heroBanner.ctaPrimary'),
    to: '/auth/sign-in',
    icon: 'i-lucide-log-in',
    size: 'md' as const
  },
  {
    label: $t('landing.heroBanner.ctaSecondary'),
    to: '/auth/register',
    color: 'neutral' as const,
    variant: 'subtle' as const,
    trailingIcon: 'i-lucide-milestone',
    size: 'md' as const
  }
]);
</script>

<template>
  <div>
    <LandingHeader />

    <UPageHero :title="t('landing.heroBanner.title')" :description="t('landing.heroBanner.description')" :links="links">
      <NuxtImg
        src="/images/dashboard.webp"
        loading="lazy"
        preload
        :alt="t('landing.heroBanner.imageAlt')"
        class="mx-auto w-full rounded-lg shadow-2xl ring ring-default md:w-3/4"
      />
    </UPageHero>

    <section id="features">
      <UPageSection :title="t('landing.featuresSection.title')" icon="i-lucide-package" />

      <div class="mx-4 block gap-12 md:flex">
        <UPageFeature
          orientation="vertical"
          :title="t('landing.featuresSection.dreams.title')"
          :description="t('landing.featuresSection.dreams.description')"
          icon="i-lucide-bed"
          class="text-center md:w-[33%]"
        />

        <UPageFeature
          orientation="vertical"
          :title="t('landing.featuresSection.nightmares.title')"
          :description="t('landing.featuresSection.nightmares.description')"
          icon="i-lucide-cloud-lightning"
          class="text-center md:w-[33%]"
        />

        <UPageFeature
          orientation="vertical"
          :title="t('landing.featuresSection.lucidDreams.title')"
          :description="t('landing.featuresSection.lucidDreams.description')"
          icon="i-lucide-rainbow"
          class="text-center md:w-[33%]"
        />
      </div>
    </section>

    <section id="demo" class="mb-20 px-6 md:px-0">
      <UPageSection
        :title="t('landing.demoSection.title')"
        :description="t('landing.demoSection.description')"
        icon="i-lucide-play-circle"
      />

      <video class="mx-auto w-full rounded-lg shadow-2xl ring ring-default md:w-3/4" controls preload="metadata">
        <source src="/videos/app-demo.mp4" type="video/mp4" />
        {{ t('landing.demoSection.browserNotSupported') }}
      </video>
    </section>

    <LandingFooter />
  </div>
</template>
