<template>
    <nav class="fixed z-50 bg-white flex flex-row gap-x-12 w-full p-4">
        <img src="../assets/bw.svg" alt="Logo" class="h-10 w-10">
        <MainSearch class="w-full"></MainSearch>
        <ConnectWallet />
    </nav>
</template>
<script setup>
import MainSearch from './MainSearch.vue';
import ConnectWallet from './ConnectWallet.vue';

</script>