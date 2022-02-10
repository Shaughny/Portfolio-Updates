import express from 'express';
import SERVER from './config/config'
import db from './database/db';
require('dotenv').config();

const cron = require('node-cron');
const userRoutes = require('./routes/userRoutes')
const stockRoutes = require('./routes/stockRoutes');
const {sendEmails} = require('./services/EmailService');
const {updatePortfolios} = require('./services/PortfolioService');
const app = express();
app.use(express.json());

db();


app.use('/users',userRoutes);
app.use('/stocks',stockRoutes);



cron.schedule('* * * * *', updatePortfolios);

app.listen(SERVER.port, () => {
    console.log("running");
})

