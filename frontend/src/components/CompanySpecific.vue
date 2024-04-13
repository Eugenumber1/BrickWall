<template>
    <div class="fixed z-50 bg-white flex flex-row gap-x-12 w-full p-4">
        <img src="../assets/bw.svg" alt="Logo" class="h-10 w-10">
    </div>
    <div class="grid grid-cols-8 w-full h-full min-h-screen pt-24 ">
        <div class=" flex flex-col col-start-3 col-span-4">
            <div class="flex relative mx-auto w-full rounded-md h-80 group overflow-hidden " @click="onPreviewClick">
                <img class="absolute h-full w-full object-fill object-center bg-black rounded-md blur-sm transition"
                    src="./../assets/company_background.png" alt="">
            </div>
            <div class="flex flex-col mt-8 ">
                <span class="unbounded  mt-auto text-3xl font-semibold text-[#2b2b2b]">Company name {{ $route.params.id
                }}</span>

                <span>

                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useFiltersStore } from '@/filters.js';

const store = useFiltersStore();
console.log(store.companyList.value)
</script>