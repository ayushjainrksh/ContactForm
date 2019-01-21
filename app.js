var express = require('express'),
    app = express();

app.set("view engine" , "ejs");
app.get('/', function(req, res){
    res.render('contact.ejs');
});


app.listen(4000, function(err){
    if(err)
      console.log(err);
    else 
      console.log("Server has started....");
});