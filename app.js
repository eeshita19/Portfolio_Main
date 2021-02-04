// import * as config from './_config/config.js'
const config = require('./_config/config.js');
const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');

// external requests
const request = require('request-promise');
const url = require('url');
const querystring = require('querystring');
const http = require('http');

// jsdom
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.set('trust proxy', true);

const port = process.env.PORT || '8080';
app.listen(port, function () {
    console.log('App listening on port !');
});


app.get(/^(?!\/api\/)/, (req, res) => {
    let purl = url.parse(req.url, true);
    let pathname = 'pages' + purl.pathname;

    if ((pathname)[pathname.length - 1] === '/') {
        pathname += 'index';
    }
    res.render(pathname, purl.query);
});

