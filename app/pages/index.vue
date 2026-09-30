<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const siteUrl = useSiteUrl();

const ogImage = `${siteUrl}/images/dashboard.webp`;

useSeoMeta({
  title: () => t('meta.landing.title'),
  ogTitle: () => t('meta.landing.ogTitle'),
  description: () => t('meta.landing.description'),
  ogDescription: () => t('meta.landing.ogDescription'),
  ogType: 'website',
  ogSiteName: 'Pastel',
  ogImage,
  ogImageAlt: () => t('landing.heroBanner.imageAlt'),
  twitterCard: 'summary_large_image',
  twitterImage: ogImage
});

// hreflang alternates, canonical and og:locale for the localized landing page.
// i18n emits relative URLs when no baseUrl is configured, so force absolute ones (required by SEO crawlers).
const toAbsoluteUrl = <T,>(url: T) => (typeof url === 'string' && url.startsWith('/') ? `${siteUrl}${url}` : url);
const i18nHead = useLocaleHead();
useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs.lang },
  link: (i18nHead.value.link || []).map((link) => ({ ...link, href: toAbsoluteUrl(link.href) })),
  meta: (i18nHead.value.meta || []).map((meta) =>
    meta.property === 'og:url' ? { ...meta, content: toAbsoluteUrl(meta.content) } : meta
  )
}));

useLandingSchemaOrg();

const links = computed(() => [
  {
    label: t('landing.heroBanner.ctaPrimary'),
    to: localePath('/auth/sign-in'),
    icon: 'i-lucide-log-in',
    size: 'md' as const
  },
  {
    label: t('landing.heroBanner.ctaSecondary'),
    to: localePath('/auth/register'),
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

      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-12 px-4 md:grid-cols-2">
        <UPageFeature
          orientation="vertical"
          :title="t('landing.featuresSection.dreams.title')"
          :description="t('landing.featuresSection.dreams.description')"
          icon="i-lucide-bed"
          class="text-center"
        />

        <UPageFeature
          orientation="vertical"
          :title="t('landing.featuresSection.nightmares.title')"
          :description="t('landing.featuresSection.nightmares.description')"
          icon="i-lucide-cloud-lightning"
          class="text-center"
        />

        <UPageFeature
          orientation="vertical"
          :title="t('landing.featuresSection.lucidDreams.title')"
          :description="t('landing.featuresSection.lucidDreams.description')"
          icon="i-lucide-rainbow"
          class="text-center"
        />

        <UPageFeature
          orientation="vertical"
          :title="t('landing.featuresSection.aiAnalysis.title')"
          :description="t('landing.featuresSection.aiAnalysis.description')"
          icon="i-lucide-wand-sparkles"
          class="text-center"
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

    <LandingFaq />

    <LandingFooter />
  </div>
</template>
