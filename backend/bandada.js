const { ApiSdk } = require("@bandada/api-sdk");
require('dotenv').config();

const adminApiKey = process.env.ADMIN_API_KEY;

const apiSdk = new ApiSdk();

async function getAllGroups() {
    // at the moment this retrieves all groups from bandada
    try {
        const groups = await apiSdk.getGroups();
        return groups;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// id: String
async function getGroupById(id) {
    try {
        const group = await apiSdk.getGroup(id);
        return group;
    } catch (error) {
        console.error(error);
        return null;
    }
}