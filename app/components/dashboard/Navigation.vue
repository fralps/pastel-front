<script setup lang="ts">
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

import { watch } from "vue";
type TabType = "home" | "add" | "insights";

const route = useRoute();
const { t } = useI18n({ useScope: "global" });
const activeTab = ref<TabType>("home");

const updateActiveTab = () => {
  if (typeof route.name === "string") {
    if (route.name.startsWith("dashboard___")) {
      activeTab.value = "home";
    } else if (route.name.startsWith("dashboard-dreams-create___")) {
      activeTab.value = "add";
    } else if (route.name.startsWith("dashboard-insights___")) {
      activeTab.value = "insights";
    } else {
      activeTab.value = "home";
    }
  } else {
    activeTab.value = "home";
  }
};

watch(() => route.path, updateActiveTab, { immediate: true });

const redirectTo = (tab: TabType) => {
  switch (tab) {
    case "home":
      navigateTo("/dashboard");
      break;
    case "add":
      navigateTo("/dashboard/dreams/create");
      break;
    case "insights":
      navigateTo("/dashboard/insights");
      break;
  }
};
</script>

<template>
  <nav
    class="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white/40 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/40"
  >
    <div class="flex justify-around py-3">
      <button
        :class="[
          'flex cursor-pointer flex-col items-center gap-1 rounded-lg px-4 py-2 transition-colors',
          activeTab === 'home'
            ? 'bg-primary-600 text-white'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700',
        ]"
        @click="redirectTo('home')"
      >
        <UIcon name="i-lucide-book" class="size-4" />
        <span class="text-xs">{{ t("shared.navigation.dashboard") }}</span>
      </button>
      <button
        :class="[
          'flex cursor-pointer flex-col items-center gap-1 rounded-lg px-4 py-2 transition-colors',
          activeTab === 'add'
            ? 'bg-primary-600 text-white'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700',
        ]"
        @click="redirectTo('add')"
      >
        <UIcon name="i-lucide-plus" class="size-4" />
        <span class="text-xs">{{ t("shared.navigation.createDream") }}</span>
      </button>
      <button
        :class="[
          'flex cursor-pointer flex-col items-center gap-1 rounded-lg px-4 py-2 transition-colors',
          activeTab === 'insights'
            ? 'bg-primary-600 text-white'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700',
        ]"
        @click="redirectTo('insights')"
      >
        <UIcon name="i-lucide-chart-column" class="size-4" />
        <span class="text-xs">{{ t("shared.navigation.insights") }}</span>
      </button>
    </div>
  </nav>
</template>
