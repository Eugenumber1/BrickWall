<template>
    <div class="flex w-full h-full">
        <div class=" w-56">
            menu placeholder
        </div>
        <CompanyPreview />
    </div>
</template>

<script setup>
import CompanyPreview from './CompanyPreview.vue';
import _ from 'lodash'



console.log(_.random(5));
</script>