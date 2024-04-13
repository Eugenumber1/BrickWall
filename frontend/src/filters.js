import { ref } from 'vue';
import { defineStore } from 'pinia'
export const useFiltersStore = defineStore('filters', () => {
    const searchResult = ref([]);

    return { searchResult }
})