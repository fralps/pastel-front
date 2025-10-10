<script setup lang="ts">
import { defineProps } from 'vue'
import type { Dream } from '@/models'

const { t } = useI18n()

const props = defineProps<{
  dream: Dream
}>()

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'lucid':
      return 'sparkles'
    case 'nightmare':
      return 'moon'
    case 'dream':
      return 'star'
    case 'erotic':
      return 'heart'
    case 'sleep_paralysis':
      return 'angry'
    case 'sleep_talking':
      return 'speech'
    case 'sleep_apnea':
      return 'wind'
    case 'sleep_walking':
      return 'footprints'
    default:
      return 'star'
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'lucid':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    case 'nightmare':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    case 'dream':
      return 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
    case 'erotic':
      return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400'
    case 'sleep_paralysis':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    case 'sleep_talking':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    case 'sleep_apnea':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    case 'sleep_walking':
      return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
    default:
      return 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
  }
}
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
  >
    <div class="p-6 pb-3">
      <div class="flex items-start justify-between">
        <div class="space-y-1">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">{{ props.dream.title }}</h3>
          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <UIcon name="i-lucide-calendar" class="size-3" />
            {{ new Date(props.dream.date).toLocaleDateString() }}
            <template v-if="dream.current_mood">
              <span>•</span>
              <span>{{ props.dream.current_mood }}</span>
            </template>
          </div>
        </div>
        <span :class="['inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium', getTypeColor(props.dream.sleep_type)]">
          <UIcon :name="`i-lucide-${getTypeIcon(props.dream.sleep_type)}`" class="size-4" />
          {{ t('dashboard.sleep_type.' + props.dream.sleep_type) }}
        </span>
      </div>
    </div>
    <div class="px-6 pb-6">
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ props.dream.description }}</p>
      <div v-if="props.dream.tags_attributes.length > 0" class="flex flex-wrap gap-1">
        <span 
          v-for="(tag, index) in props.dream.tags_attributes" 
          :key="`tag-${tag.id}-${index}`" 
          class="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded"
        >
          {{ tag.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>