let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

let usersRouter = require('./routes/users');

let app = express();
app.use(cors());

// mongodb+srv://Duos:@duos071119@maincluster.d77dl.mongodb.net/duos?retryWrites=true&w=majority


app.use(logger('dev')); // process.env.LOGS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);

module.exports = app;
