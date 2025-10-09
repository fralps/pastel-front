<script setup lang="ts">
  import { useCurrentUserStore } from '@/stores/currentUser'

  const currentUser = useCurrentUserStore()

  useSeoMeta({
    title: 'Pastel - Dashboard',
    description: 'User dashboard',
    ogTitle: 'Pastel - Dashboard',
    ogDescription: 'User dashboard'
  })

  const logout = async () => {
   await useCustomFetch<[]>('/users/sign_out', { method: 'DELETE'})

    const userAuth = useCookie('token')
    userAuth.value = null

    resetUserState()
    await navigateTo('/auth/sign-in')
  }
</script>

<template>
    <AuthGuard>

      <div>
        Dashboard

        <pre>{{ currentUser.attributes }}</pre>
        <UButton @click="logout">Logout</UButton>
      </div>
    </AuthGuard>
</template>