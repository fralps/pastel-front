<script setup lang="ts">
if (import.meta.env.VITE_APP_ENV === 'production') {
  useHead({
    script: [
      {
        src: 'https://cloud.umami.is/script.js',
        defer: true,
        'data-website-id': 'f3962bc5-40e8-4ad0-bd49-4696276dd5fb'
      }
    ]
  });
}
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
