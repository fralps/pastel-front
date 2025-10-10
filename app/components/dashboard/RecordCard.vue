<script setup lang="ts">
import { defineProps } from 'vue'
import type { Dream } from '@/models'

const props = defineProps<{
  entry: Dream
}>()

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'lucid':
      return 'sparkles'
    case 'nightmare':
      return 'moon'
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
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">{{ props.entry.title }}</h3>
          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <UIcon name="i-lucide-calendar" class="size-3" />
            {{ new Date(props.entry.date).toLocaleDateString() }}
            <template v-if="entry.mood">
              <span>•</span>
              <span>{{ props.entry.mood }}</span>
            </template>
          </div>
        </div>
        <span :class="['inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium', getTypeColor(props.entry.type)]">
          <UIcon :name="`i-lucide-${getTypeIcon(props.entry.type)}`" class="size-4" />
          {{ props.entry.type }}
        </span>
      </div>
    </div>
    <div class="px-6 pb-6">
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ props.entry.content }}</p>
      <div v-if="props.entry.tags.length > 0" class="flex flex-wrap gap-1">
        <span 
          v-for="(tag, index) in props.entry.tags" 
          :key="index" 
          class="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded"
        >
          {{ tag }}
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