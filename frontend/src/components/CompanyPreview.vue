<template>
    <a :href="'/company/' + id" class="flex relative w-full rounded-md h-80 group overflow-hidden cursor-pointer"
        @click="onPreviewClick">
        <img class="absolute h-full object-fill bg-black rounded-md blur-sm group-hover:scale-105 transition"
            src="./../assets/company_background.png" alt="">
        <div class="transition-all z-10 p-5 flex flex-col  group-hover:mb-8 ">
            <span class="unbounded  mt-auto text-lg font-semibold text-[#2b2b2b]">{{ name }}</span>
        </div>
        <div class="absolute transition-all bottom-4 left-5 opacity-0 group-hover:opacity-100">
            <div class="text-sm">crypto trading | Amsterdam | 50-200 buildors</div>
        </div>
        <div class="absolute transition-all opacity-0 group-hover:opacity-100 flex w-full h-full">
            <div class="text-sm mb-auto mr-auto p-5 text-[#2b2b2b] font-semibold">4.4 / 10</div>
        </div>
        <div class="absolute transition-all opacity-0 group-hover:opacity-100 flex w-full h-full">
            <button class="button--outline m-auto text-base">join</button>
        </div>
    </a>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    id: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        default: 'Company name'
    },
    stats: {
        default: {
            reviewsCount: 0,
            salariesCount: 0,
            vacanciesCount: 0,
        }
    },
    location: {
        type: String,
        default: 'Cryptostan'
    },
    size: {
        type: Number,
        default: 1,
    },
    industry: {
        type: String,
        default: 'crypto trading'
    },
})

const onPreviewClick = () => {
    let a = props;
    console.log(a);
}
</script>