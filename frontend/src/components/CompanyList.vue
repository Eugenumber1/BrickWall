<template>
    <div class="flex flex-col gap-y-4 w-full p-16">
        <template v-for="company in companyList" :key="'company_repview_'+company.id">
            <CompanyPreview :name="company.name" />
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CompanyPreview from './CompanyPreview.vue';
import _ from 'lodash'

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