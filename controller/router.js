module.exports = function(app) {


//Routing
app.get('/',function(req,res){
  res.render('index');
});

app.get('/contact',function(req,res) {
  res.send('this is the contact');
});

app.get('/profile/:name', function(req,res) {
  res.send('this is the contact');
});

app.get('/javascript', function(req,res) {
  res.render('javascript');
});

};
