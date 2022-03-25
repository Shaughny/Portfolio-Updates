import cookieParser from 'cookie-parser';
import express from 'express';
import SERVER from './config/config'
import db from './database/db';
require('dotenv').config();

const cron = require('node-cron');
const userRoutes = require('./routes/userRoutes')
const stockRoutes = require('./routes/stockRoutes');
const { sendEmails } = require('./services/EmailService');
const { updatePortfolios } = require('./services/PortfolioService');
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const store = new session.MemoryStore();
const app = express();

app.use(session({
    secret: 'secretcode',
    saveUninitalized: true,
    resave: true
}));
app.use(cookieParser('secretcode'));

app.use(express.json());


declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: any },
        authenticated: boolean,
    }
}


//Call to asynchronous function to connect the database
db();

//route endpoints for different uses
app.use('/users', userRoutes);
app.use('/stocks', stockRoutes);

// //schedule the API to generate new Data and update users at a specific time
// cron.schedule('* * * * *', updatePortfolios);

app.listen(SERVER.port, () => {
    console.log("running");
})

