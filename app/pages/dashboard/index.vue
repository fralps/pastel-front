<script setup lang="ts">
import type { Sleep } from "@/models";

definePageMeta({
  middleware: ["auth"],
});

const { $customFetch } = useNuxtApp();
const { t } = useI18n();

useSeoMeta({
  title: t("meta.dashboard.index.title"),
  description: t("meta.dashboard.index.description"),
  ogTitle: t("meta.dashboard.index.ogTitle"),
  ogDescription: t("meta.dashboard.index.ogDescription"),
});

interface PaginatedDreamsResponse {
  paginated_result: Sleep[];
  total_sleeps: number;
  total_pages: {
    pages: number;
  };
}

const dreamsList = ref<Sleep[]>([]);
const totalDreams = ref(0);
const currentPage = ref(1);

onMounted(async (): Promise<void> => {
  await fetchDreams(currentPage.value);
});

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

async function fetchDreams(page: number): Promise<void> {
  const response = await $customFetch<PaginatedDreamsResponse>(
    `/sleeps?page=${page}`,
    {
      method: "GET",
    },
  );

  if (response?.paginated_result) {
    scrollToTop();
    dreamsList.value = response.paginated_result;
    totalDreams.value = response.total_sleeps;
    currentPage.value = page;
  }
}

const goToCreateDream = (): void => {
  navigateTo("/dashboard/dreams/create");
};
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Welcome Section -->
      <div
        class="bg-linear-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border border-primary-200 dark:border-primary-800 rounded-lg"
      >
        <div class="p-6">
          <h2
            class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-2"
          >
            <UIcon name="i-lucide-star" class="size-5" />
            {{ t("dashboard.welcome.title") }}
          </h2>
          <p
            v-if="dreamsList && totalDreams && dreamsList.length > 0"
            class="text-sm text-gray-600 dark:text-gray-400"
          >
            {{ t("dashboard.welcome.description", { count: totalDreams }) }}
          </p>
        </div>
      </div>

      <!-- Dreams list -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ t("dashboard.list.title") }}
          </h2>
          <UButton
            v-if="dreamsList && dreamsList.length > 0"
            icon="i-lucide-plus"
            size="md"
            color="primary"
            variant="solid"
            class="cursor-pointer"
            @click="goToCreateDream"
          >
            {{ t("dashboard.list.addDream") }}
          </UButton>
        </div>

        <div
          v-if="dreamsList && dreamsList.length > 0"
          class="grid gap-4 pb-18"
        >
          <DashboardRecordCard
            v-for="(dream, index) in dreamsList"
            :key="`dream-${dream.id}-${index}`"
            :dream="dream"
          />

          <UPagination
            v-if="totalDreams > 10"
            v-model:page="currentPage"
            :sibling-count="1"
            :items-per-page="10"
            :total="totalDreams"
            class="mx-auto"
            @update:page="fetchDreams"
          />
        </div>

        <div v-else class="text-center text-gray-600 dark:text-gray-400 py-10">
          <p class="mb-4">{{ t("dashboard.list.noDreams") }}</p>
          <UButton
            icon="i-lucide-plus"
            size="md"
            color="primary"
            variant="solid"
            class="cursor-pointer"
            @click="goToCreateDream"
          >
            {{ t("dashboard.list.addDream") }}
          </UButton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
