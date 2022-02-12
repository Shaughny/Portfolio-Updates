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

//Call to asynchronous function to connect the database
db();

//route endpoints for different uses
app.use('/users',userRoutes);
app.use('/stocks',stockRoutes);


//schedule the API to generate new Data and update users at a specific time
cron.schedule('* * * * *', updatePortfolios);

app.listen(SERVER.port, () => {
    console.log("running");
})

