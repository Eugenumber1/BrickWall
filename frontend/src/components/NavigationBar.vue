<template>
    <nav class="fixed bg-white flex flex-row gap-x-5 w-full p-4">
        <img src="../assets/bw.svg" alt="Logo" class="h-10 w-10">
        <MainSearch class="w-full"></MainSearch>
        <button class="button--solid">connect wallet</button>
        <ConnectWallet class="hidden" />
    </nav>
</template>
<script setup>
import MainSearch from './MainSearch.vue';
import ConnectWallet from './ConnectWallet.vue';

</script>