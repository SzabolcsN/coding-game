<template>
  <div class="h-96">
    <MonacoEditor v-model="code" :lang="selectedLanguage" :options="editorOptions" theme="vs-dark"
      :style="{ width: '100%', height: '100%' }" />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  selectedLanguage: String
});
const emit = defineEmits(['update:modelValue']);

const editorOptions = ref({
  minimap: { enabled: false },
  fontSize: 14,
  theme: 'vs-dark',
});

const code = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>