<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { t } = useI18n()

useSeoMeta({
  title: t('meta.auth.forgotPassword.title'),
  description: t('meta.auth.forgotPassword.description'),
  ogTitle: t('meta.auth.forgotPassword.ogTitle'),
  ogDescription: t('meta.auth.forgotPassword.ogDescription')
})

const toast = useToast()

const fields = [
  {
    name: 'email',
    type: 'email' as const,
    label: t('auth.forgotPassword.email'),
    placeholder: t('auth.forgotPassword.emailPlaceholder'),
    required: true
  }
]

const schema = z.object({
  email: z.email(t('auth.forgotPassword.invalidEmail')),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const { data } = await useCustomFetch<[]>('/users/password', {
    method: 'POST',
    body: {
      user: {
        email: payload.data.email
      }
    }
  })

  if (data.value) {
    toast.add({ title: t('auth.forgotPassword.successTitle'), description: t('auth.forgotPassword.successDesc'), color: 'success' })
    await navigateTo('/dashboard')
  } else {
    toast.add({ title: t('auth.forgotPassword.errorTitle'), description: t('auth.forgotPassword.errorDesc'), color: 'error' })
  }
}
</script>

<template>
  <NuxtLayout name="auth">
    <UAuthForm
      :fields="fields"
      :schema="schema"
      :title="t('auth.forgotPassword.title')"
      :submit="{
        label: t('shared.continue'),
      }"
      icon="i-lucide-lock"
      @submit="onSubmit"
    >
      <template #description>
        {{ t('shared.remembered') }}
        <ULink
          to="/auth/sign-in"
          class="text-primary font-medium"
        >{{ t('shared.backToSignIn') }}</ULink>.
      </template>
    </UAuthForm>
  </NuxtLayout>
</template>