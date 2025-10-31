<script setup lang="ts">
import { useCurrentUserStore } from "@/stores/currentUser";

const currentUser = useCurrentUserStore();

const logout = async (): Promise<void> => {
  const userAuth = useCookie("token");

  await useCustomFetch("/users/sign_out", {
    method: "DELETE",
  });
  userAuth.value = null;
  currentUser.$reset();
  await useRouter().push("/auth/sign-in");
};
</script>

<template>
  <UHeader :toggle="false">
    <template #title>
      <span class="text-primary text-2xl">Pastel</span>
    </template>

    <template #right>
      <UColorModeButton />

      <LocaleSelect />
      <UButton
        icon="i-lucide-log-out"
        size="sm"
        color="error"
        variant="soft"
        class="text-xs cursor-pointer"
        @click="logout()"
      >
        Log Out
      </UButton>
    </template>
  </UHeader>
</template>
