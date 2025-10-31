<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { useCurrentUserStore } from "@/stores/currentUser";

const currentUser = useCurrentUserStore();
const { t, locale } = useI18n();

useSeoMeta({
  title: t("meta.auth.register.title"),
  description: t("meta.auth.register.description"),
  ogTitle: t("meta.auth.register.ogTitle"),
  ogDescription: t("meta.auth.register.ogDescription"),
});

const toast = useToast();

const fields = [
  {
    name: "email",
    type: "email" as const,
    label: t("auth.register.email"),
    placeholder: t("auth.register.emailPlaceholder"),
  },
  {
    name: "firstname",
    type: "text" as const,
    label: t("auth.register.firstname"),
    placeholder: t("auth.register.firstnamePlaceholder"),
  },
  {
    name: "lastname",
    type: "text" as const,
    label: t("auth.register.lastname"),
    placeholder: t("auth.register.lastnamePlaceholder"),
  },
  {
    name: "password",
    label: t("auth.register.password"),
    type: "password" as const,
    placeholder: t("auth.register.passwordPlaceholder"),
  },
  {
    name: "passwordConfirmation",
    label: t("auth.register.passwordConfirmation"),
    type: "password" as const,
    placeholder: t("auth.register.passwordConfirmationPlaceholder"),
  },
];

const schema = z
  .object({
    email: z.email(t("auth.register.invalidEmail")),
    firstname: z.string().min(1, t("auth.register.firstnameRequired")),
    lastname: z.string().min(1, t("auth.register.lastnameRequired")),
    password: z.string().min(8, t("auth.register.minPassword")),
    passwordConfirmation: z.string().min(8, t("auth.register.minPassword")),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: t("auth.register.passwordsNotMatch"),
        path: ["passwordConfirmation"],
      });
    }
  });

type Schema = z.output<typeof schema>;

const loading = ref(false);

onMounted(async () => {
  // Logout user if already logged in
  const userAuth = useCookie("token");

  if (userAuth.value) {
    userAuth.value = null;
    currentUser.$reset();
    await useCustomFetch("/users/sign_out", {
      method: "DELETE",
    });
  }
});

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true;
  const { data } = await useCustomFetch<[]>("/users/sign_up", {
    method: "POST",
    body: {
      user: {
        email: payload.data.email,
        firstname: payload.data.firstname,
        lastname: payload.data.lastname,
        password: payload.data.password,
        password_confirmation: payload.data.passwordConfirmation,
        registration_locale: locale.value,
      },
    },
  });

  if (data.value) {
    toast.add({
      title: t("auth.register.successTitle"),
      description: t("auth.register.successDesc"),
      color: "success",
    });

    // Redirect to sign in page
    await navigateTo("/auth/sign-in");
  } else {
    toast.add({
      title: t("auth.register.errorTitle"),
      description: t("auth.register.errorDesc"),
      color: "error",
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
      :title="t('auth.register.title')"
      :submit="{ label: t('auth.register.submit') }"
      :loading="loading"
      loading-icon="i-lucide-loader"
      @submit="onSubmit"
    >
      <template #description>
        {{ t("auth.register.alreadyAccount") }}
        <ULink to="/auth/sign-in" class="text-primary font-medium">{{
          t("auth.register.signIn")
        }}</ULink
        >.
      </template>

      <template #footer>
        {{ t("auth.register.footer", { terms: "" })
        }}<ULink to="/" class="text-primary font-medium">{{
          t("auth.register.terms")
        }}</ULink
        >.
      </template>
    </UAuthForm>
  </NuxtLayout>
</template>
