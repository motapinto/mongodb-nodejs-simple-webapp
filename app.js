// Express
const express = require('express');
const app = express();

// Built-in body-parser from express
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// EJS with express
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Mongo DB
const mongoose = require('mongoose');

// .env for db configs (hide db connection credentials)
require('dotenv/config'); 

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

// DB connection
mongoose.connect(
    process.env.DB_CONNECTION, 
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to db!'))
.catch(err => console.log(err));

const PORT = 3000;
app.listen(PORT, console.log(`Server started at port ${PORT}!`));