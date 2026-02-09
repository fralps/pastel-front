<script setup lang="ts">
import type {
  VoiceDictationProps,
  SpeechRecognition,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent,
} from "~/models";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = withDefaults(defineProps<VoiceDictationProps>(), {
  modelValue: "",
  language: "fr-FR",
  continuous: true,
  interimResults: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const isSupported: Ref<boolean> = ref(false);
const isRecording: Ref<boolean> = ref(false);
const interimTranscript: Ref<string> = ref("");

let recognition: SpeechRecognition | null = null;

// Init Speech Recognition
onMounted((): void => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    isSupported.value = false;
    return;
  }

  isSupported.value = true;
  recognition = new SpeechRecognition();

  recognition.lang = props.language;
  recognition.continuous = props.continuous;
  recognition.interimResults = props.interimResults;

  recognition.onresult = (event: SpeechRecognitionEvent): void => {
    let interimText: string = "";
    let finalText: string = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      if (!result || !result[0]) continue;

      const text = result[0].transcript;

      if (result.isFinal) {
        finalText += text + " ";
      } else {
        interimText += text;
      }
    }

    // Emit update with final text
    if (finalText) {
      const newValue: string = props.modelValue + finalText;
      emit("update:modelValue", newValue);
      interimTranscript.value = "";
    }

    // Display interim transcript
    if (interimText) {
      interimTranscript.value = interimText;
    }
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error("Speech recognition error:", event.error);
    isRecording.value = false;
  };

  recognition.onend = (): void => {
    if (isRecording.value && props.continuous) {
      recognition?.start();
    } else {
      isRecording.value = false;
    }
  };
});

onUnmounted((): void => {
  if (recognition && isRecording.value) {
    recognition.stop();
  }
});

const toggleRecording = (): void => {
  if (!recognition) return;

  if (isRecording.value) {
    recognition.stop();
    isRecording.value = false;
  } else {
    recognition.start();
    isRecording.value = true;
  }
};

const clearTranscript = (): void => {
  emit("update:modelValue", "");
  interimTranscript.value = "";
};
</script>

<template>
  <div class="my-4 space-y-4">
    <div class="block gap-2 md:flex md:items-center">
      <p
        class="mb-2 text-center text-xs text-muted md:mb-0"
        :class="!isSupported ? 'cursor-not-allowed line-through' : ''"
      >
        {{ t("dashboard.create.form.speechDictation.useSpeechDictation") }}
      </p>
      <UButton
        :disabled="!isSupported"
        :color="isRecording ? 'warning' : 'primary'"
        :variant="isRecording ? 'solid' : 'solid'"
        :icon="isRecording ? 'i-lucide-circle-pause' : 'i-lucide-mic'"
        size="sm"
        class="w-full cursor-pointer md:w-fit"
        @click="toggleRecording"
      >
        {{
          isRecording
            ? t("dashboard.create.form.speechDictation.pauseRecording")
            : t("dashboard.create.form.speechDictation.startRecording")
        }}
      </UButton>

      <UButton
        v-if="modelValue.length >= 10"
        color="error"
        variant="link"
        icon="i-lucide-trash"
        size="sm"
        class="mt-2 cursor-pointer hover:underline md:mt-0"
        @click="clearTranscript"
      >
        {{ t("dashboard.create.form.speechDictation.clearText") }}
      </UButton>
    </div>

    <!-- Alert if not supported -->
    <UAlert
      v-if="!isSupported"
      color="error"
      variant="soft"
      icon="i-lucide-triangle-alert"
      :title="t('dashboard.create.form.errors.titleBrowserSupport')"
      :description="t('dashboard.create.form.errors.browserNotSupported')"
    />

    <!-- Listening status -->
    <UAlert
      v-if="isRecording"
      color="info"
      variant="soft"
      icon="i-lucide-radio"
      :title="t('dashboard.create.form.speechDictation.listening')"
      :description="
        t('dashboard.create.form.speechDictation.language', {
          language: props.language,
        })
      "
      class="animate-pulse"
    />

    <!-- Interim transcript -->
    <UCard v-if="interimTranscript" class="border-l-4 border-blue-500">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-message-circle-more" class="text-blue-500" />
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ t("dashboard.create.form.speechDictation.recording") }}
          </span>
        </div>
      </template>
      <p class="text-sm text-gray-600 italic dark:text-gray-400">
        {{ interimTranscript }}
      </p>
    </UCard>
  </div>
</template>
