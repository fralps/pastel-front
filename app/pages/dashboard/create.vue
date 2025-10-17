<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { sleepTypeOptions, intensityOptions, happenedOptions } from '@/constants'
import type { Dream } from '@/models'

definePageMeta({
  middleware: ['auth'],
})

const { t, locale } = useI18n({ useScope: 'global' })

useSeoMeta({
  title: t('meta.dashboard.create.title'),
  description: t('meta.dashboard.create.description'),
  ogTitle: t('meta.dashboard.create.title'),
  ogDescription: t('meta.dashboard.create.description')
})


const formattedLocale = locale.value.replace('_', '-')

const df = new DateFormatter(formattedLocale, {
  dateStyle: 'full'
})


const mappedSleepTypeOptions = sleepTypeOptions.map(option => ({
  label: t(option.label),
  value: option.value
}))

const mappedHappenedOptions = happenedOptions.map(option => ({
  label: t(option.label),
  value: option.value
}))

const mappedIntensityOptions = intensityOptions.map(option => ({
  label: t(option.label),
  value: option.value
}))

const schema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  sleep_type: z.string(),
  intensity: z.string(),
  happened: z.string(),
  current_mood: z.string().min(2).max(20),
  date: z.any(),
  tags_attributes: z.array(z.object({ name: z.string() }))
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  title: '',
  description: '',
  sleep_type: 'dream',
  intensity: 'clear',
  happened: 'sleeping',
  current_mood: '',
  date: shallowRef(new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())), // Months are 1-indexed
  tags_attributes: [] as { name: string }[]
})

const { $customFetch } = useNuxtApp()
const toast = useToast()

const tags = ref<string[]>([])

async function onSubmit(event: FormSubmitEvent<Schema>) {
  formatTags(event.data)

  const response = await $customFetch<Dream>('/sleeps', {
    method: 'POST',
    body: { sleep: event.data }
  })

  if (response?.id) {
    toast.add({ title: t('dashboard.create.toast.success'), color: 'success' })
    await navigateTo('/dashboard')
  } else {
    toast.add({ title: t('dashboard.create.toast.error'), color: 'error' })
  }
}

// Format tags following this structure { name: 'tag_name' }
const formatTags = (data: Schema): void => {
  data.tags_attributes = tags.value.map((tag) => ({ name: tag }))
}
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6 pb-18">
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-2">
            <UIcon name="i-lucide-plus" class="size-5" />
            {{ $t('dashboard.create.title') }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ $t('dashboard.create.description') }}</p>
        </div>
        <div class="p-6 space-y-4">
          <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormField :label="$t('dashboard.create.form.title')" name="title" class="w-full">
              <UInput v-model="state.title" :required="true" class="w-full" />
            </UFormField>

            <UFormField :label="$t('dashboard.create.form.description')" name="description" class="w-full">
              <UTextarea v-model="state.description" :required="true" class="w-full" />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('dashboard.create.form.sleep_type')" name="sleep_type">
                <USelect v-model="state.sleep_type" :items="mappedSleepTypeOptions" :required="true" class="cursor-pointer w-full" />
              </UFormField>

              <UFormField :label="$t('dashboard.create.form.intensity')" name="intensity">
                <USelect v-model="state.intensity" :items="mappedIntensityOptions" :required="true" class="cursor-pointer w-full" />
              </UFormField>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('dashboard.create.form.happened')" name="happened">
                <USelect v-model="state.happened" :items="mappedHappenedOptions" :required="true" class="cursor-pointer w-full" />
              </UFormField>

              <UFormField :label="$t('dashboard.create.form.current_mood')" name="current_mood" class="w-full">
                <UInput v-model="state.current_mood" :required="true" class="w-full" />
              </UFormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField :label="$t('dashboard.create.form.date')" name="date">
                <UPopover>
                  <UButton color="neutral" variant="subtle" icon="i-lucide-calendar" class="w-full cursor-pointer">
                    {{ state.date ? df.format(state.date.toDate(getLocalTimeZone())) : $t('dashboard.create.select_date') }}
                  </UButton>

                  <template #content>
                    <UCalendar v-model="state.date" :required="true" class="p-2" />
                  </template>
                </UPopover>
              </UFormField>

              <UFormField :label="$t('dashboard.create.form.tags')" name="tags_attributes">
                <UInputTags v-model="tags" :placeholder="$t('dashboard.create.form.tags_placeholder')" :required="true" class="w-full" />
              </UFormField>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4">
              <ULink
                to="/dashboard"
                class="text-error font-medium"
                tabindex="-1"
              >
                {{ $t('dashboard.create.actions.cancel') }}
              </ULink>

              <UButton
                type="submit"
                icon="i-lucide-plus"
                size="md"
                color="primary"
                variant="solid"
                class="cursor-pointer"
              >
                {{ $t('dashboard.create.actions.save') }}
              </UButton>
            </div>
          </UForm>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>