<template>
  <div class="min-h-screen bg-black">
    <NavBarComponent />

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-6 py-16">
      <div class="mb-12">
        <h2 class="text-5xl font-bold text-white mb-4">Short links, <br />big impact.</h2>
        <p class="text-gray-400 text-xl">A powerful URL shortener for modern professionals.</p>
      </div>

      <!-- Input Card -->
      <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-lg relative">
        <div class="space-y-8">
          <div class="relative">
            <div class="flex gap-4">
              <input
                v-model="originalUrl"
                type="url"
                placeholder="https://your-long-url.com"
                class="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                @click="shortenUrl"
                :disabled="isLoading"
                class="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-8 py-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50"
              >
                {{ isLoading ? "Shortening..." : "Shorten" }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">

            <StatisticComponent 
                  v-for="(item, index) in statistics" 
                  :key="index" 
                  :title="item.title" 
                  :text="item.text" 
            />

          </div>

          <!-- Output Section (Displays after shortening) -->
          <div v-if="shortenedUrl" class="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-6">
            <p class="text-gray-400 text-sm">Shortened URL:</p>
            <a :href="shortenedUrl" target="_blank" class="text-blue-400 text-lg font-bold hover:underline">
              {{ shortenedUrl }}
            </a>

            <p class="text-gray-400 text-sm mt-4">Expires At:</p>
            <p class="text-white text-md">{{ expiresAt }}</p>
          </div>

          <!-- Error Message -->
          <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import NavBarComponent from '../components/NavBarComponent.vue';
import StatisticComponent from '../components/StatisticComponent.vue';
import { useAuthStore } from "@/stores/auth";


import { onBeforeMount, ref } from "vue";
import { getCurrentUser } from '@aws-amplify/auth';

const authStore = useAuthStore();
const originalUrl = ref("");
const shortenedUrl = ref(null);
const expiresAt = ref(null);
const errorMessage = ref("");
const isLoading = ref(false); // Loading state

const statistics = [
  {
    title: "Total Links",
    text: "1,234"
  },
  {
    title: "Total Clicks",
    text: "85.4K"
  },
  {
    title: "Active Users",
    text: "512"
  }
]

onBeforeMount(async () => {
  console.log(await authStore.getUserDetails())
})

const shortenUrl = () => {
  if (!originalUrl.value.trim()) {
    errorMessage.value = "Please enter a valid URL.";
    return;
  }

  errorMessage.value = "";
  isLoading.value = true;

  // Simulate URL shortening
  setTimeout(() => {
    shortenedUrl.value = `https://short.ly/${Math.random().toString(36).substr(2, 6)}`;
    expiresAt.value = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    isLoading.value = false;
    //await apiGet();
  }, 2000);
};
</script>
