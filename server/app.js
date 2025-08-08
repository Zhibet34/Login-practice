require('dotenv').config();
const express = require('express');
const homeRoute = require('./routes/homeRoute');
const cors = require('cors');
const corsOptions = require('./config/coorOption')
const sessionMiddleware = require('./config/session')
const passport = require('./config/passport')
const initializePassport = require('./config/pass-config')
const cookieParser = require('cookie-parser')
const app =  express();
const mongoose = require('mongoose');
const registrationRoute = require('./routes/registration');
const loginRoute = require('./routes/loginRoute');
const authRoute = require('./routes/authRoute');
const logoutRoute = require('./routes/logoutRoute');
const todoRoute = require('./routes/todo_create_Route');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/test-2')
    .then(()=>{
        console.log('the database is connected')
    })

    // Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

app.use('/',homeRoute);
app.use('/register',registrationRoute)
app.use('/login',loginRoute);
app.use('/auth',authRoute);
app.use('/logout',logoutRoute);
app.use('/add', todoRoute)

app.listen(3000,()=>{
    console.log('the server is live on 3000')
})