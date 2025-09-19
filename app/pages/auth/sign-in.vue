<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

useSeoMeta({
  title: 'Pastel - Login',
  description: 'Login to your account to continue'
})

const toast = useToast()

const fields = [{
  name: 'email',
  type: 'email' as const,
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Enter your password'
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox' as const
}]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'You are now logged in.', color: 'success' })

  const { data } = await useCustomFetch<[]>('/users/sign_in', {
    method: 'POST',
    body: {
      user: {
        email: payload.data.email,
        password: payload.data.password
      }
    }
  })

  console.log('Response:', data);

}
</script>

<template>
  <NuxtLayout name="auth">
    <UAuthForm
      :fields="fields"
      :schema="schema"
      title="Welcome back"
      icon="i-lucide-lock"
      @submit="onSubmit"
    >
      <template #description>
        Don't have an account? <ULink
          to="/auth/register"
          class="text-primary font-medium"
        >Sign up</ULink>.
      </template>

      <template #password-hint>
        <ULink
          to="/"
          class="text-primary font-medium"
          tabindex="-1"
        >Forgot password?</ULink>
      </template>

      <template #footer>
        By signing in, you agree to our <ULink
          to="/"
          class="text-primary font-medium"
        >Terms of Service</ULink>.
      </template>
    </UAuthForm>
  </NuxtLayout>
</template>