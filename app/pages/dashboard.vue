<script setup lang="ts">
  import { useCurrentUserStore } from '@/stores/currentUser'

  const currentUser = useCurrentUserStore()

  useSeoMeta({
    title: 'Pastel - Dashboard',
    description: 'User dashboard',
    ogTitle: 'Pastel - Dashboard',
    ogDescription: 'User dashboard'
  })
</script>

<template>
    <AuthGuard>

      <div>
        Dashboard

        <pre>{{ currentUser.attributes }}</pre>
      </div>
    </AuthGuard>
</template>