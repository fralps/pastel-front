<script setup lang="ts">
import { ref } from 'vue'
import type { Dream } from '@/models'

definePageMeta({
  middleware: ['auth'],
})

const entries = ref<Dream[]>([
  {
    id: 1,
    title: 'Flying Over Mountains',
    description: 'I was soaring through clouds above snow-capped peaks. The feeling of freedom was incredible...',
    sleep_type: 'lucid',
    date: '2024-01-15',
    current_mood: 'Peaceful',
    tags_attributes: [
      { id: 1, name: 'flying' },
      { id: 2, name: 'mountains' },
      { id: 3, name: 'freedom' },
    ]
  },
  {
    id: 2,
    title: 'Lost in a Forest',
    description: 'Dark trees surrounded me, and I couldn\'t find my way out. The shadows seemed to move...',
    sleep_type: 'nightmare',
    date: '2024-01-14',
    current_mood: 'Anxious',
   tags_attributes: [
      { id: 1, name: 'flying' },
      { id: 2, name: 'mountains' },
      { id: 3, name: 'freedom' },
    ]
  },
  {
    id: 3,
    title: 'Lost in a Forest',
    description: 'Dark trees surrounded me, and I couldn\'t find my way out. The shadows seemed to move...',
    sleep_type: 'dream',
    date: '2024-01-14',
    current_mood: 'Anxious',
    tags_attributes: [
      { id: 1, name: 'flying' },
      { id: 2, name: 'mountains' },
      { id: 3, name: 'freedom' },
    ]
  },
])

</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-2">
            <!-- <IconChart class="w-5 h-5" /> -->
            <UIcon name="i-lucide-chart" class="size-5" />
            Dream Insights
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">Patterns and statistics from your dream journal</p>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {{ entries.filter(e => e.sleep_type === 'dream').length }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Regular Dreams</div>
            </div>
            <div class="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {{ entries.filter(e => e.sleep_type === 'lucid').length }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Lucid Dreams</div>
            </div>
            <div class="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">
                {{ entries.filter(e => e.sleep_type === 'nightmare').length }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Nightmares</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>