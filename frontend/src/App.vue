<template>
  <NavigationBar></NavigationBar>
  <div class="flex w-full h-full min-h-screen pt-24">
    <router-view></router-view>
  </div>
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue';

</script>

<style></style>
