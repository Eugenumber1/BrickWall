<template>
    <div class="flex flex-col h-full gap-y-8 px-4">
        <div class="flex flex-col">
            <span>Name:</span>
            <input v-model="nameFilter" @input="() => updateFilters()">
        </div>
        <div class="flex flex-col">
            <span>Industry:</span>
            <input v-model="industryFilter" @input="() => updateFilters()">
        </div>
        <div class="flex flex-col">
            <span>Location:</span>
            <input v-model="locationFilter" @input="() => updateFilters()">
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['onFilterUpdated'])

const nameFilter = ref('');
const industryFilter = ref('');
const locationFilter = ref('');

const updateFilters = () => {
    emit('onFilterUpdated', {
        name: nameFilter.value,
        industry: industryFilter.value,
        location: locationFilter.value,
    });

}

</script>