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
                Connect Wallet <img :src="metamask" alt="MetaMask" class="h-6 mr-2">
            </button>
        </nav>
    </div>
</template>
<script setup>
import { ref } from "vue";

const pages = [
    { name: "Home", path: "/home" },
    { name: "Profile", path: "/profile" },
    { name: "My Company", path: "/my-company" },
]

const logo = './path'
const metamask = "https://www.google.com/imgres?q=metamask%20icon&imgurl=https%3A%2F%2Fuxwing.com%2Fwp-content%2Fthemes%2Fuxwing%2Fdownload%2Fbrands-and-social-media%2Fmetamask-icon.svg&imgrefurl=https%3A%2F%2Fuxwing.com%2Fmetamask-icon%2F&docid=COwRwC88vPOL4M&tbnid=0WhE0RWBe5b6rM&vet=12ahUKEwjf_bmSpL2FAxWLgf0HHZ4ECfkQM3oECGcQAA..i&w=800&h=742&hcb=2&ved=2ahUKEwjf_bmSpL2FAxWLgf0HHZ4ECfkQM3oECGcQAA";

const account = ref(null);

function connectWallet() {
    if (window.ethereum) {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(handleAccountsChanged)
            .catch((err) => {
                if (err.code === 4001) {
                    console.error('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
    } else {
        console.error('Please install MetaMask!');
    }
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        console.error('Please connect to MetaMask.');
    } else {
        account.value = accounts[0];
    }
}

</script>