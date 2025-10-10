<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const newEntry = ref({
  title: '',
  content: '',
  type: 'dream' as const,
  mood: '',
  tags: '',
})

const handleAddEntry = () => {
  console.log('New Entry')
}
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-2">
            <UIcon name="i-lucide-plus" class="size-5" />
            Record a New Dream
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">Capture the details while they're still fresh in your memory</p>
        </div>
        <div class="p-6 space-y-4">
          <div class="space-y-2">
            <label for="title" class="block text-sm font-medium text-gray-900 dark:text-white">Dream Title</label>
            <input
              id="title"
              v-model="newEntry.title"
              type="text"
              placeholder="Give your dream a memorable title..."
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label for="type" class="block text-sm font-medium text-gray-900 dark:text-white">Dream Type</label>
              <select
                id="type"
                v-model="newEntry.type"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="dream">Regular Dream</option>
                <option value="lucid">Lucid Dream</option>
                <option value="nightmare">Nightmare</option>
              </select>
            </div>

            <div class="space-y-2">
              <label for="mood" class="block text-sm font-medium text-gray-900 dark:text-white">Mood/Feeling</label>
              <input
                id="mood"
                v-model="newEntry.mood"
                type="text"
                placeholder="How did it make you feel?"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label for="content" class="block text-sm font-medium text-gray-900 dark:text-white">Dream Description</label>
            <textarea
              id="content"
              v-model="newEntry.content"
              placeholder="Describe your dream in detail. What happened? Who was there? How did it feel?"
              rows="6"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            ></textarea>
          </div>

          <div class="space-y-2">
            <label for="tags" class="block text-sm font-medium text-gray-900 dark:text-white">Tags</label>
            <input
              id="tags"
              v-model="newEntry.tags"
              type="text"
              placeholder="Add tags separated by commas (e.g., flying, water, family)"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button
              class="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              @click="handleAddEntry"
            >
              Save Dream
            </button>
            <UColorModeButton
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors"
            >
              Cancel
            </UColorModeButton>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>