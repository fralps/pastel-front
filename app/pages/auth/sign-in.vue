<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

import * as z from 'zod';

import { useCurrentUserStore } from '@/stores/currentUser';

const currentUser = useCurrentUserStore();
const { t } = useI18n();
const toast = useToast();

useSeoMeta({
  title: t('meta.auth.signIn.title'),
  description: t('meta.auth.signIn.description'),
  ogTitle: t('meta.auth.signIn.ogTitle'),
  ogDescription: t('meta.auth.signIn.ogDescription')
});

const fields = [
  {
    name: 'email',
    type: 'email' as const,
    label: t('auth.signIn.email'),
    placeholder: t('auth.signIn.emailPlaceholder'),
    required: true
  },
  {
    name: 'password',
    label: t('auth.signIn.password'),
    type: 'password' as const,
    placeholder: t('auth.signIn.passwordPlaceholder')
  }
];

const schema = z.object({
  email: z.email(t('auth.signIn.invalidEmail')),
  password: z.string().min(8, t('auth.signIn.minPassword'))
});

type Schema = z.output<typeof schema>;

const loading = ref(false);

onMounted(async () => {
  // Logout user if already logged in
  const userAuth = useCookie('token');

  if (userAuth.value) {
    userAuth.value = null;
    currentUser.$reset();
    await useCustomFetch('/users/sign_out', {
      method: 'DELETE'
    });
  }
});

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true;
  const { data } = await useCustomFetch<Record<string, unknown>>('/users/sign_in', {
    method: 'POST',
    body: {
      user: {
        email: payload.data.email,
        password: payload.data.password
      }
    }
  });

  if (data.value) {
    currentUser.attributes = data.value;
    toast.add({
      title: t('auth.signIn.successTitle'),
      description: t('auth.signIn.successDesc'),
      color: 'success'
    });
    await navigateTo('/dashboard');
  } else {
    toast.add({
      title: t('auth.signIn.errorTitle'),
      description: t('auth.signIn.errorDesc'),
      color: 'error'
    });
  }
  loading.value = false;
}
</script>

<template>
  <NuxtLayout name="auth">
    <UAuthForm
      :fields="fields"
      :schema="schema"
      :title="t('auth.signIn.title')"
      icon="i-lucide-lock"
      :loading="loading"
      loading-icon="i-lucide-loader"
      :submit="{
        label: t('shared.continue')
      }"
      @submit="onSubmit"
    >
      <template #description>
        {{ t('auth.signIn.noAccount') }}
        <ULink to="/auth/register" class="font-medium text-primary">{{ t('auth.signIn.signUp') }}</ULink
        >.
      </template>

      <template #password-hint>
        <ULink to="/auth/forgot-password" class="font-medium text-primary" tabindex="-1">{{
          t('auth.signIn.passwordHint')
        }}</ULink>
      </template>

      <template #footer>
        {{ t('auth.signIn.footer', { terms: '' })
        }}<ULink to="/" class="font-medium text-primary">{{ t('auth.signIn.terms') }}</ULink
        >.
      </template>
    </UAuthForm>
  </NuxtLayout>
</template>
