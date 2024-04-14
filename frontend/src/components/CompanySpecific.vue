<template>
    <div class="fixed z-50 w-full bg-white grid grid-cols-8">
        <div class="flex flex-row gap-x-12 w-full p-4 col-start-3 col-span-4 justify-between">
            <a href="/"><img src="../assets/bw.svg" alt="Logo" class="h-12 w-12"></a>
            <ConnectWallet></ConnectWallet>
        </div>
    </div>
    <div class="grid grid-cols-8 w-full h-full min-h-screen pt-24 ">
        <div class=" flex flex-col col-start-3 col-span-4">
            <div class="flex relative mx-auto w-full rounded-md h-80 group overflow-hidden " @click="onPreviewClick">
                <img class="absolute h-full w-full object-fill object-center bg-black rounded-md blur-sm transition"
                    src="./../assets/company_background.png" alt="">
            </div>

            <div class="flex flex-col mt-8 gap-y-4 pb-16 border-b border-[#2b2b2b]">
                <span class="unbounded  mt-auto text-3xl font-semibold text-[#2b2b2b]">{{ company.name ?? '' }}</span>
                <span style="max-width: 90%;" class=" text-lg leading-loose">
                    {{ company.description ?? '' }}
                </span>
            </div>

            <div v-if="isUserRegistered" class="flex flex-col p-3 mt-24 ">
                <span class=" font-medium text-3xl mt-2 mb-8">Leave your <span
                        class="font-semibold text-[#B84F4F]">mark</span></span>


                <div class="w-full flex flex-col">
                    <span class=" text-xl">Give a score to a company:</span>
                    <span class="my-2 flex">
                        <div v-for="i in _.range(0, 10)" :key="i" class="cursor-pointer hover:scale-110 px-1"
                            @mouseover="() => handleMouseOver(i)" @mouseout="() => handleMouseLeft(i)"
                            @click="() => onStartClicked(i)">
                            <img v-if="i <= hoveredRarting" src="./../assets/star.svg" class="w-6">
                            <img v-else src="./../assets/star_empty.svg" class="w-6">
                        </div>
                    </span>

                </div>
                <div class=" w-full flex flex-col mt-6">

                    <span class=" text-xl mb-2">Share you experience:</span>
                    <textarea type="textarea" class="main-input outline-none p-5 my-2" v-model="newReviewContent" rows="4"
                        cols="50" />
                </div>
                <button class="button--solid mt-4" @click="onAddReview">add review</button>

            </div>

            <div class="flex flex-col gap-y-6 mt-12 mb-24">
                <div class="">
                    <span class=" text-2xl font-semibold"> Reivews:</span>

                </div>
                <template v-for="review in reviews" :key="review.id">

                    <div class="flex flex-col rounded-lg border border-[#2b2b2b] p-3 hover:border-[#B84F4F]">
                        <div class="w-full flex justify-between">
                            <div class="">
                                <span class="font-semibold">user: </span>
                                <span class="truncate">{{ id }}</span>
                            </div>
                            <div class="flex gap-x-1 align-middle">
                                <span class="font-semibold">score: </span>
                                <span class="">{{ review.rating }} / 10</span>
                                <img class="h-3 my-auto" src="./../assets/star.svg" alt="">
                            </div>

                        </div>
                        <div class=" w-full flex flex-col mt-6">
                            <span class="font-semibold">review: </span>
                            <span class=" pl-8 mt-4">{{ review.content }}</span>
                        </div>

                        <div class="flex w-full justify-end mt-12">
                            {{ processTime(company.createdAt) }}
                        </div>

                    </div>
                </template>

                <div class="flex w-ful px-8 py-12 bg-gray-200 rounded-lg text-gray-500 font-semibold"
                    v-if="reviews == undefined || reviews.length == 0">
                    <span class="m-auto"> Oh no! We didnt find any reviews {{ ':(' }}</span>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';
import ConnectWallet from './ConnectWallet.vue';
import _ from 'lodash'
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
        company.value = response.data.company_id;
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    await updateReviews();
}

const updateReviews = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/getReviewsCompany', { company_id: id });
        reviews.value = response.data;
        if (Array.isArray(reviews.value)) reviews.value = reviews.value.reverse();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
const isUserRegistered = ref(false)

onMounted(async () => {
    fetchData();
    const old_wallet = localStorage.getItem('walletHash');
    const old_id = localStorage.getItem('user_id');
    if (old_wallet && old_id) isUserRegistered.value = true;
})


const newReviewContent = ref('');
const newReviewRating = ref(0);
const hoveredRarting = ref();

const onAddReview = async () => {
    try {

        const user_id = localStorage.getItem('user_id');
        const walletHash = localStorage.getItem('walletHash');

        const response = await axios.post('http://localhost:3000/api/saveReview', {
            company_id: id,
            user_id: user_id,
            user_walletHash: walletHash,
            content: newReviewContent.value,
            rating: newReviewRating.value,
        });
        reviews.value = response.data;
        updateReviews();

        newReviewContent.value = '';
        newReviewRating.value = 0;
        hoveredRarting.value = -1;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const onStartClicked = (index) => {
    newReviewRating.value = index;
}

const handleMouseOver = (index) => {
    hoveredRarting.value = index;
}

const handleMouseLeft = (index) => {
    newReviewRating.value = index;
    hoveredRarting.value = newReviewRating.value;

}
</script>