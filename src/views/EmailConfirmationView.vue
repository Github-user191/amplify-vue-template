<template>
  <div class="min-h-screen flex items-center justify-center bg-black">
    <div class="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-lg">
      <h2 class="text-3xl font-bold text-white text-center mb-6">Verify Your Email</h2>
      <p class="text-gray-400 text-center mb-4">Enter the 6-digit code we sent to your email.</p>

      <form class="space-y-6">
        <!-- Code Input -->
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Verification Code</label>
          <input type="text"
                 v-model="verificationCode"
                 maxlength="6"
                 class="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                 placeholder="123456"/>
        </div>

        <!-- Verify Button -->
        <button @click.prevent="verifyCode"
                class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-8 py-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition">
          Verify Code
        </button>

        <!-- Resend Link -->
        <p class="text-center text-sm text-gray-400">
          Didn't get the code?
          <a href="#" class="text-blue-500 hover:text-blue-400">Resend</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const verificationCode = ref("");

const verifyCode = () => {
  console.log("Verifying code:", verificationCode.value);
};
</script>
