<script setup lang="ts">
  type TabType = 'home' | 'add' | 'insights'

  const activeTab = ref<TabType>('home')

  const redirectTo = (tab: TabType) => {
    switch (tab) {
      case 'home':
        navigateTo('/dashboard')
        activeTab.value = 'home'
        break
      case 'add':
        navigateTo('/dashboard/create')
        activeTab.value = 'add'
        break
      case 'insights':
        navigateTo('/dashboard/insights')
        activeTab.value = 'insights'
        break
    }
  }
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
      <div class="flex justify-around py-3">
        <button
          :class="[
            'flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors',
            activeTab === 'home' 
            ? 'bg-primary-600 text-white' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
          @click="redirectTo('home')"
        >
          <UIcon name="i-lucide-book" class="size-4" />
          <span class="text-xs">Journal</span>
        </button>
        <button
          :class="[
            'flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors',
            activeTab === 'add' 
              ? 'bg-primary-600 text-white' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
          @click="redirectTo('add')"
        >
          <UIcon name="i-lucide-plus" class="size-4" />
          <span class="text-xs">Add Dream</span>
        </button>
        <button
          :class="[
            'flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors',
            activeTab === 'insights' 
            ? 'bg-primary-600 text-white' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
          @click="redirectTo('insights')"
        >
          <UIcon name="i-lucide-chart-column" class="size-4" />
          <span class="text-xs">Insights</span>
        </button>
      </div>
  </nav>
</template>