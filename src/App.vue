<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import HeaderView from './components/HeaderView.vue'
import FooterView from './components/FooterView.vue'

const route = useRoute()
const showLayout = computed(() => !route.meta.hideLayout)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <HeaderView v-if="showLayout" />

    <main class="flex-1">
      <RouterView />
    </main>

    <FooterView v-if="showLayout" />
  </div>
</template>

<style>
.v-btn {
  text-transform: none;
}
</style>