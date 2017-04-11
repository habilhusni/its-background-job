const express           = require('express');
const bodyParser        = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', (req,res,next) => {
    res.send('hello');
})

app.listen(3000);