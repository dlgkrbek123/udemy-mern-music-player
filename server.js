const express = require('express');

require('dotenv').config();
const dbConfig = require('./config/dbConfig');

const port = 5000;

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`server listening at ${port}`));
