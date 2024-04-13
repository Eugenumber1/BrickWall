<template>
    <div class="flex relative w-full rounded-md h-80" @click="onPreviewClick">
        <img class="absolute h-full object-fill bg-black rounded-md blur-sm" src="./../assets/company_background.png"
            alt="">
        <div class="z-10 p-5 flex">
            <span class="mt-auto text-lg font-semibold text-[#2b2b2b]">{{ name }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
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