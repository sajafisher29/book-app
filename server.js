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
// app.get('/', (req, res) => {res.render('pages/index.ejs')});

//Renders the search form
app.get('/', newSearch);

//Creates a new search to the Google Books API (Handler)
app.post('/searches', createSearch);

//Catch-all
app.get('*', (request, response) => response.status(404).send('404 Error: This route does not exist.'));

//PORT listener
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

//Helper functions
function Book(info) {
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';

  this.title = info.title;
  this.authors = info.authors;
  this.image = info.imageLinks.thumbnail;
  this.description = info.description;
}

//Note that .ejs file extension is not required
function newSearch(request, response) {
  response.render('pages/index')
}

//Note that no API required

//Console.log request.body and request.body.search
function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);
  console.log(request.body.search);

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', { searchResults: results }))
    .catch(error => handleError(error));
}

//Handle errors
function handleError(err, res) {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong.')
}
