"use strict";
var flash = require("connect-flash");
var debug = require("debug");
var express = require("express");
var cors = require('cors');
var session = require("express-session");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
var passport = require("passport");
var appInsights = require("applicationinsights");
if (process.env.NODE_ENV == "production") {
	appInsights.setup();
	appInsights.start();
}
var server;
var app = express();
require('dotenv').config()


var corsOptions = {
	origin: 'http://localhost:3001',
	credentials: true
}

app.use(cors(corsOptions));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

console.log(path.join(__dirname, "build"))

//db connection
var connectionString =
	//"mongodb://project-clear:6ZBeyofIT3LPx6nuzXC7kslhgMJgOHagmM52MG8ICBU2t5clVVsmY7kvdXtAMeBkfeAITAudopHXFp2paPBBxA==@project-clear.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";
	"mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));


// app.get("*", (req, res) => {
// 	res.sendFile(path.resolve(__dirname, "build",
// 		"index.html"));
// });

//app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/entry", require("./routes/entry"));
app.use("/login", require("./routes/login"));
app.use("/medicalprovider", require("./routes/medicalprovider"));
app.use("/search", require("./routes/search"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render("error", {
			message: err.message,
			error: err,
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render("error", {
		message: err.message,
		error: {},
	});
});

app.set("port", process.env.PORT || 3000);

exports.listen = function () {
	server = app.listen(app.get("port"), function () {
		debug(
			"Express server listening on port " +
			server.address().port
		);
	});
};

exports.close = function () {
	server.close(() => {
		debug("Server stopped.");
	});
};

this.listen();
