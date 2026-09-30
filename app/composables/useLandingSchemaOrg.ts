const AUTHOR = {
  name: 'fralps',
  url: 'https://fralps-dev.vercel.app/',
  sameAs: [
    'https://github.com/fralps',
    'https://fralps-dev.vercel.app/',
    'https://bsky.app/profile/fralps.bsky.social',
    'https://x.com/fralps_dev'
  ]
};

const FEATURE_KEYS = ['dreams', 'nightmares', 'lucidDreams', 'aiAnalysis'] as const;

// Serialize JSON-LD safely for an inline <script> tag
const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

// Injects the landing page schema.org graph (WebSite, WebApplication, WebPage, FAQPage) as JSON-LD
export const useLandingSchemaOrg = () => {
  const { t, locale, locales, localeProperties } = useI18n();
  const localePath = useLocalePath();
  const siteUrl = useSiteUrl();
  const faq = useLandingFaq();

  const graph = computed(() => {
    const pageUrl = `${siteUrl}${localePath('/')}`;
    const language = localeProperties.value.language ?? locale.value;
    const siteLanguages = locales.value.map((l) => l.language ?? l.code);

    const ids = {
      author: `${siteUrl}/#author`,
      website: `${siteUrl}/#website`,
      app: `${siteUrl}/#app`,
      image: `${siteUrl}/#primaryimage`,
      webpage: `${pageUrl}#webpage`,
      faq: `${pageUrl}#faq`
    };

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': ids.author,
          name: AUTHOR.name,
          url: AUTHOR.url,
          sameAs: AUTHOR.sameAs
        },
        {
          '@type': 'WebSite',
          '@id': ids.website,
          url: `${siteUrl}/`,
          name: 'Pastel',
          description: t('meta.landing.description'),
          inLanguage: siteLanguages,
          publisher: { '@id': ids.author }
        },
        {
          '@type': 'ImageObject',
          '@id': ids.image,
          url: `${siteUrl}/images/dashboard.webp`,
          caption: t('landing.heroBanner.imageAlt')
        },
        {
          '@type': 'WebApplication',
          '@id': ids.app,
          name: 'Pastel',
          url: pageUrl,
          description: t('landing.heroBanner.description'),
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'Web',
          browserRequirements: 'Requires JavaScript. Requires HTML5.',
          inLanguage: siteLanguages,
          image: { '@id': ids.image },
          featureList: FEATURE_KEYS.map((key) => t(`landing.featuresSection.${key}.title`)),
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR'
          },
          author: { '@id': ids.author }
        },
        {
          '@type': 'WebPage',
          '@id': ids.webpage,
          url: pageUrl,
          name: t('meta.landing.title'),
          description: t('meta.landing.description'),
          inLanguage: language,
          isPartOf: { '@id': ids.website },
          about: { '@id': ids.app },
          primaryImageOfPage: { '@id': ids.image }
        },
        {
          '@type': 'FAQPage',
          '@id': ids.faq,
          url: `${pageUrl}#faq`,
          name: t('landing.faqSection.title'),
          inLanguage: language,
          isPartOf: { '@id': ids.webpage },
          mainEntity: faq.value.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: answer
            }
          }))
        }
      ]
    };
  });

  useHead({
    script: [
      {
        key: 'schema-org-graph',
        type: 'application/ld+json',
        innerHTML: computed(() => toJsonLd(graph.value))
      }
    ]
  });
};
