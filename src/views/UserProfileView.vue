<template>
  <div class="min-h-screen bg-black">
    <NavBarComponent />

    <main class="max-w-4xl mx-auto px-6 py-16">
      <div class="mb-12">
        <h2 class="text-4xl font-bold text-white">User Profile</h2>
        <p class="text-gray-400 text-lg">Manage your account and track your short links.</p>
      </div>

      <!-- User Info Card -->
      <div class="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg mb-8">
        <h3 class="text-2xl text-white font-semibold mb-4">Profile Information</h3>
        <div class="text-gray-300 space-y-2">
          <p><span class="font-semibold text-white">User ID:</span> {{ user.id }}</p>
          <p><span class="font-semibold text-white">Name:</span> {{ user.name }}</p>
          <p><span class="font-semibold text-white">Email:</span> {{ user.email }}</p>
          <p><span class="font-semibold text-white">Account Type:</span> {{ user.accountType }}</p>
          <p><span class="font-semibold text-white">Joined:</span> {{ user.joined }}</p>
        </div>
      </div>

      <!-- User Statistics -->
      <div class="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg mb-8">
        <h3 class="text-2xl text-white font-semibold mb-4">Your Stats</h3>
        <div class="grid grid-cols-3 gap-6 text-center">
          <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p class="text-gray-400 text-sm">Total Links</p>
            <p class="text-white text-2xl font-bold">{{ stats.totalLinks }}</p>
          </div>
          <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p class="text-gray-400 text-sm">Total Clicks</p>
            <p class="text-white text-2xl font-bold">{{ stats.totalClicks }}</p>
          </div>
          <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p class="text-gray-400 text-sm">Active Links</p>
            <p class="text-white text-2xl font-bold">{{ stats.activeLinks }}</p>
          </div>
        </div>
      </div>

      <!-- User Short Links -->
      <div class="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg">
        <h3 class="text-2xl text-white font-semibold mb-4">Your Shortened Links</h3>

        <ul v-if="userLinks.length" class="space-y-4">
          <li 
            v-for="(link, index) in userLinks" 
            :key="index"
            class="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md"
          >
            <div class="flex justify-between items-center">
              <div>
                <p class="text-gray-400 text-sm">Original URL:</p>
                <a :href="link.originalUrl" target="_blank" class="text-blue-400 hover:underline">
                  {{ link.originalUrl }}
                </a>
                <p class="text-gray-400 text-sm mt-2">Shortened URL:</p>
                <a :href="link.shortUrl" target="_blank" class="text-green-400 hover:underline">
                  {{ link.shortUrl }}
                </a>
              </div>
              <div class="text-right">
                <p class="text-gray-400 text-sm">Created At:</p>
                <p class="text-white">{{ link.createdAt }}</p>
                <p class="text-gray-400 text-sm mt-2">Expires At:</p>
                <p class="text-white">{{ link.expiresAt }}</p>
              </div>
            </div>

            <div class="mt-4 flex justify-between">
              <p :class="{
                'text-green-400': link.isActive, 
                'text-red-500': !link.isActive 
              }" class="font-semibold">
                {{ link.isActive ? "Active" : "Deactivated" }}
              </p>
              <p class="text-gray-400 text-sm">Clicks: {{ link.clicks }}</p>
            </div>

            <div class="mt-4 flex gap-4 justify-end">
              <button 
                @click="toggleLinkStatus(link)"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                {{ link.isActive ? "Deactivate" : "Activate" }}
              </button>
              <button 
                @click="deleteLink(index)"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>

        <p v-else class="text-gray-400 text-lg">No links created yet.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import NavBarComponent from '../components/NavBarComponent.vue';
import { useAuthStore } from "@/stores/auth";


const authStore = useAuthStore();
const user = ref({});

onBeforeMount(async () => {
  user.value = await authStore.getUserDetails
  console.log(user.value)
})


// Mocked user data (Replace with API call)
// const user = ref({
//   id: "usr_12345",
//   name: "John Doe",
//   email: "johndoe@example.com",
//   accountType: "Premium",
//   joined: "2024-02-10"
// });

// Mocked stats (Replace with API call)
const stats = ref({
  totalLinks: 24,
  totalClicks: 8530,
  activeLinks: 18
});

// Mocked user links (Replace with API call)
const userLinks = ref([
  {
    originalUrl: "https://www.example.com/blog/how-to-code",
    shortUrl: "https://short.ly/abc123",
    createdAt: "2024-02-05",
    expiresAt: "2025-03-10",
    isActive: true,
    clicks: 235
  },
  {
    originalUrl: "https://www.example.com/news/latest-tech",
    shortUrl: "https://short.ly/xyz456",
    createdAt: "2024-01-10",
    expiresAt: "2024-12-15",
    isActive: false,
    clicks: 112
  }
]);

// Toggle link status between Active/Deactivated
const toggleLinkStatus = (link) => {
  link.isActive = !link.isActive;
  // API call to update the status in the database
};

// Delete a link
const deleteLink = (index) => {
  userLinks.value.splice(index, 1);
  // API call to delete the link from the database
};
</script>
