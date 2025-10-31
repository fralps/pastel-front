<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const route = useRoute();
const { t } = useI18n();

const token = route.query.reset_password_token as string | undefined;

useSeoMeta({
  title: t("meta.auth.resetPassword.title"),
  description: t("meta.auth.resetPassword.description"),
  ogTitle: t("meta.auth.resetPassword.ogTitle"),
  ogDescription: t("meta.auth.resetPassword.ogDescription"),
});

const toast = useToast();

const fields = [
  {
    name: "password",
    type: "password" as const,
    label: t("auth.resetPassword.password"),
    placeholder: t("auth.resetPassword.passwordPlaceholder"),
    required: true,
  },
  {
    name: "passwordConfirmation",
    type: "password" as const,
    label: t("auth.resetPassword.passwordConfirmation"),
    placeholder: t("auth.resetPassword.passwordConfirmationPlaceholder"),
    required: true,
  },
];

const schema = z
  .object({
    password: z.string().min(8, t("auth.resetPassword.minPassword")),
    passwordConfirmation: z
      .string()
      .min(8, t("auth.resetPassword.minPassword")),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: t("auth.resetPassword.passwordsNotMatch"),
        path: ["passwordConfirmation"],
      });
    }
  });

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const { status } = await useCustomFetch<[]>("/users/password", {
    method: "PUT",
    body: {
      user: {
        password: payload.data.password,
        password_confirmation: payload.data.passwordConfirmation,
        reset_password_token: token,
      },
    },
  });

  if (status.value === "success") {
    toast.add({
      title: t("auth.resetPassword.successTitle"),
      description: t("auth.resetPassword.successDesc"),
      color: "success",
    });
    await navigateTo("/auth/sign-in");
  } else {
    toast.add({
      title: t("auth.resetPassword.invalidTokenTitle"),
      description: t("auth.resetPassword.invalidTokenDesc"),
      color: "error",
    });
  }
}
</script>

<template>
  <NuxtLayout name="auth">
    <UAuthForm
      :fields="fields"
      :schema="schema"
      :title="t('auth.resetPassword.title')"
      :submit="{
        label: t('shared.continue'),
      }"
      icon="i-lucide-lock"
      @submit="onSubmit"
    >
      <template #description>
        {{ t("shared.remembered") }}
        <ULink to="/auth/sign-in" class="text-primary font-medium">{{
          t("shared.backToSignIn")
        }}</ULink
        >.
      </template>
    </UAuthForm>
  </NuxtLayout>
</template>
