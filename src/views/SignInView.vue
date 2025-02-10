<template>
  <div class="min-h-screen bg-black">
    <NavBarComponent />

    <div class="min-h-screen flex items-center justify-center bg-black">
      <div
        class="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-gray-700 relative"
      >
        <h2 class="text-3xl font-bold text-white text-center">Welcome back!</h2>
        <p class="text-gray-400 text-center mb-6">
          Sign in to start shortening links.
        </p>

        <form @submit.prevent="login" class="space-y-6">
          <div class="relative">
            <input
              type="email"
              v-model="email"
              placeholder="Email address"
              class="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div class="absolute top-3 right-4 text-gray-500">📧</div>
          </div>

          <div class="relative">
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div class="absolute top-3 right-4 text-gray-500">🔒</div>
          </div>

          <div class="text-right">
            <a href="#" class="text-blue-500 hover:text-blue-400 text-sm"
              >Forgot password?</a
            >
          </div>

          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-8 py-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition"
          >
            Sign In
          </button>

          <RouterLink to="/sign-up">
            <p class="text-center text-sm text-gray-400 mt-3">
              Don't have an account?
              <a href="#" class="text-blue-500 hover:text-blue-400">Sign up</a>
            </p>
          </RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import {getCurrentUser, signIn, signOut} from '@aws-amplify/auth';
import NavBarComponent from "../components/NavBarComponent.vue";
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/auth";


const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const router = useRouter();

onBeforeMount(() => {
  authStore.checkAuth();
  console.log(authStore.isAuthenticated)
  if (!authStore.isAuthenticated) {
    //router.push("/login");
  }})

const login = async () => {

  console.log(email.value)
  console.log(password.value)
  try {
    await signIn({
      username: email.value,
      password: password.value
    });
    
    //await signOut();
    alert('Login successful');
    router.push('/'); // Redirect to dashboard after login
  } catch (error) {
    alert(error.message);
  }
};
</script>
