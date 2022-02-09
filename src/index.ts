import express from 'express';
import SERVER from './config/config'
import db from './database/db';
const cron = require('node-cron');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes')
const stockRoutes = require('./routes/stockRoutes');
const { getAllStocks } = require('./controllers/StockController')
const {updateAllQuotes} = require('./services/StockDetails');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

db();


app.use('/users',userRoutes);
app.use('/stocks',stockRoutes);

cron.schedule('* * * * *', updateAllQuotes);
const transporter = nodemailer.createTransport({


    
});

app.listen(SERVER.port, () => {
    console.log("running");
})

