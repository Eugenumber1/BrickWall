const { Identity } = require("@semaphore-protocol/identity");
const { verifyProof, generateProof } = require("@semaphore-protocol/proof");
//const { Group } = require("@semaphore-protocol/group");
const bandada = require('./bandada');


// function to create a new identity based on the hashed value of the wallet address 
async function createIdentity(secret) {
    try {
        const identity = new Identity(secret);
        return identity;
    } catch (error) {
        console.error(error);
        return null;
    }
};


// createIdentity('secret').then(
//     (identity) => {
//         console.log(identity);
//         console.log(Number(identity.commitment));
//         // type of commitment 
//         console.log(typeof identity.commitment);
//     }
// );


// export 
module.exports = {
    createIdentity
};