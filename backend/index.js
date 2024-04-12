const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/api/status', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

app.get('/api/companylist', (req, res) => {
    // TODO: retrieve the list of companies from db
    const list = [
        { id: 1, name: 'Company One' },
        { id: 2, name: 'Company Two' },
        { id: 3, name: 'Company Three' },
        { id: 4, name: 'Company Four' },
    ];
    res.json(list);
});

app.get('/api/company/:id', (req, res) => {
    // TODO: fetch company(group) data from db 
    const id = parseInt(req.params.id);
    const company = { id, name: `Company ${id}` };
    res.json(company);
});

app.get('/api/company/:id/proof', (req, res) => {
    // TODO: retrieve merkle proof for a company(group)
    // invoke a function from bandada.js
    const id = parseInt(req.params.id);
    const proof = { id, proof: '0x1234567890' };
    res.json(proof);
});

app.get('/api/company/:id/members', (req, res) => {
    // TODO: retrieve all members of a company(group)
    // invoke a function from bandada.js
    const id = parseInt(req.params.id);
    const members = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
    ];
    res.json(members);
});

app.post('/api/company/:id/review', (req, res) => {
    // TODO: upload a review for a company(group)
    // invoke a function from bandada.js 
    const id = parseInt(req.params.id);
    const review = req.body;
    res.json({ id, review });
});

app.post('/api/company/:id/member', (req, res) => {
    // TODO: add a member to a company(group)
    // invoke a function from bandada.js
    const id = parseInt(req.params.id);
    const member = req.body;
    res.json({ id, member });
});

app.delete('/api/company/:id/review/:reviewId', (req, res) => {
    // TODO: remove a review from a company(group)
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