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
        { id: 1, name: 'Company One', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'New York', size: 'Large', industry: 'Technology' },
        { id: 2, name: 'Company Two', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'San Francisco', size: 'Medium', industry: 'Finance' },
        { id: 3, name: 'Company Three', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Los Angeles', size: 'Small', industry: 'Healthcare' },
        { id: 4, name: 'Company Four', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Chicago', size: 'Large', industry: 'Retail' },
        { id: 5, name: 'Company Five', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Boston', size: 'Medium', industry: 'Technology' },
        { id: 6, name: 'Company Six', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Seattle', size: 'Small', industry: 'Finance' },
        { id: 7, name: 'Company Seven', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Austin', size: 'Large', industry: 'Healthcare' },
        { id: 8, name: 'Company Eight', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Atlanta', size: 'Medium', industry: 'Retail' },
        { id: 9, name: 'Company Nine', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Miami', size: 'Small', industry: 'Technology' },
        { id: 10, name: 'Company Ten', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Denver', size: 'Large', industry: 'Finance' },
        { id: 11, name: 'Company Eleven', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Houston', size: 'Medium', industry: 'Healthcare' },
        { id: 12, name: 'Company Twelve', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Dallas', size: 'Small', industry: 'Retail' },
        { id: 13, name: 'Company Thirteen', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Phoenix', size: 'Large', industry: 'Technology' },
        { id: 14, name: 'Company Fourteen', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Philadelphia', size: 'Medium', industry: 'Finance' },
        { id: 15, name: 'Company Fifteen', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'San Diego', size: 'Small', industry: 'Healthcare' },
        { id: 16, name: 'Company Sixteen', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Detroit', size: 'Large', industry: 'Retail' },
        { id: 17, name: 'Company Seventeen', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Portland', size: 'Medium', industry: 'Technology' },
        { id: 18, name: 'Company Eighteen', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'San Antonio', size: 'Small', industry: 'Finance' },
        { id: 19, name: 'Company Nineteen', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Las Vegas', size: 'Large', industry: 'Healthcare' },
        { id: 20, name: 'Company Twenty', reviewsCount: 0, salariesCount: 0, vacanciesCount: 0, location: 'Orlando', size: 'Medium', industry: 'Retail' }
    ];

    res.json(list);
});