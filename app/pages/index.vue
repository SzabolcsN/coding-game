<template>
  <div class="container mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
    <div class="mb-4">
      <select v-model="selectedLanguage" class="p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500">
        <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
      </select>
    </div>

    <div class="border rounded-lg shadow-sm overflow-hidden">
      <CodeEditor v-model="code" :selected-language="selectedLanguage" />
    </div>

    <div class="mt-6">
      <button @click="executeCode" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all">
        Run Code
      </button>
    </div>

    <div v-if="output" class="mt-6 p-6 bg-gray-100 rounded-lg shadow-inner">
      <pre class="text-gray-800 font-mono">{{ output }}</pre>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';

const code = ref('// Write your code here');
const selectedLanguage = ref('javascript');
const languages = ['javascript', 'python', 'java', 'c', 'cpp', 'csharp'];
const output = ref(null);

const executeCode = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/execute', 
      JSON.stringify({ code: code.value, language: selectedLanguage.value }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    output.value = response.data.output;
  } catch (error) {
    output.value = `Error: ${error.response?.data?.error || error.message}`;
  }
};
</script>
