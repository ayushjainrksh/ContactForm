var express = require('express'),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer');
    app = express();

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.render('contact.ejs');
});

app.post('contact', function(req, res){
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    });
    mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;',
        to: GMAIL_USER,
        subject: 'New message',
        text: '${req.body.name} (${req.body.email}) says: ${req.body.message}'
    };
    smtpTrans.sendMail(mailOpts, function(err, res){
        if(err)
            console.log(err);
        else
            res.send("Message sent");
    });
});

app.listen(4000, function(err){
    if(err)
      console.log(err);
    else 
      console.log("Server has started....");
});