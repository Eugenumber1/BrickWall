const { Identity } = require("@semaphore-protocol/identity");
const { verifyProof, generateProof } = require("@semaphore-protocol/proof");
const { Group } = require("@semaphore-protocol/group");
const bandada = require('./bandada');
const { toBigInt, encodeBytes32String, decodeBytes32String, toBeHex } = require('ethers');


// function to create a new identity based on the hashed value of the wallet address 
async function createIdentity(secret) {
    try {
        const identity = new Identity(secret);
        return identity;
    } catch (error) {
        console.log('Error creating identity')
        console.error(error);
        return null;
    }
};


async function generateSemaphoreProof(groupId, identity, signal) {
    // get identity data 
    // retrieve the merkle proof for the user from the group
    const retrievedProof = await bandada.getGroupProofByUId(groupId, identity.commitment);

    // retrieve the members of the group 
    const groupData = await bandada.getGroupById(groupId);
    let group;
    let proof, merkleTreeRoot, nullifierHash;
    const externalNullifier = retrievedProof.root;
    try {
        group = new Group(groupId, groupData.treeDepth, groupData.members);
        ({ proof, merkleTreeRoot, nullifierHash } = await generateProof(identity, group, groupId, signal, {
            zkeyFilePath: "./semaphore.zkey",
            wasmFilePath: "./semaphore.wasm"}));
    } catch (error) {
        console.log('Error creating or generating proof')
        console.error(error);
        return null;
    }
    if (proof) {
        return {
            proof,
            merkleTreeRoot,
            nullifierHash,
            externalNullifier
        };
    }
    return null;
}

// main async function to test the code
async function main() {
    // create a new identity TODO: fix the identity thingy, we gotta make sure that the identity is in the group already
    const groupId = "28071079664146566504035345815015";
    let testIdentity = await createIdentity("0x12345");
    const signal = toBigInt(encodeBytes32String("11")).toString(); // TODO: test - hardcoded
    console.log(`Test Identity: ${testIdentity}`);
    console.log(`The commitment of the test identity ${testIdentity.commitment}`)
    // generate a semaphore proof
    const { proof, merkleTreeRoot, nullifierHash, externalNullifier } = await generateSemaphoreProof(groupId, testIdentity, signal);
    console.log(`Proof: ${proof}, Merkle Tree Root: ${merkleTreeRoot}, Nullifier Hash: ${nullifierHash}, External Nullifier: ${externalNullifier}`);

    const verified = await verifyProof({
        merkleTreeRoot,
        nullifierHash,
        externalNullifier: groupId,
        proof: proof,
        signal: signal,
    }, 16);
    console.log(`Verified: ${verified}`);
}

(async () => {
    await main();
})();

// export 
module.exports = {
    createIdentity
};