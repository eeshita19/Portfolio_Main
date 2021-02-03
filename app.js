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
app.listen(8080, function () {
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

app.get('/api/fetchDesc/:dir*', (req, res) => {
    let file = 'views/pages/' + req.params.dir + req.params[0] + '/index.ejs';
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            res.status(400).send(`Error: ${err}`);
        }
        else {
            const dom = new JSDOM(data);
            let desc = dom.window.document.querySelector("#desc").innerHTML;
            let len = 300;
            if (desc.length > len) {
                desc = desc.substring(0, len) + " ..";
            }
            res.status(200).send(desc);
        }
    });
});