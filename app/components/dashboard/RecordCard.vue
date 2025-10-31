<script setup lang="ts">
import { defineProps } from "vue";
import type { Sleep } from "@/models";
import { useI18n } from "vue-i18n";
import { sleepTypeIcon, sleepTypeColor } from "@/constants";

const { t, locale } = useI18n({ useScope: "global" });
const router = useRouter();

const props = defineProps<{
  dream: Sleep;
}>();

const redirectToShowPage = async (id: number | undefined) => {
  await router.push(`/dashboard/dreams/${id}`);
};
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
    @click="redirectToShowPage(props.dream.id ?? undefined)"
  >
    <div class="p-6 pb-3">
      <div class="flex items-start justify-between">
        <div class="space-y-1">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">
            {{ props.dream.title }}
          </h3>
          <div
            class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
          >
            <UIcon name="i-lucide-calendar" class="size-3" />
            {{
              props.dream.date
                ? new Date(props.dream.date).toLocaleDateString(locale)
                : ""
            }}
            <template v-if="dream.current_mood">
              <span>•</span>
              <span>{{ props.dream.current_mood }}</span>
            </template>
          </div>
        </div>
        <span
          :class="[
            'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium',
            sleepTypeColor(props.dream.sleep_type),
          ]"
        >
          <UIcon
            :name="`i-lucide-${sleepTypeIcon(props.dream.sleep_type)}`"
            class="size-4"
          />
          {{ t("dashboard.sleepType." + props.dream.sleep_type) }}
        </span>
      </div>
    </div>
    <div class="px-6 pb-6">
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
        {{ props.dream.description }}
      </p>
      <div
        v-if="(props.dream.tags_attributes ?? []).length > 0"
        class="flex flex-wrap gap-1"
      >
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
