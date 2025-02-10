<script setup lang="ts">
import Todos from './components/Todos.vue'
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

</script>

<template>

  <router-view />

  <main>

  <amplify-authenticator>
    <template v-slot:sign-in-header>
      <h2>Welcome to My Custom Login</h2>
    </template>
  </amplify-authenticator>

  </main>
</template>

