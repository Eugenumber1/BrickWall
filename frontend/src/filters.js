import { ref } from 'vue';
import { defineStore } from 'pinia'
export const useFiltersStore = defineStore('filters', () => {
    const searchResult = ref([]);
    const companyList = ref([]);
    return { searchResult, companyList }
})