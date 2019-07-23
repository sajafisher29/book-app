'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//API Routes
//Test: http://localhost:3000/...
app.get('/css', (req, res) => {res.render('pages/index.ejs')});

//PORT listener
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
