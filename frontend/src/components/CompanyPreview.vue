<template>
    <div class="flex w-full border rounded-md p-4" @click="onPreviewClick">
        <div class="flex justify-between">
            <div class="flex gap-x-4">
                <img class=" w-16 h-16 bg-black rounded-md" src="./../assets/company_logo.webp" alt="">
                <div class="flex flex-col">
                    <h2 class=" text-xl">{{ name }}</h2>
                    <div class="flex gap-x-4"> <span class=" text-sm">4.0</span> <i /></div>

                </div>

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
})

const onPreviewClick = () => {
    let a = props;
    console.log(a);
}
</script>