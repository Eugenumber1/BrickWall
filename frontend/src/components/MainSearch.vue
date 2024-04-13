<template>
    <input class="main-input outline-none px-5" v-model="search" @input="() => onSearchChanged()">
</template>

<script setup>
import MiniSearch from 'minisearch'
import axios from 'axios'
import { ref, defineEmits, onMounted } from 'vue';

const emit = defineEmits('onSearch');

const FIELDS = ['name', 'location']

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
    let results = miniSearch.value.search(search.value);
    emit('onSearch', results);
    console.log('results ', results);
}

onMounted(async () => {
    await fetchData();
    miniSearch.value = new MiniSearch({ fields: FIELDS })
    miniSearch.value.addAll(companyList.value);
})

</script>