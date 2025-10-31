<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import type { SleepTotals } from "@/models";
import { sleepTypeIcon, sleepTypeColor } from "@/constants";

definePageMeta({
  middleware: ["auth"],
});

const { t } = useI18n({ useScope: "global" });

useSeoMeta({
  title: t("meta.dashboard.insights.title"),
  description: t("meta.dashboard.insights.description"),
  ogTitle: t("meta.dashboard.insights.ogTitle"),
  ogDescription: t("meta.dashboard.insights.ogDescription"),
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
    erotic: 0,
  },
});

onMounted(async () => {
  await fetchDreamInsights();
});

const fetchDreamInsights = async () => {
  const response = await $customFetch<SleepTotals>("/stats/dashboard_stats", {
    method: "get",
  });

  if (response) results.value = response;
};
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6 pb-18">
      <div
        class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
      >
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2
            class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-2"
          >
            <UIcon name="i-lucide-chart-column" class="size-5" />
            {{ $t("insights.title") }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t("insights.description") }}
          </p>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(count, type) in results.totals"
              :key="type"
              class="text-center p-6 rounded-lg"
              :class="sleepTypeColor(type)"
            >
              <div class="text-2xl font-bold flex items-center justify-center">
                <UIcon
                  :name="`i-lucide-${sleepTypeIcon(type)}`"
                  class="size-5 mr-1"
                />
                {{ count }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t(`dashboard.sleepType.${type}`) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
