//requiring express
const express = require('express');

//Router
const router = require('./controller/router');

//express app
const app = express();

//setting up the view files
app.set('view engine','ejs');

//assets handling
app.use('/assets',express.static('assets'));

router(app);


app.listen(process.env.PORT || 4000);
console.log("listening to port 4000");
