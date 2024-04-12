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
    const list = [
        { id: 1, name: 'Company One' },
        { id: 2, name: 'Company Two' },
        { id: 3, name: 'Company Three' },
        { id: 4, name: 'Company Four' },
    ];
    res.json(list);
});