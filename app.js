require('dotenv').config()

var express = require('express'),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer');
    app = express();

USER = process.env.GMAIL_USER;
PASS = process.env.GMAIL_PASS;

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.render('contact.ejs');
});

app.post('/contact', function(req, res){
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: USER,
            pass: PASS
        }
    });
    mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;',
        to: USER,
        subject: 'New message',
        text: 'Sent by : ' + req.body.name + ' Email : ' + req.body.email + ' Message : ' + req.body.message
    };
    smtpTrans.sendMail(mailOpts, function(err){
        if(err){
            console.log(err);
            res.send('Failed to send the message');
        }
        else
            res.render("contact-success.ejs");
    });
});

app.listen(4000, function(err){
    if(err)
      console.log(err);
    else 
      console.log("Server has started....");
});