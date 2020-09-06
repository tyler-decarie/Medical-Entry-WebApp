"use strict";
var express = require("express");
var router = express.Router();
var { ensureAuthenticated } = require('../config/auth');
/* GET home page. */
router.get("/", function (req, res) {
	res.json("test");
	
});

// get dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
	res.render('dashboard', {
		name: req.patient.name
	})
);

module.exports = router;
