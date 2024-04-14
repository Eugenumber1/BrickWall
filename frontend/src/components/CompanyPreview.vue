<template>
    <a :href="'/company/' + id" class="flex relative w-full rounded-md h-80 group overflow-hidden cursor-pointer"
        @click="onPreviewClick">
        <div class="absolute z-10 h-full opacity-5 w-full" :style="cardColorClass"></div>
        <img class="absolute h-full object-fill bg-black rounded-md blur-sm group-hover:scale-105 transition"
            src="./../assets/company_background.png" alt="">
        <div class="transition-all z-20 p-5 flex flex-col  group-hover:mb-8 ">
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
import { defineProps, onMounted, ref } from 'vue';
// import _ from 'lodash';
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

const cardColorClass = ref();
onMounted(() => {


    const colorList = [
        '#FF5733', '#33FF57', '#5733FF', '#FF33A6', '#33A6FF',
        '#A6FF33', '#FF336C', '#33FFA6', '#336CFF', '#A6FF33',
        '#FFB533', '#B533FF', '#33FFB5', '#FF3357', '#3357FF',
        '#FF5733', '#33FF57', '#5733FF', '#FF33A6', '#33A6FF'
    ];
    cardColorClass.value = 'background-color:' + colorList[props.id[0]] ?? '#33A6FF';
})
</script>