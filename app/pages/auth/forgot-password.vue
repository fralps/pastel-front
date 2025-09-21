<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

// const { t } = useI18n()

// useSeoMeta({
//   title: t('meta.auth.signIn.title'),
//   description: t('meta.auth.signIn.description'),
//   ogTitle: t('meta.auth.signIn.ogTitle'),
//   ogDescription: t('meta.auth.signIn.ogDescription')
// })

const toast = useToast()

const fields = [
  {
    name: 'email',
    type: 'email' as const,
    label: 'Email',
    placeholder: 'Enter your email',
    required: true
  }
]

const schema = z.object({
  email: z.email('Invalid email'),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const { data } = await useCustomFetch<[]>('/users/sign_in', {
    method: 'POST',
    body: {
      user: {
        email: payload.data.email
      }
    }
  })

  if (data.value) {
    toast.add({ title: 'Success', description: 'Password reset email sent', color: 'success' })
    await navigateTo('/dashboard')
  } else {
    toast.add({ title: 'Error', description: 'Invalid email or password', color: 'error' })
  }
}
</script>

<template>
  <NuxtLayout name="auth">
    <UAuthForm
      :fields="fields"
      :schema="schema"
      title="Forgot Password"
      icon="i-lucide-lock"
      @submit="onSubmit"
    >
      <template #description>
        Remember your password?
        <ULink
          to="/auth/sign-in"
          class="text-primary font-medium"
        >Sign In</ULink>.
      </template>
    </UAuthForm>
  </NuxtLayout>
</template>