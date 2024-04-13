<template>
    <div class="flex flex-col h-full w-full gap-y-8">
        <div class="flex flex-col mx-auto py-24 gap-y-16">
            <h1 class="text-9xl font-semibold"> Brick Wall</h1>
            <div class="grid grid-cols-4 grid-rows-2 rounded-lg border border-[#2b2b2b]">
                <span class="border-r border-b border-[#2b2b2b] p-4">companies</span>
                <span class="border-r border-b border-[#2b2b2b]  p-4">reviews</span>
                <span class="border-r border-b border-[#2b2b2b]  p-4">avg. rating</span>
                <span class="border-b border-[#2b2b2b]  p-4">clients</span>
                <span class="border-r border-[#2b2b2b]  p-4">{{ companyCount }}</span>
                <span class="border-r border-[#2b2b2b] p-4">{{ Math.floor(companyCount * 1.833) }}</span>
                <span class="border-r border-[#2b2b2b]  p-4">4.4</span>
                <span class=" p-4">8503</span>
            </div>
        </div>
        <CompanyList></CompanyList>
    </div>
</template>

<script setup>
import CompanyList from './CompanyList.vue';
import { useFiltersStore } from '@/filters.js';
import { computed } from 'vue'

const store = useFiltersStore();
const companyCount = computed(() => store.companyList.value.length);
</script>