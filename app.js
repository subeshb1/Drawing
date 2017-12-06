//requiring
const express = require('express');

//express app
const app = express();

//Routing
app.get('/',function(request, response) {
  response.send('this is the homepage');
});

app.get('/contact',function(request, response) {
  response.send('this is the contact');
});

app.listen(process.env.PORT || 3000);
