const path = require('path');
const express = require('express');
const hbs = require('./middlewares/hbs');
const app = express();

// middleware
app.use(express.static("public"));
app.use(hbs().engine());


// port
const __port__ = 3000;

// router
const error404Router = require('./routes/error404Router');
const indexRouter = require('./routes/indexRouter');

app.get('/', indexRouter);

app.get('/error', error404Router);

app.listen(__port__, () => {
    console.log('app is running at http://localhost:'+__port__);
})