<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

const { t } = useI18n();
const faq = useLandingFaq();

const items = computed<AccordionItem[]>(() =>
  faq.value.map(({ key, question, answer }) => ({
    value: key,
    label: question,
    content: answer
  }))
);
</script>

<template>
  <section id="faq" class="mb-20 px-6 md:px-0">
    <UPageSection
      :title="t('landing.faqSection.title')"
      :description="t('landing.faqSection.description')"
      icon="i-lucide-circle-help"
    />

    <div class="mx-auto w-full max-w-3xl">
      <!-- Keep answers in the DOM when collapsed so they are indexable -->
      <UAccordion
        :items="items"
        type="multiple"
        :unmount-on-hide="false"
        :ui="{ trigger: 'text-base', body: 'text-muted' }"
      />
    </div>
  </section>
</template>
