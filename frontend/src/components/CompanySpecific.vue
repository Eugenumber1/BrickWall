<template>
    <div>
        User {{ $route.params.id }}
    </div>
</template>

<script setup>
import { useFiltersStore } from '@/filters.js';

const store = useFiltersStore();
console.log(store.companyList.value)
</script>