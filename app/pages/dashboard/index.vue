<script setup lang="ts">
import { ref } from 'vue'
import type { Dream } from '@/models'

const { t } = useI18n()

useSeoMeta({
  title: t('meta.dashboard.index.title'),
  description: t('meta.dashboard.index.description'),
  ogTitle: t('meta.dashboard.index.ogTitle'),
  ogDescription: t('meta.dashboard.index.ogDescription')
})

const entries = ref<Dream[]>([
  {
    id: '1',
    title: 'Flying Over Mountains',
    content: 'I was soaring through clouds above snow-capped peaks. The feeling of freedom was incredible...',
    type: 'lucid',
    date: '2024-01-15',
    mood: 'Peaceful',
    tags: ['flying', 'mountains', 'freedom'],
  },
  {
    id: '2',
    title: 'Lost in a Forest',
    content: 'Dark trees surrounded me, and I couldn\'t find my way out. The shadows seemed to move...',
    type: 'nightmare',
    date: '2024-01-14',
    mood: 'Anxious',
    tags: ['forest', 'lost', 'darkness'],
  },
  {
    id: '3',
    title: 'Lost in a Forest',
    content: 'Dark trees surrounded me, and I couldn\'t find my way out. The shadows seemed to move...',
    type: 'dream',
    date: '2024-01-14',
    mood: 'Anxious',
    tags: ['forest', 'lost', 'darkness'],
  },
])
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Welcome Section -->
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
        <div class="p-6">
          <h2 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-2">
            <UIcon name="i-lucide-star" class="size-5" />
            Welcome to Your Dream World
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            You have {{ entries.length }} dreams recorded. Keep exploring your subconscious mind.
          </p>
        </div>
      </div>

      <!-- Dreams list -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Dreams</h2>
          <button
            class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <UIcon name="i-lucide-plus" class="size-4" />
            Add Dream
          </button>
        </div>

        <div class="grid gap-4 pb-18">
          <DashboardRecordCard
            v-for="entry in entries"
            :key="entry.id"
            :entry="entry"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
