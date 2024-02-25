<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

function onClickHome() {
  router.push({
    name: 'home',
  })
}
</script>

<template>
  <main>
    <div>
        Thank you
    </div>
    <button @click="onClickHome">Back to Home</button>
  </main>
</template>
