<template>
    <button @click="connectWallet" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Connect Wallet <img :src="metamask" alt="MetaMask" class="h-6 mr-2">
    </button>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios'

const metamask = "./metamask.png"
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
        let account_temp = accounts[0];
        //account.value = accounts[0];
        sendData(account_temp)
    }
}

const sendData = async (account_temp) => {
    try {
        const response = await axios.post('http://localhost:3000/api/login/', { wallet: account_temp});
        account.value = response.data.walletHash;
        localStorage.setItem('walletHash', response.data.walletHash);
        localStorage.setItem('user_id', response.data.user_id);
    } catch (error) {
        console.log('Error sending data:', error)
    }
}
</script>