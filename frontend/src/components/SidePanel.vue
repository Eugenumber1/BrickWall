<template>
    <div class="flex h-full">
        <div class="flex flex-col">
            <span>Name:</span>
            <input v-model="nameFilter">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const nameFilter = ref('');
</script>