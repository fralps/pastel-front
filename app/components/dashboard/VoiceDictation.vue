<template>
  <div class="space-y-4 my-4">
    <div class="block md:flex md:items-center gap-2">
      <p class="mb-2 md:mb-0 text-center text-muted text-xs">
        ou utiliser la dictée vocale :
      </p>
      <UButton
        :disabled="!isSupported"
        :color="isRecording ? 'warning' : 'primary'"
        :variant="isRecording ? 'solid' : 'solid'"
        :icon="isRecording ? 'i-lucide-circle-pause' : 'i-lucide-mic'"
        size="lg"
        class="w-full md:w-[25%] cursor-pointer"
        @click="toggleRecording"
      >
        {{ isRecording ? "Pause" : "Dicter" }}
      </UButton>

      <UButton
        v-if="modelValue"
        color="error"
        variant="link"
        icon="i-lucide-trash"
        size="sm"
        class="cursor-pointer hover:underline mt-2 md:mt-0"
        @click="clearTranscript"
      >
        Effacer
      </UButton>
    </div>

    <!-- Alert if not supported -->
    <UAlert
      v-if="!isSupported"
      color="error"
      variant="soft"
      icon="i-lucide-triangle-alert"
      title="Reconnaissance vocale non supportée"
      description="Votre navigateur ne supporte pas la reconnaissance vocale. Veuillez utiliser Chrome, Edge ou Safari."
    />

    <!-- Listening status -->
    <UAlert
      v-if="isRecording"
      color="info"
      variant="soft"
      icon="i-lucide-radio"
      title="Écoute en cours..."
      :description="`Langue: ${language}`"
      class="animate-pulse"
    />

    <!-- Interim transcript -->
    <UCard v-if="interimTranscript" class="border-l-4 border-blue-500">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-message-circle-more" class="text-blue-500" />
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            En cours de reconnaissance...
          </span>
        </div>
      </template>
      <p class="text-sm italic text-gray-600 dark:text-gray-400">
        {{ interimTranscript }}
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type {
  VoiceDictationProps,
  SpeechRecognition,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent,
} from "~/models";

const props = withDefaults(defineProps<VoiceDictationProps>(), {
  modelValue: "",
  language: "fr-FR",
  continuous: true,
  interimResults: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const isSupported = ref(false);
const isRecording = ref(false);
const interimTranscript = ref("");

let recognition: SpeechRecognition | null = null;

// Init Speech Recognition
onMounted(() => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    isSupported.value = false;
    return;
  }

  isSupported.value = true;
  recognition = new SpeechRecognition();

  recognition.lang = props.language;
  recognition.continuous = props.continuous;
  recognition.interimResults = props.interimResults;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let interimText = "";
    let finalText = "";

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
      const newValue = props.modelValue + finalText;
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

  recognition.onend = () => {
    if (isRecording.value && props.continuous) {
      recognition?.start();
    } else {
      isRecording.value = false;
    }
  };
});

onUnmounted(() => {
  if (recognition && isRecording.value) {
    recognition.stop();
  }
});

const toggleRecording = () => {
  if (!recognition) return;

  if (isRecording.value) {
    recognition.stop();
    isRecording.value = false;
  } else {
    recognition.start();
    isRecording.value = true;
  }
};

const clearTranscript = () => {
  emit("update:modelValue", "");
  interimTranscript.value = "";
};
</script>
