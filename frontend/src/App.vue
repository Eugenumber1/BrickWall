<template>
  <NavigationBar></NavigationBar>
  <div class="flex w-full h-full min-h-screen">
    <SidePanel></SidePanel>
    <CompanyList></CompanyList>
  </div>
</template>

<script setup>
import CompanyList from './components/CompanyList.vue';
import SidePanel from './components/SidePanel.vue';
import NavigationBar from './components/NavigationBar.vue';

</script>

<style></style>
