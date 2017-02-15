var express = require('express');
var router  = express.Router();
var path    = require('path');

var htmlPath = path.resolve(__dirname + '/../../public/html/');

router.get('/public/:folder/:name', (req, res) => {
	res.sendFile(path.resolve(__dirname + '/../../public/' + req.params.folder + '/' + req.params.name));
});

router.get('*', (req, res) => {res.sendFile(path.resolve(htmlPath + '/index.html'))});

module.exports = router;
