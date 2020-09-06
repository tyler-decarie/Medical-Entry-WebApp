const express = require('express');
const router = express.Router();
const { sendEmail } = require("../util/mail");


router.route('/sendmail').post((req, res) => {
    const email = req.body.email;
    console.log(email);
    sendEmail(email, "Karman", "hello");

});

module.exports = router;
