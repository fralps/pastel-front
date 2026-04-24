<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import type { Sleep } from '@/models';

import { sleepTypeIcon, sleepTypeColor, sleepTypeTextColor } from '~/constants';

const router = useRouter();
const toast = useToast();
const { $customFetch } = useNuxtApp();
const { t, locale } = useI18n();
const localePath = useLocalePath();

useSeoMeta({
  title: t('meta.dashboard.show.title'),
  description: t('meta.dashboard.show.description'),
  ogTitle: t('meta.dashboard.show.ogTitle'),
  ogDescription: t('meta.dashboard.show.ogDescription')
});

const dreamDetails = ref<Sleep>({
  id: null,
  title: null,
  description: null,
  sleep_type: null,
  happened: null,
  intensity: null,
  current_mood: null,
  tags_attributes: [],
  date: null,
  created_at: null,
  updated_at: null
});
const loading = ref(false);
const analysisInProgress = ref(false);
const POLLING_INTERVAL_MS = 5000;
let pollingTimeout: ReturnType<typeof setTimeout> | null = null;
let pollingActive = false;

const stopPolling = (): void => {
  pollingActive = false;

  if (!pollingTimeout) return;

  clearTimeout(pollingTimeout);
  pollingTimeout = null;
};

const scheduleNextPoll = (): void => {
  if (!pollingActive) return;

  pollingTimeout = setTimeout(async () => {
    if (!pollingActive) {
      pollingTimeout = null;
      return;
    }

    try {
      await fetchDreamDetails();
    } catch (error) {
      console.error('Failed to fetch dream details during polling:', error);
    } finally {
      pollingTimeout = null;

      if (pollingActive && analysisInProgress.value) {
        scheduleNextPoll();
      }
    }
  }, POLLING_INTERVAL_MS);
};

const startPolling = (): void => {
  if (pollingActive) return;

  pollingActive = true;
  scheduleNextPoll();
};
onMounted(async () => {
  await fetchDreamDetails();
});

onUnmounted(() => {
  stopPolling();
});

const fetchDreamDetails = async (): Promise<void> => {
  const response = await $customFetch(`/sleeps/${router.currentRoute.value.params.id}`, {
    method: 'get'
  });

  if (response && Object.keys(response).length > 0) {
    const wasPolling = pollingActive;
    dreamDetails.value = response as Sleep;
    analysisInProgress.value = dreamDetails.value.analysis_status === 'in_progress';

    if (dreamDetails.value.analysis_status === 'in_progress') {
      startPolling();
    } else {
      stopPolling();
      if (wasPolling && dreamDetails.value.analysis_status === 'done') {
        toast.add({
          title: t('dashboard.show.analysisCompleteTitle'),
          description: t('dashboard.show.analysisCompleteDesc'),
          color: 'success'
        });
      }
    }
  }
};

const editDream = async (): Promise<void> => {
  await router.push(`/dashboard/dreams/edit/${dreamDetails.value.id}`);
};

const runSleepAnalysis = async (): Promise<void> => {
  if (dreamDetails.value.analysis_status !== 'not_started') return;

  const response = await $customFetch(`/sleeps/${router.currentRoute.value.params.id}/analyse`, {
    method: 'post',
    body: { locale: locale.value }
  });

  if (response) {
    analysisInProgress.value = true;
    await fetchDreamDetails();
  }
};

const deleteDream = async (): Promise<void> => {
  loading.value = true;
  await $customFetch(`/sleeps/${router.currentRoute.value.params.id}`, {
    method: 'delete'
  });

  toast.add({
    title: t('dashboard.show.actions.deleteSuccessTitle'),
    description: t('dashboard.show.actions.deleteSuccessDesc'),
    color: 'success'
  });

  await router.push('/dashboard');
  loading.value = false;
};
</script>

<template>
  <NuxtLayout name="dashboard">
    <UButton
      icon="i-lucide-arrow-left"
      color="neutral"
      variant="outline"
      :ui="{
        leadingIcon: sleepTypeTextColor(dreamDetails.sleep_type)
      }"
    >
      <NuxtLink :to="localePath('dashboard')">{{ t('dashboard.create.goBack') }}</NuxtLink>
    </UButton>

    <!-- Dream content -->
    <main v-if="dreamDetails.id" class="mt-6 pb-18">
      <article
        class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
      >
        <!-- Dream header -->
        <div class="border-b border-primary-100 p-6 sm:p-8 dark:border-gray-700">
          <div class="mb-4 block flex-wrap items-start justify-between gap-4 md:flex">
            <div class="min-w-0 flex-1">
              <h1
                class="mb-2 text-2xl font-bold text-balance sm:text-3xl"
                :class="sleepTypeTextColor(dreamDetails.sleep_type)"
              >
                {{ dreamDetails.title }}
              </h1>
              <time class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <UIcon name="i-lucide-calendar" class="size-4" :class="sleepTypeTextColor(dreamDetails.sleep_type)" />
                {{ dreamDetails.date ? new Date(dreamDetails.date).toLocaleDateString(locale) : '' }}
              </time>
            </div>

            <!-- Dream type badge -->
            <span
              :class="[
                'mt-4 inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium md:mt-0',
                sleepTypeColor(dreamDetails.sleep_type),
                'border border-gray-200 dark:border-gray-700',
                'bg-gray-100 dark:bg-gray-900',
                'text-gray-700 dark:text-gray-300'
              ]"
            >
              <UIcon :name="`i-lucide-${sleepTypeIcon(dreamDetails.sleep_type)}`" class="size-4" />
              {{ t('dashboard.sleepType.' + dreamDetails.sleep_type) }}
            </span>
          </div>

          <!-- Metadata row -->
          <div class="flex flex-wrap gap-4 text-sm">
            <!-- Happened -->
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-watch" class="size-4" :class="sleepTypeTextColor(dreamDetails.sleep_type)" />
              <span class="text-gray-700 dark:text-gray-300"
                >{{ t('dashboard.show.happened') }}
                <strong>{{ t('dashboard.happened.' + dreamDetails.happened) }}</strong></span
              >
            </div>

            <!-- Lucidity level (if lucid dream) -->
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-brain" class="size-4" :class="sleepTypeTextColor(dreamDetails.sleep_type)" />
              <span class="text-gray-700 dark:text-gray-300"
                >{{ t('dashboard.show.intensity') }}
                <strong>{{ t('dashboard.intensity.' + dreamDetails.intensity) }}</strong></span
              >
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-4 text-sm">
            <!-- Current mood -->
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-smile" class="size-4" :class="sleepTypeTextColor(dreamDetails.sleep_type)" />
              <span class="text-gray-700 dark:text-gray-300"
                >{{ t('dashboard.show.currentMood') }} <strong>{{ dreamDetails.current_mood }}</strong></span
              >
            </div>
          </div>

          <!-- Tags -->
          <div
            v-if="dreamDetails.tags_attributes && dreamDetails.tags_attributes.length > 0"
            class="mt-4 flex flex-wrap items-center gap-2"
          >
            <UIcon name="i-lucide-tag" class="size-4" :class="sleepTypeTextColor(dreamDetails.sleep_type)" />
            <span
              v-for="(tag, index) in dreamDetails.tags_attributes"
              :key="`tag-${tag.id}-${index}`"
              class="rounded border border-gray-300 bg-gray-50 px-2 py-1 text-xs text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>

        <!-- Dream description -->
        <div class="p-6 sm:p-8">
          <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <UIcon name="i-lucide-book-open" class="size-5" :class="sleepTypeTextColor(dreamDetails.sleep_type)" />
            {{ t('dashboard.show.description') }}
          </h2>
          <div class="prose prose-rose max-w-none">
            <p class="leading-relaxed text-pretty whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {{ dreamDetails.description }}
            </p>
          </div>
        </div>

        <!-- Dream analysis -->
        <div class="p-6 sm:p-8">
          <div class="mb-4 flex items-center gap-4">
            <h2 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <UIcon
                name="i-lucide-wand-sparkles"
                class="size-5"
                :class="sleepTypeTextColor(dreamDetails.sleep_type)"
              />
              {{ t('dashboard.show.analysis') }}
            </h2>

            <UButton
              v-if="dreamDetails.analysis_status === 'not_started' && !analysisInProgress"
              icon="i-lucide-wand-sparkles"
              size="sm"
              color="neutral"
              variant="outline"
              class="cursor-pointer text-xs"
              :class="sleepTypeTextColor(dreamDetails.sleep_type)"
              @click="runSleepAnalysis()"
            >
              {{ t('dashboard.show.actions.runAnalysis') }}
            </UButton>
          </div>

          <div class="prose prose-rose max-w-none">
            <p v-if="analysisInProgress" class="flex items-center gap-2 text-xs">
              <UIcon
                name="i-lucide-loader"
                class="size-4 animate-spin"
                :class="sleepTypeTextColor(dreamDetails.sleep_type)"
              />
              {{ t('dashboard.show.analysisInProgress') }}
            </p>

            <MDC v-else-if="dreamDetails.analysis" :value="dreamDetails.analysis" tag="analysis" />
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex flex-wrap justify-center gap-3 border-t border-primary-100 p-6 sm:p-8 dark:border-gray-700">
          <UButton
            icon="i-lucide-pen"
            size="sm"
            color="primary"
            variant="outline"
            class="cursor-pointer text-xs"
            @click="editDream()"
          >
            {{ t('dashboard.show.actions.edit') }}
          </UButton>

          <UButton
            icon="i-lucide-trash"
            size="sm"
            color="error"
            variant="outline"
            class="cursor-pointer text-xs"
            :loading="loading"
            loading-icon="i-lucide-loader"
            @click="deleteDream()"
          >
            {{ t('dashboard.show.actions.delete') }}
          </UButton>
        </div>
      </article>
    </main>
  </NuxtLayout>
</template>
