<template>
    <div class="fixed bg-white flex flex-row gap-y-4 w-full p-4">
        <nav class="flex items-center justify-between">
            <img :src="logo" alt="Logo" class="h-10">
            <ul class="flex gap-x-4">
                <li v-for="page in pages" :key="page.name + page.path" class="cursor-pointer hover:text-blue-500">
                    <router-link :to="page.path">{{ page.name }}</router-link>
                </li>
            </ul>
            <button @click="connectWallet" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Connect Wallet
            </button>
        </nav>
    </div>
</template>
<script setup>
const pages = [
    { name: "Home", path: "/home" },
    { name: "Profile", path: "/profile" },
    { name: "My Company", path: "/my-company" },


]
//const pages = ['Home', 'Profile', 'My group']
const logo = './path'
</script>