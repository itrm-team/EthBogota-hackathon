'use strict';

const express = require('express');
const path = require('path');
const app = express();
var serveIndex = require('serve-index');

app.set('port', 8080);
app.use(express.static(path.join(__dirname, '/public')));
app.use('/public', serveIndex(__dirname + '/public'));
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

console.log(__dirname, path.join(__dirname, '/public'));

// App
const server = app.listen(app.get('port'), function () {
	console.log('The server is running on: ' + app.get('port'));
});
