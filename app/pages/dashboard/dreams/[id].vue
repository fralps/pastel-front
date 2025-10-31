<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { Sleep } from "@/models";
import { sleepTypeIcon, sleepTypeColor, sleepTypeTextColor } from "~/constants";

const router = useRouter();
const toast = useToast();
const { $customFetch } = useNuxtApp();
const { t, locale } = useI18n();

useSeoMeta({
  title: t("meta.dashboard.show.title"),
  description: t("meta.dashboard.show.description"),
  ogTitle: t("meta.dashboard.show.ogTitle"),
  ogDescription: t("meta.dashboard.show.ogDescription"),
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
  updated_at: null,
});
const loading = ref(false);

onMounted(async () => {
  await fetchDreamDetails();
});

const fetchDreamDetails = async (): Promise<void> => {
  const response = await $customFetch(
    `/sleeps/${router.currentRoute.value.params.id}`,
    {
      method: "get",
    },
  );

  if (response && Object.keys(response).length > 0) {
    dreamDetails.value = response as Sleep;
  }
};

const editDream = async (): Promise<void> => {
  await router.push(`/dashboard/dreams/edit/${dreamDetails.value.id}`);
};

const deleteDream = async (): Promise<void> => {
  loading.value = true;
  await $customFetch(`/sleeps/${router.currentRoute.value.params.id}`, {
    method: "delete",
  });

  toast.add({
    title: t("dashboard.show.actions.deleteSuccessTitle"),
    description: t("dashboard.show.actions.deleteSuccessDesc"),
    color: "success",
  });

  await router.push("/dashboard");
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
        leadingIcon: sleepTypeTextColor(dreamDetails.sleep_type),
      }"
    >
      <NuxtLink :to="$localePath('dashboard')">{{
        $t("dashboard.create.goBack")
      }}</NuxtLink>
    </UButton>

    <!-- Dream content -->
    <main v-if="dreamDetails.id" class="pb-18 mt-6">
      <article
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <!-- Dream header -->
        <div
          class="p-6 sm:p-8 border-b border-primary-100 dark:border-gray-700"
        >
          <div
            class="block md:flex flex-wrap items-start justify-between gap-4 mb-4"
          >
            <div class="flex-1 min-w-0">
              <h1
                class="text-2xl sm:text-3xl font-bold mb-2 text-balance"
                :class="sleepTypeTextColor(dreamDetails.sleep_type)"
              >
                {{ dreamDetails.title }}
              </h1>
              <time
                class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5"
              >
                <UIcon
                  name="i-lucide-calendar"
                  class="size-4"
                  :class="sleepTypeTextColor(dreamDetails.sleep_type)"
                />
                {{
                  dreamDetails.date
                    ? new Date(dreamDetails.date).toLocaleDateString(locale)
                    : ""
                }}
              </time>
            </div>

            <!-- Dream type badge -->
            <span
              :class="[
                'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium mt-4 md:mt-0',
                sleepTypeColor(dreamDetails.sleep_type),
                'border border-gray-200 dark:border-gray-700',
                'bg-gray-100 dark:bg-gray-900',
                'text-gray-700 dark:text-gray-300',
              ]"
            >
              <UIcon
                :name="`i-lucide-${sleepTypeIcon(dreamDetails.sleep_type)}`"
                class="size-4"
              />
              {{ t("dashboard.sleepType." + dreamDetails.sleep_type) }}
            </span>
          </div>

          <!-- Metadata row -->
          <div class="flex flex-wrap gap-4 text-sm">
            <!-- Happened -->
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-watch"
                class="size-4"
                :class="sleepTypeTextColor(dreamDetails.sleep_type)"
              />
              <span class="text-gray-700 dark:text-gray-300"
                >{{ t("dashboard.show.happened") }}
                <strong>{{
                  t("dashboard.happened." + dreamDetails.happened)
                }}</strong></span
              >
            </div>

            <!-- Lucidity level (if lucid dream) -->
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-brain"
                class="size-4"
                :class="sleepTypeTextColor(dreamDetails.sleep_type)"
              />
              <span class="text-gray-700 dark:text-gray-300"
                >{{ t("dashboard.show.intensity") }}
                <strong>{{
                  t("dashboard.intensity." + dreamDetails.intensity)
                }}</strong></span
              >
            </div>
          </div>

          <div class="flex flex-wrap gap-4 text-sm mt-4">
            <!-- Current mood -->
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-smile"
                class="size-4"
                :class="sleepTypeTextColor(dreamDetails.sleep_type)"
              />
              <span class="text-gray-700 dark:text-gray-300"
                >{{ t("dashboard.show.currentMood") }}
                <strong>{{ dreamDetails.current_mood }}</strong></span
              >
            </div>
          </div>

          <!-- Tags -->
          <div
            v-if="
              dreamDetails.tags_attributes &&
              dreamDetails.tags_attributes.length > 0
            "
            class="flex flex-wrap items-center gap-2 mt-4"
          >
            <UIcon
              name="i-lucide-tag"
              class="size-4"
              :class="sleepTypeTextColor(dreamDetails.sleep_type)"
            />
            <span
              v-for="(tag, index) in dreamDetails.tags_attributes"
              :key="`tag-${tag.id}-${index}`"
              class="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>

        <!-- Dream description -->
        <div class="p-6 sm:p-8">
          <h2
            class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
          >
            <UIcon
              name="i-lucide-book-open"
              class="size-5"
              :class="sleepTypeTextColor(dreamDetails.sleep_type)"
            />
            {{ t("dashboard.show.description") }}
          </h2>
          <div class="prose prose-rose max-w-none">
            <p
              class="text-gray-700 dark:text-gray-300 leading-relaxed text-pretty whitespace-pre-wrap"
            >
              {{ dreamDetails.description }}
            </p>
          </div>
        </div>

        <!-- Action buttons -->
        <div
          class="p-6 sm:p-8 border-t border-primary-100 dark:border-gray-700 flex flex-wrap gap-3"
        >
          <UButton
            icon="i-lucide-pen"
            size="sm"
            color="primary"
            variant="outline"
            class="text-xs cursor-pointer"
            @click="editDream()"
          >
            {{ $t("dashboard.show.actions.edit") }}
          </UButton>

          <UButton
            icon="i-lucide-trash"
            size="sm"
            color="error"
            variant="outline"
            class="text-xs cursor-pointer"
            :loading="loading"
            loading-icon="i-lucide-loader"
            @click="deleteDream()"
          >
            {{ $t("dashboard.show.actions.delete") }}
          </UButton>
        </div>
      </article>
    </main>
  </NuxtLayout>
</template>
