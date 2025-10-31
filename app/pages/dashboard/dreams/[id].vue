<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Sleep } from '@/models'
import { sleepTypeIcon, sleepTypeColor } from '~/constants'

const router = useRouter()
const { $customFetch } = useNuxtApp()
const { t, locale } = useI18n()

useSeoMeta({
  title: t('meta.dashboard.show.title'),
  description: t('meta.dashboard.show.description'),
  ogTitle: t('meta.dashboard.show.ogTitle'),
  ogDescription: t('meta.dashboard.show.ogDescription')
})

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
})

onMounted(async () => {
  await fetchDreamDetails()
})

const fetchDreamDetails = async () => {
  const response = await $customFetch(`/sleeps/${router.currentRoute.value.params.id}`, {
    method: 'get'
  })

  console.log(response);
  

  if (response && Object.keys(response).length > 0) {
    dreamDetails.value = response as Sleep
  }
}

const editDream = () => {
  console.log('EDIT');
}

const deleteDream = () => {
  console.log('DELETE');
}
</script>

<template>
  <NuxtLayout name="dashboard">
     <UButton
      icon="i-lucide-arrow-left"
      color="neutral"
      variant="outline"
      :ui="{
        leadingIcon: 'text-primary'
      }"
    >
      <NuxtLink :to="$localePath('dashboard')">{{ $t('dashboard.create.goBack') }}</NuxtLink>
    </UButton>

    <!-- Dream content -->
    <main v-if="dreamDetails.id" class="pb-18 mt-6">
      <article class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Dream header -->
        <div class="p-6 sm:p-8 border-b border-primary-100">
          <div class="block md:flex flex-wrap items-start justify-between gap-4 mb-4">
            <div class="flex-1 min-w-0">
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-balance">
                {{ dreamDetails.title }}
              </h1>
              <time class="text-sm text-gray-500 flex items-center gap-1.5">
                <UIcon name="i-lucide-calendar" class="size-4 text-primary" />
                {{ dreamDetails.date ? new Date(dreamDetails.date).toLocaleDateString(locale) : '' }}
              </time>
            </div>

            <!-- Dream type badge -->
            <span :class="['inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium mt-4 md:mt-0', sleepTypeColor(dreamDetails.sleep_type)]">
              <UIcon :name="`i-lucide-${sleepTypeIcon(dreamDetails.sleep_type)}`" class="size-4" />
              {{ t('dashboard.sleepType.' + dreamDetails.sleep_type) }}
            </span>
          </div>

          <!-- Metadata row -->
          <div class="flex flex-wrap gap-4 text-sm">
            <!-- Mood -->
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-smile" class="size-4 text-primary" />
              <span class="text-gray-700">Humeur: <strong>{{ dreamDetails.current_mood }}</strong></span>
            </div>

            <!-- Lucidity level (if lucid dream) -->
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-brain" class="size-4 text-primary" />
              <span class="text-gray-700">Lucidité : <strong>{{ t('dashboard.intensity.' + dreamDetails.intensity) }}</strong></span>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 text-sm mt-4">
            <!-- Happened -->
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-watch" class="size-4 text-primary" />
              <span class="text-gray-700">Contexte : <strong>{{ t('dashboard.happened.' + dreamDetails.happened) }}</strong></span>
            </div>
          </div>

          <!-- Tags -->
          <div v-if="dreamDetails.tags_attributes && dreamDetails.tags_attributes.length > 0" class="flex flex-wrap items-center gap-2 mt-4">
            <UIcon name="i-lucide-tag" class="size-4 text-primary" />
            <span 
              v-for="(tag, index) in dreamDetails.tags_attributes" 
              :key="`tag-${tag.id}-${index}`" 
              class="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>

        <!-- Dream description -->
        <div class="p-6 sm:p-8">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <UIcon name="i-lucide-book-open" class="size-5 text-primary" />
            Description du rêve
          </h2>
          <div class="prose prose-rose max-w-none">
            <p class="text-gray-700 leading-relaxed text-pretty whitespace-pre-wrap">
              {{ dreamDetails.description }}
            </p>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="p-6 sm:p-8 border-t border-primary-100 flex flex-wrap gap-3">
          <UButton
            icon="i-lucide-pen"
            size="sm"
            color="primary"
            variant="outline"
            class="text-xs cursor-pointer"
            @click="editDream()"
          >
            Modifier
          </UButton>

          <UButton
            icon="i-lucide-log-out"
            size="sm"
            color="error"
            variant="outline"
            class="text-xs cursor-pointer"
            @click="deleteDream()"
          >
            Supprimer
          </UButton>
        </div>
      </article>
    </main>
  </NuxtLayout>
</template>