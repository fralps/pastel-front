<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { SleepTotals } from '@/models';

import { sleepTypeIcon, sleepTypeColor } from '@/constants';

definePageMeta({
  middleware: ['auth']
});

const { t } = useI18n({ useScope: 'global' });

useSeoMeta({
  title: t('meta.dashboard.insights.title'),
  description: t('meta.dashboard.insights.description'),
  ogTitle: t('meta.dashboard.insights.ogTitle'),
  ogDescription: t('meta.dashboard.insights.ogDescription')
});

const { $customFetch } = useNuxtApp();

const results = ref<SleepTotals>({
  totals: {
    dream: 0,
    lucid: 0,
    nightmare: 0,
    sleep_paralysis: 0,
    sleep_walking: 0,
    sleep_talking: 0,
    sleep_apnea: 0,
    erotic: 0
  }
});

onMounted(async () => {
  await fetchDreamInsights();
});

const fetchDreamInsights = async () => {
  const response = await $customFetch<SleepTotals>('/stats/dashboard_stats', {
    method: 'get'
  });

  if (response) results.value = response;
};
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6 pb-18">
      <div class="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div class="border-b border-gray-200 p-6 dark:border-gray-700">
          <h2 class="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <UIcon name="i-lucide-chart-column" class="size-5" />
            {{ t('insights.title') }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ t('insights.description') }}
          </p>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div
              v-for="(count, type) in results.totals"
              :key="type"
              class="rounded-lg p-6 text-center"
              :class="sleepTypeColor(type)"
            >
              <div class="flex items-center justify-center text-2xl font-bold">
                <UIcon :name="`i-lucide-${sleepTypeIcon(type)}`" class="mr-1 size-5" />
                {{ count }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ t(`dashboard.sleepType.${type}`) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
