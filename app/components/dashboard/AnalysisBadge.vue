<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });

const isExpanded = ref(false);

const toggle = (): void => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <UBadge
    :class="[
      'group/badge absolute -top-2.5 -right-2.5 z-10 flex items-center gap-0 rounded-full px-2 py-1.5 shadow-xl transition-all duration-200 md:hover:scale-110',
      isExpanded ? 'scale-110' : ''
    ]"
    @click.stop="toggle"
  >
    <UIcon name="i-lucide-wand-sparkles" class="size-3" />
    <span
      :class="[
        'overflow-hidden pl-0 text-xs font-medium whitespace-nowrap transition-all duration-200',
        'max-w-0 opacity-0 md:group-hover/badge:max-w-24 md:group-hover/badge:pl-1.5 md:group-hover/badge:opacity-100',
        isExpanded ? 'max-w-24 pl-1.5 opacity-100 md:max-w-0 md:pl-0 md:opacity-0' : ''
      ]"
    >
      {{ t('dashboard.list.aiAnalyzed') }}
    </span>
  </UBadge>
</template>
