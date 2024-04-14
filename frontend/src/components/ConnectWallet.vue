<template>
    <button @click="connectWallet" class="button--solid flex gap-x-3">
        <span> {{isUserRegistered==true?'wallet connected':'connect wallet'}} </span><img src="../assets/metamask.png" alt="MetaMask" class="h-6 mr-6">
    </button>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios'

const account = ref(null);
const isUserRegistered = ref(false);

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
        window.ethereum.request({
            "method": "personal_sign",
            "params": [ "You are using your Ethereum Wallet to sign in to BrickWall.", account_temp ]
        })
        .then(sendData(account_temp))
        .then(isUserRegistered.value = true)
    }
}

const sendData = async (account_temp) => {
    try {
        const response = await axios.post('http://localhost:3000/api/login/', { wallet: account_temp });
        account.value = response.data.walletHash;
        localStorage.setItem('walletHash', response.data.walletHash);
        localStorage.setItem('user_id', response.data.user_id);
    } catch (error) {
        console.log('Error sending data:', error)
    }
}
</script>