<script setup lang="ts">
  import { useCurrentUserStore } from '@/stores/currentUser'

  const currentUser = useCurrentUserStore()

  definePageMeta({
    middleware: 'auth'
  })
</script>

<template>
  <div>
    Dashboard

    <pre>{{ currentUser.attributes }}</pre>
  </div>
</template>