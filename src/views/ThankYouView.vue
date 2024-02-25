<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

function onClickHome() {
  router.push({
    name: 'home',
  })
}

onMounted(() => {
  setTimeout(() => {
    router.push({name: 'home'})
  }, 3000)
})
</script>

<template>
  <main>
    <div>
        Thank you
    </div>
    <button @click="onClickHome">Back to Home</button>
  </main>
</template>
