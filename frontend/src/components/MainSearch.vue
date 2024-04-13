<template>
    <div class="relative w-full flex">
        <input class="main-input w-full outline-none pl-10 pr-5" placeholder="Search for a company" v-model="search"
            @input="() => onSearchChanged()">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img src="../assets/search.svg" class="h-5 w-5 text-gray-400">
        </div>
    </div>
</template>

<script setup>
import MiniSearch from 'minisearch'
import axios from 'axios'
import { ref, onMounted } from 'vue';
import { useFiltersStore } from '@/filters.js';

const store = useFiltersStore();
const FIELDS = ['name', 'location', 'industry']

const search = ref('');
const miniSearch = ref();
const companyList = ref([]);

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/companyList');
        companyList.value = response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const onSearchChanged = () => {
    let results = miniSearch.value.search(search.value, { prefix: true, fuzzy: 0.2 });
    store.searchResult.value = results;
}

onMounted(async () => {
    await fetchData();
    miniSearch.value = new MiniSearch({ fields: FIELDS, storeField: FIELDS })
    miniSearch.value.addAll(companyList.value);
})

</script>