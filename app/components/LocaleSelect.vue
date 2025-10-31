<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { en, fr } from "@nuxt/ui/locale";

const { locale, setLocale } = useI18n({ useScope: "global" });
const currentLocale = ref(locale.value);
</script>

<template>
  <ULocaleSelect
    v-model="currentLocale"
    :locales="[en, fr]"
    size="md"
    class="cursor-pointer"
    @change="() => setLocale(currentLocale)"
  />
</template>
