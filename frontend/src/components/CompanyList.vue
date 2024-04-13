<template>
    <div class="flex flex-col w-full px-16 gap-y-4">
        <div>
            Company count: {{ companyList.length }} {{ filters }}
        </div>
        <div class="flex flex-col gap-y-4 w-full ">
            <template v-for="company in filteredList" :key="'company_repview_'+company.id">
                <CompanyPreview :name="company.name" />
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, computed } from 'vue'
import axios from 'axios'
import CompanyPreview from './CompanyPreview.vue';
import { useFiltersStore } from '@/filters.js';
import _ from 'lodash'

defineProps({
    filters: {
        type: Array
    }
})

const filtersStore = useFiltersStore();
const filteredList = computed(() => {
    if (filtersStore.searchResult.value == undefined || filtersStore.searchResult.value == [] || filtersStore.searchResult.value.length == 0) return companyList.value;
    const output = [];
    filtersStore.searchResult.value.forEach(res => output.push(companyList.value.find(company => company.id == res.id)));
    return output;
})
const companyList = ref([]);

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/companyList');
        companyList.value = response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

onMounted(async () => {
    fetchData();
})

console.log(_.random(5));
</script>