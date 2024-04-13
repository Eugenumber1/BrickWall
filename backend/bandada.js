const { ApiSdk } = require("@bandada/api-sdk");
require('dotenv').config();

const ADMIN_ID = '0x4aabb51acc1e31313aa6f8fc9737e33a3b2fb19bfda60e93078c6e6ce801d25b'; // HARDCODED ADMIN_ID DUE TO MISSING ENDPOINT TO GET ADMIN_ID

const adminApiKey = process.env.ADMIN_API_KEY;

const apiSdk = new ApiSdk();

async function getAllGroups() {
    // at the moment this retrieves all groups from bandada
    try {
        const groups = await apiSdk.getGroups();
        // filter out the groups by where admin == ADMIN_ID
        const adminGroups = groups.filter(group => group.admin === ADMIN_ID);
        return adminGroups;
    } catch (error) {
        console.error(error.response.data);
        return null;
    }
}

// id: String
async function getGroupById(id) {
    try {
        const group = await apiSdk.getGroup(id);
        // TODO: - fetch reviews from db? 
        const review = {
            id: 1,
            rating: 5,
            comment: "Great company!"
        }
        return { group, review };
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function createGroup(name, description) {
    try {
        const company = await apiSdk.createGroup(
            {
                name: name, 
                description: description,
                treeDepth: 16, // keep tree depth at 16 for now
                fingerprintDuration: 3600 // credentials are valid for 1 hour 
            },
            adminApiKey
        )
        // TODO: save company to db
        return company;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getGroupProofByUId(groupId, userId) {
    try {
        const proof = await apiSdk.generateMerkleProof(groupId, userId);
        return proof;
    } catch (error) {
        console.error(error.response.data);
        return null;
    }
}

async function addMemberToGroup(groupId, userId) {
    try {
        await apiSdk.addMemberByApiKey(groupId, userId, adminApiKey);
        // TODO: add member to db or not? 
        return true; // api call doesn't return anything, so we return true if there's no error 
    } catch (error) {
        console.error(error.response.data);
        return false;
    }
}

async function removeMemberFromGroup(groupId, userId) {
    try {
        await apiSdk.removeMemberByApiKey(groupId, userId, adminApiKey);
        return true; // api call doesn't return anything, so we return true if there's no error
    } catch (error) {
        console.error(error.response.data);
        return false;
    }
}

// 
async function removeGroups(groupIds) {
    try {
        await apiSdk.removeGroups(groupIds, adminApiKey);
        return true; // api call doesn't return anything, so we return true if there's no error
    } catch (error) {
        console.error(error.response.data);
        return null;
    }
}

// export all the functions 
module.exports = {
    getAllGroups,
    getGroupById,
    createGroup,
    getGroupProofByUId,
    addMemberToGroup,
    removeMemberFromGroup,
    removeGroups
};