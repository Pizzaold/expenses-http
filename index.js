import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.get('/express', (req, res) => {
    res.sendFile('/home/jurmo/CODE/expenses-http/data/express.json')
});

app.listen(3005, () => {
    console.log('Server is running on port 3005');
});