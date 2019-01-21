var express = require('express'),
    app = express();

app.get('/', function(req, res){
    res.send("Hello...");
});


app.listen(4000, function(err){
    if(err)
      console.log(err);
    else 
      console.log("Server has started....");
});