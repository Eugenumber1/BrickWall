const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bandada = require('./bandada');
const mySemaphore = require('./semaphore');
const bodyParser = require('body-parser');
const { stringify } = require('querystring');
const app = express();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const pr_key = process.env.PR_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/api/status', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

app.get('/api/companylist', async (req, res) => {
    const list = await bandada.getAllGroups();
    res.json(list);
});

app.get('/api/company/:id', async (req, res) => {
    const id = req.params.id;
    const company_id = await bandada.getGroupById(id.toString());
    const reviews = await getCompanyReviewsById(company_id);
    res.json({ company_id, reviews });
});

app.get('/api/company/:id/member/:memberid/proof', async (req, res) => {
    const id = req.params.id;
    const memberId = req.params.memberid;
    const proof = await bandada.getGroupProofByUId(id.toString(), memberId.toString());
    res.json(proof);
});

app.get('/api/company/:id/members', async (req, res) => {
    const id = req.params.id;
    const groupData = await bandada.getGroupById(id.toString());
    const members = await getCompanyReviewsById(groupData)
    //const members = groupData.group.members;
    res.json(members.group.members);
});

app.post('/api/company', async (req, res) => {
    console.log(`Creating company with data: ${JSON.stringify(req.body)}`)
    const name = req.body.name;
    const description = req.body.description;
    const created = await bandada.createGroup(name, description);
    res.json(created);
});

app.post('/api/company/:id/member/:memberid', async (req, res) => {
    const id = req.params.id;
    const memberId = req.params.memberid;
    const added = await bandada.addMemberToGroup(id, memberId);
    res.json({ status: added, member: memberId, group: id });
});

app.delete('/api/company/:id/review/:reviewId', (req, res) => {
    // TODO: remove a review from a DB
    const id = parseInt(req.params.id);
    const reviewId = parseInt(req.params.reviewId);
    res.json({ id, reviewId });
});

app.delete('/api/company/:id/member/:memberId', (req, res) => {
    // TODO: remove a member from a company(group)
    const id = parseInt(req.params.id);
    const memberId = parseInt(req.params.memberId);
    res.json({ id, memberId });
});

app.delete('/api/company/:id/member/:memberId', async (req, res) => {
    const id = req.params.id;
    const memberId = req.params.memberId;
    // remove member from group 
    const removed = await bandada.removeMemberFromGroup(id, memberId);
    res.json({ status: removed, member: memberId, group: id });
});

app.delete('/api/company/:id', async (req, res) => {
    const id = req.params.id;
    const removed = await bandada.removeGroups([id]);
    res.json({ status: removed, group: id });
});

/////////////////////////// DB ///////////////////////////

function generateWalletHash(userWallet) {
    const hmac = crypto.createHmac('sha256', pr_key);
    hmac.update(userWallet);
    const hash = hmac.digest('hex');
    return hash;
}

function verifyWalletHash(userWallet, originalHash) {
    const hash = generateWalletHash(userWallet, pr_key);
    return hash === originalHash;
}

async function findUserByWallet(userWallet) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('wallet', userWallet)
    if (error) {
        console.log(`Error fetching user by wallet: ${error.message}`)
        return null;
    }
    
    return data[0]; //we need only one user ^)))
}

async function getCompanyReviewsById(company_id) {
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('company_id', company_id)
    if (error) {
        console.log(`Error fetching reviews by Company: ${error.message}`)
        return null;
    }
    return data;
}

app.post('/api/login', async (req, res) => {
    //Generate hash and verify Metamask wallet
    try {        
        const userWallet = JSON.stringify(req.body.wallet);
        console.log(`User wallet: ${userWallet}`)
        const userWalletHash = generateWalletHash(userWallet);
        const isValid = verifyWalletHash(userWallet, userWalletHash);
        if (!isValid) {
            res.status(401).json({ error: 'Invalid wallet' });
            return;
        }
        const userIdent = await mySemaphore.createIdentity(userWalletHash);

        //Find wallet in Supabase. If not found, create a new user
        let user = await findUserByWallet(userWalletHash);

        if (user === null) {
            console.log(`User not found, creating user: ${userWalletHash}`)
            const { error } = await supabase
                .from('users')
                .insert([{ wallet: userWalletHash }])
            if (error) {
                res.status(401).json({ error: 'Error creating user: ' + error.message });
            }

            //Get user by wallet
            user = await findUserByWallet(userWalletHash);
        }

        res.json({ user_id: userIdent.commitment.toString(), walletHash: userWalletHash }); //user_id: user.id,
    } catch (error) {
        res.status(401).json({ error: 'Error logging in: ' + error.message, data: JSON.stringify(req.body) });
    }
})

app.post('/api/saveReview', async (req, res) => {
    try {
        const { error } = await supabase
            .from('reviews')
            .insert([{
                company_id: req.body.company_id,
                user_id: req.body.user_id,
                user_walletHash: req.body.walletHash,
                content: req.body.content,
                rating: req.body.rating
            }])
        if (error) {
            res.status(401).json({ error: 'Error saving review: ' + error.message });
        }
        res.json({ status: 'Review saved.' });
    }
    catch (error) {
        res.status(401).json({ error: 'Error saving review: ' + error.message });
    }
})

app.post('/api/getReviewsCompany', async (req, res) => {
    const data = await getCompanyReviewsById(req.body.company_id);
    res.json(data);
})

app.post('/api/getReviewsUser', async (req, res) => {
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('user_walletHash', req.body.walletHash)
    if (error) {
        res.status(401).json({ error: 'Error fetching reviews by User: ' + error.message });
    }
    res.json(data);
})

