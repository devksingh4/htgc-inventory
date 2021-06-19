import express = require('express');
import path = require('path');
import hbs = require('hbs');

const port = process.env.PORT || 8190;
const app = express()

app.use(express.json({ extended: true, limit: '50mb' }))
app.use(express.static(path.join(__dirname, 'public')));

app.disable('x-powered-by');
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.set('trust proxy', 1);

app.use(function (req, res, next) {
  res.set('X-Frame-Options', 'DENY')
  next();
})

//routes
require('./routes/base')(app);

// handle 404
app.use(function (req, res) {
  res.status(404).render('404')
});

app.use(function (error, req, res, next) {
  if (error) {
    res.status(500).render('500')
  }
  next()
});

app.listen(port, () => console.log(`Listening at port ${port}`));
module.exports = app;