const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/beers', function(req, res) {
    punkAPI.getBeers()
        .then((beers) => {
            res.render('beers', { beers });
        })
        .catch(error => {
            console.log(error);
        })
});

app.get('/random-beer', function(req, res) {
    punkAPI.getRandom()
        .then((beer) => {
            console.log(beer);
            res.render('randomBeer', { beer });
        })
        .catch(error => {
            console.log(error)
        })

});

app.listen(3000);