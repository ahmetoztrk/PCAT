const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Photo = require('./models/Photo');

const app = express();

//CONNECTING DB
mongoose
  .connect('mongodb://localhost/pcat-db')
  .then(() => console.log('Connected to db!!'));

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ encoded: true }));
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.get('/photo', (req, res) => {
  res.render('photo');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
