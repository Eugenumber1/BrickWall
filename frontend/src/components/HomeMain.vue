<template>
    <div class="flex h-full w-full">
        <SidePanel v-on:onFilterUpdated="(a) => onFilterUpdated(a)"></SidePanel>
        <CompanyList :filters="filters"></CompanyList>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SidePanel from './SidePanel.vue';
import CompanyList from './CompanyList.vue';

const filters = ref([]);

const onFilterUpdated = (newFilters) => {
    console.log('s', newFilters);
    filters.value = newFilters;
}
</script>