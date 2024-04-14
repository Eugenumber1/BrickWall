<template>
    <div class="grid w-full  grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8 px-8 md:px-16 mb-24">
        <template v-for="company in filteredList" :key="'company_repview_'+company.id">
            <CompanyPreview :name="company.name" :id="company.id" />
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import CompanyPreview from './CompanyPreview.vue';
import { useFiltersStore } from '@/filters.js';
import _ from 'lodash'


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
        filtersStore.companyList.value = response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



onMounted(async () => {
    fetchData();

    // processCompanies();
})

// async function processCompanies() {
//     console.log("BUG FLOOD")
//     for (let company of companies) {
//         await processCompany(company);
//     }
// }
// const processCompany = async (company) => {
//     try {
//         const response = await axios.post('http://localhost:3000/api/company', {
//             name: company.name,
//             description: company.description
//         });
//         console.log(company.name + ' > ' + response)
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }


console.log(_.random(5));
</script>