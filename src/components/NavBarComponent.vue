<template>
  <!-- Nav -->
  <nav class="border-b border-gray-800">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <RouterLink to="/">
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-bold text-white">Short<span class="text-blue-500">URL</span></h1>
        </div>
      </RouterLink>


      <!-- Buttons -->
      <div class="flex items-center gap-4">


        <!-- If NOT Logged In: Show Sign In & Register -->
        <template v-if="!authStore.isAuthenticated">
          <RouterLink to="/sign-in">
            <button class="text-white border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800">
              Sign In
            </button>
          </RouterLink>

          <RouterLink to="/sign-up">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Register
            </button>
          </RouterLink>
        </template>

        <!-- If Logged In: Show Profile & Logout -->
        <template v-else>
          <RouterLink to="/user-profile">
            <button class="text-white border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800">
              Profile
            </button>
          </RouterLink>

          <button
            @click="signOutUser"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Sign Out
          </button>
        </template>

                      auth {{authStore.isAuthenticated}}

      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { signOut } from '@aws-amplify/auth';

const authStore = useAuthStore();

const signOutUser = async () => {
  
  const s = await signOut();

  router
  console.log(s)
  //authStore.signOut();
}
</script>
