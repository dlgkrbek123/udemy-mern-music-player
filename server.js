require('dotenv').config();

const express = require('express');
const port = 5000;

const dbConfig = require('./config/dbConfig');
const userRoute = require('./routes/userRoute');

const app = express();

app.use(express.json());
app.use('/api/users', userRoute);

app.listen(port, () => console.log(`server listening at ${port}`));
