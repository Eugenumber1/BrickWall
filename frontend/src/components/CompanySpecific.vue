<template>
    <div class="fixed z-50 w-full bg-white grid grid-cols-8">
        <div class="flex flex-row gap-x-12 w-full p-4 col-start-3 col-span-4 justify-between">
            <img src="../assets/bw.svg" alt="Logo" class="h-12 w-12">
            <button class="button--solid text-[#2b2b2b] py-2">back to list</button>
        </div>
    </div>
    <div class="grid grid-cols-8 w-full h-full min-h-screen pt-24 ">
        <div class=" flex flex-col col-start-3 col-span-4">
            <div class="flex relative mx-auto w-full rounded-md h-80 group overflow-hidden " @click="onPreviewClick">
                <img class="absolute h-full w-full object-fill object-center bg-black rounded-md blur-sm transition"
                    src="./../assets/company_background.png" alt="">
            </div>
            <div class="flex flex-col mt-8 gap-y-4 ">
                <span class="unbounded  mt-auto text-3xl font-semibold text-[#2b2b2b]">{{ company.name }}</span>
                <span>
                    {{ company.description }}
                </span>
            </div>

            <div class="flex flex-col gap-y-6 mt-12">
                <div class="">
                    <span> Reivews:</span>

                </div>
                <template v-for="review in reviews" :key="review.id">

                    <div class="flex flex-col rounded-lg border border-[#2b2b2b] p-3">
                        <div class="w-full flex justify-between">
                            <div class="">
                                <span class="font-semibold">user: </span>
                                <span class="truncate">{{ id }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">score: </span>
                                <span>{{ review.rating }} / 10</span>

                            </div>

                        </div>
                        <div class=" w-full flex flex-col mt-6">
                            <span class="font-semibold">Review: </span>
                            <span>{{ review.comment }}</span>
                        </div>

                        <div class="flex w-full justify-end mt-6">
                            {{ processTime(company.createdAt) }}
                        </div>

                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const company = ref([]);
const reviews = ref();

const processTime = (time) => {
    let date = new Date(time);
    return date.toDateString();
}

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/company/' + id);
        company.value = response.data.group;
        reviews.value = [response.data.review];
        console.log(reviews.value)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

onMounted(async () => {
    fetchData();
})
</script>