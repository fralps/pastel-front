<script setup lang="ts">
  import { useCurrentUserStore } from '@/stores/currentUser'

  const currentUser = useCurrentUserStore()
</script>

<template>
    <AuthGuard>

      <div>
        Dashboard

        <pre>{{ currentUser.attributes }}</pre>
      </div>
    </AuthGuard>
</template>