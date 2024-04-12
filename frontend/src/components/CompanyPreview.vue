<template>
    <div class="flex justify-between w-full gap-y-3 border-2 rounded-md p-4" @click="onPreviewClick">
        <div class="flex flex-col gap-y-3">
            <div class="flex gap-x-4">
                <img class=" w-16 h-16 bg-black rounded-md" src="./../assets/company_logo.webp" alt="">
                <div class="flex flex-col">
                    <h2 class=" text-xl">{{ name }}</h2>
                    <div class="flex gap-x-4"> <span class=" text-sm">4.0</span></div>
                </div>
            </div>
            <div class="flex flex-col">
                <span>Location:</span>
                <span class="">{{ location }}</span>
            </div>
        </div>
        <div class="flex mt-auto">

            <div class="flex flex-col">
                <span>Size:</span>
                <span class="">{{ size }}</span>
            </div>

        </div>

        <div class="flex flex-col gap-y-3">
            <div class="flex gap-x-4">
                <div class="flex flex-col gap-y-2">
                    <span>{{ stats.reviewsCount }}K</span>
                    <a>Reviews</a>
                </div>
                <div class="flex flex-col gap-y-2">
                    <span>{{ stats.salariesCount }}K</span>
                    <a>Salaries</a>
                </div>
                <div class="flex flex-col gap-y-2">
                    <span>{{ stats.vacanciesCount }}K</span>
                    <a>Vacancies</a>
                </div>
            </div>

            <div class="flex flex-col">
                <span>Industry:</span>
                <span class="">{{ industry }}</span>
            </div>
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