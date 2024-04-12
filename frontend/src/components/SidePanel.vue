<template>
    <div class="flex flex-col h-full gap-y-8 px-4">
        <div class="flex flex-col">
            <span>Name:</span>
            <input v-model="nameFilter">
        </div>
        <div class="flex flex-col">
            <span>Industry:</span>
            <input v-model="industryFilter">
        </div>
        <div class="flex flex-col">
            <span>Location:</span>
            <input v-model="locationFilter">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const nameFilter = ref('');
const industryFilter = ref('');
const locationFilter = ref('');
</script>