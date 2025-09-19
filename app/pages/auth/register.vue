<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

useSeoMeta({
  title: 'Pastel - Sign up',
  description: 'Create an account to get started'
})

const toast = useToast()

const fields = [{
  name: 'email',
  type: 'email' as const,
  label: 'Email',
  placeholder: 'Enter your email'
},
{
  name: 'firstname',
  type: 'text' as const,
  label: 'First Name',
  placeholder: 'Enter your first name'
}, {
  name: 'lastname',
  type: 'text' as const,
  label: 'Last Name',
  placeholder: 'Enter your last name'
},
{
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Enter your password'
}, {
  name: 'passwordConfirmation',
  label: 'Confirm Password',
  type: 'password' as const,
  placeholder: 'Confirm your password'
}]

const schema = z.object({
  email: z.email('Invalid email'),
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  passwordConfirmation: z.string().min(8, 'Must be at least 8 characters')
}).superRefine(({ passwordConfirmation, password }, ctx) => {
  if (passwordConfirmation !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['passwordConfirmation']
    });
  }
});

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'Your account has been created.', color: 'success' })

  const { data } = await useCustomFetch<[]>('/users/sign_up', {
    method: 'POST',
    body: {
      user: {
        email: payload.data.email,
        firstname: payload.data.firstname,
        lastname: payload.data.lastname,
        password: payload.data.password,
        password_confirmation: payload.data.passwordConfirmation
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
      title="Create an account"
      :submit="{ label: 'Create account' }"
      @submit="onSubmit"
    >
      <template #description>
        Already have an account? <ULink
          to="/auth/sign-in"
          class="text-primary font-medium"
        >Login</ULink>.
      </template>

      <template #footer>
        By signing up, you agree to our <ULink
          to="/"
          class="text-primary font-medium"
        >Terms of Service</ULink>.
      </template>
    </UAuthForm>
  </NuxtLayout>
</template>