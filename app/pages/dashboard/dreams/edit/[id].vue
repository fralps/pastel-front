<script setup lang="ts">
import { useI18n } from "vue-i18n";
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import {
  sleepTypeOptions,
  intensityOptions,
  happenedOptions,
} from "@/constants";
import type { Sleep } from "@/models";

definePageMeta({
  middleware: ["auth"],
});

const { t, locale } = useI18n({ useScope: "global" });
const router = useRouter();

useSeoMeta({
  title: t("meta.dashboard.edit.title"),
  description: t("meta.dashboard.edit.description"),
  ogTitle: t("meta.dashboard.edit.title"),
  ogDescription: t("meta.dashboard.edit.description"),
});

const formattedLocale = locale.value.replace("_", "-");

const df = new DateFormatter(formattedLocale, {
  dateStyle: "full",
});

const mappedSleepTypeOptions = sleepTypeOptions.map((option) => ({
  label: t(option.label),
  value: option.value,
}));

const mappedHappenedOptions = happenedOptions.map((option) => ({
  label: t(option.label),
  value: option.value,
}));

const mappedIntensityOptions = intensityOptions.map((option) => ({
  label: t(option.label),
  value: option.value,
}));

const schema = z.object({
  title: z
    .string()
    .min(2, t("dashboard.edit.form.errors.titleMin"))
    .max(100, t("dashboard.edit.form.errors.titleMax")),
  description: z
    .string()
    .min(10, t("dashboard.edit.form.errors.descriptionMin")),
  sleep_type: z.string(),
  intensity: z.string(),
  happened: z.string(),
  current_mood: z
    .string()
    .min(2, t("dashboard.edit.form.errors.currentMoodMin"))
    .max(20, t("dashboard.edit.form.errors.currentMoodMax")),
  date: z.any(),
  tags_attributes: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string(),
      _destroy: z.boolean().optional(),
    }),
  ),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  title: "",
  description: "",
  sleep_type: "dream",
  intensity: "clear",
  happened: "sleeping",
  current_mood: "",
  date: shallowRef(
    new CalendarDate(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate(),
    ),
  ),
  tags_attributes: [],
});

const { $customFetch } = useNuxtApp();
const toast = useToast();

const tags = ref<string[]>([]);
const tagsWithIds = ref<Array<{ id?: number; name: string }>>([]);
const loading = ref(false);

onMounted(async (): Promise<void> => {
  await fetchDreamDetails();
});

const fetchDreamDetails = async (): Promise<void> => {
  const response: Sleep = await $customFetch(
    `/sleeps/${router.currentRoute.value.params.id}`,
    {
      method: "get",
    },
  );

  if (response && Object.keys(response).length > 0) {
    state.title = response.title ?? "";
    state.description = response.description ?? "";
    state.sleep_type = response.sleep_type ?? "";
    state.intensity = response.intensity ?? "";
    state.happened = response.happened ?? "";
    state.current_mood = response.current_mood ?? "";
    const safeDate = response.date ? new Date(response.date) : new Date();
    state.date = new CalendarDate(
      safeDate.getFullYear(),
      safeDate.getMonth() + 1,
      safeDate.getDate(),
    );

    // Store tags with their IDs
    tagsWithIds.value = (response.tags_attributes ?? []).map(
      (tag: { id?: number; name: string }) => ({ id: tag.id, name: tag.name }),
    );

    // Show only names in the input
    tags.value = tagsWithIds.value.map((tag) => tag.name);
  }
};

const formatTagsAttributesForApi = (tagName: string): void => {
  // Find the tag with its ID
  const tagWithId = tagsWithIds.value.find((tag) => tag.name === tagName);

  if (tagWithId?.id) {
    // If the tag has an ID (it exists in the database), we mark it for deletion
    const existingIndex = state.tags_attributes.findIndex(
      (tag) => tag.name === tagName,
    );

    if (existingIndex !== -1) {
      if (state.tags_attributes[existingIndex]) {
        state.tags_attributes[existingIndex]._destroy = true;
      }
    } else {
      state.tags_attributes.push({
        id: tagWithId.id,
        name: tagName,
        _destroy: true,
      });
    }
  }

  // Remove from tagsWithIds as well
  tagsWithIds.value = tagsWithIds.value.filter((tag) => tag.name !== tagName);
};

const formatTags = (data: Schema): void => {
  // Keep tags marked for deletion (with their ID)
  const tagsToDestroy = data.tags_attributes.filter((tag) => tag._destroy);

  // Create the list of new tags and existing tags to keep
  const currentTags = tags.value.map((tagName) => {
    const existingTag = tagsWithIds.value.find((t) => t.name === tagName);
    if (existingTag?.id) {
      // Existing tag to keep
      return { id: existingTag.id, name: tagName };
    }
    // New tag
    return { name: tagName };
  });

  data.tags_attributes = [...tagsToDestroy, ...currentTags];
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  formatTags(event.data);

  const response = await $customFetch<Sleep>(
    `/sleeps/${router.currentRoute.value.params.id}`,
    {
      method: "PUT",
      body: { sleep: event.data },
    },
  );

  if (response?.id) {
    toast.add({ title: t("dashboard.edit.toast.success"), color: "success" });
    await navigateTo(`/dashboard/dreams/${response.id}`);
  } else {
    toast.add({ title: t("dashboard.edit.toast.error"), color: "error" });
  }
  loading.value = false;
}
</script>

<template>
  <NuxtLayout name="dashboard">
    <UButton
      icon="i-lucide-arrow-left"
      color="neutral"
      variant="outline"
      :ui="{
        leadingIcon: 'text-primary',
      }"
      class="cursor-pointer"
      @click="router.back()"
    >
      {{ t("dashboard.edit.goBack") }}
    </UButton>
    <div class="pb-18 mt-6">
      <div
        class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
      >
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2
            class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-2"
          >
            <UIcon name="i-lucide-plus" class="size-5" />
            {{ t("dashboard.edit.title") }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ t("dashboard.edit.description") }}
          </p>
        </div>
        <div class="p-6 space-y-4">
          <UForm
            :schema="schema"
            :state="state"
            class="space-y-8"
            @submit="onSubmit"
          >
            <UFormField
              :label="t('dashboard.edit.form.title')"
              name="title"
              class="w-full"
            >
              <UInput v-model="state.title" :required="true" class="w-full" />
            </UFormField>

            <UFormField
              :label="t('dashboard.edit.form.description')"
              name="description"
              class="w-full"
            >
              <UTextarea
                v-model="state.description"
                :required="true"
                class="w-full"
              />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField
                :label="t('dashboard.edit.form.sleepType')"
                name="sleep_type"
              >
                <USelect
                  v-model="state.sleep_type"
                  :items="mappedSleepTypeOptions"
                  :required="true"
                  class="cursor-pointer w-full"
                />
              </UFormField>

              <UFormField
                :label="t('dashboard.edit.form.intensity')"
                name="intensity"
              >
                <USelect
                  v-model="state.intensity"
                  :items="mappedIntensityOptions"
                  :required="true"
                  class="cursor-pointer w-full"
                />
              </UFormField>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <UFormField
                :label="t('dashboard.edit.form.happened')"
                name="happened"
              >
                <USelect
                  v-model="state.happened"
                  :items="mappedHappenedOptions"
                  :required="true"
                  class="cursor-pointer w-full"
                />
              </UFormField>

              <UFormField
                :label="t('dashboard.edit.form.currentMood')"
                name="current_mood"
                class="w-full"
              >
                <UInput
                  v-model="state.current_mood"
                  :required="true"
                  class="w-full"
                />
              </UFormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField :label="t('dashboard.edit.form.date')" name="date">
                <UPopover>
                  <UButton
                    color="neutral"
                    variant="subtle"
                    icon="i-lucide-calendar"
                    class="w-full cursor-pointer"
                  >
                    {{
                      state.date
                        ? df.format(state.date.toDate(getLocalTimeZone()))
                        : t("dashboard.edit.select_date")
                    }}
                  </UButton>

                  <template #content>
                    <UCalendar
                      v-model="state.date"
                      :required="true"
                      class="p-2"
                    />
                  </template>
                </UPopover>
              </UFormField>

              <UFormField
                :label="t('dashboard.edit.form.tags')"
                name="tags_attributes"
              >
                <UInputTags
                  v-model="tags"
                  :placeholder="t('dashboard.edit.form.tagsPlaceholder')"
                  :required="true"
                  :max="5"
                  class="w-full"
                  @remove-tag="formatTagsAttributesForApi"
                />
              </UFormField>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4">
              <ULink
                to="/dashboard"
                class="text-error font-medium"
                tabindex="-1"
              >
                {{ t("dashboard.edit.actions.cancel") }}
              </ULink>

              <UButton
                type="submit"
                icon="i-lucide-plus"
                :loading
                loading-icon="i-lucide-loader"
                size="md"
                color="primary"
                variant="solid"
                class="cursor-pointer"
              >
                {{ t("dashboard.edit.actions.save") }}
              </UButton>
            </div>
          </UForm>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
