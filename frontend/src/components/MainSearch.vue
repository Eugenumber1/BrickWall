<template>
    <input v-model="search" @input="() => onSearchChanged()">
</template>

<script setup>
import MiniSearch from 'minisearch'
import { ref, defineEmits, onMounted, defineProps } from 'vue';

const props = defineProps({
    list: {
        type: Array
    },
    fields: {
        type: Array
    },
})
const emit = defineEmits('onSearch');

const search = ref('');
const miniSearch = ref();

const onSearchChanged = () => {
    let results = miniSearch.value.search(search.value);
    emit('onSearch', results);
    console.log('results ', results);
}

onMounted(() => {
    miniSearch.value = new MiniSearch({ fields: props.fields })
    miniSearch.value.addAll(props.list);
})

</script>