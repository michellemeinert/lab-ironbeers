
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const beers = punkAPI.getBeers();
const promise1 = new Promise( (resolve, reject)=>{
  if (beers) {
      resolve(beers);
      
    } else if (!beers) {
      reject();
    }
  })
const randomBeer = punkAPI.getRandom();
const promise2 = new Promise ( (resolve, reject)=>{
  if(randomBeer) {
    resolve(randomBeer);
  } else if (!randomBeer) {
    reject();
  }
})


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  promise1
   .then( (beers)=> {
     let data = {
       beers
     }
     console.log('hi');
     
     res.render('beers', data)
   })
   .catch ( (error)=> {
     console.log(error);
   })
})

app.get('/random-beer', (req ,res ,next)=> {
  punkAPI.getRandom()
  .then((randomBeer)=>{
    let data = {
     randomBeer
    }
    res.render('randomBeers', data)
  })
  .catch ( (error)=> {
    console.log(error);
  })
})


app.listen(3000);
