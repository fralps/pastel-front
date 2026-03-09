<script setup lang="ts">
const router = useRouter();

const isAuth = ref(false);

onMounted(async (): Promise<void> => {
  if (!isAuthenticated()) {
    await router.push('/auth/sign-in');
  } else {
    isAuth.value = true;
  }
});
</script>

<template>
  <div>
    <ClientOnly>
      <template #default>
        <slot v-if="isAuth" />
      </template>
    </ClientOnly>
  </div>
</template>
