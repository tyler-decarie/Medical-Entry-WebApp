const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
let User = require("../models/User");
let Patient = require("../models/Patient");
const { comparePassword, generateToken } = require('../models/User');
let MedicalProvider = require('../models/MedicalProvider');
let Token = require('../models/Token');
const { sendEmail } = require("../util/mail");
require('dotenv').config()



router.post("/login", async (req, res, next) => {
    const email = req.body.auth.email
    const passwordReq = req.body.auth.password;

    const user = await User.findOne({
        email: email
    });

    if (!user) {
        console.log('!user');
        return res.status(401)
            .json({ error: "Invalid credentials!" });
    }

    const verified = await user.checkVerify();
    console.log(`is Verified? ` + verified);
    if (!verified) {
        console.log('!isVerified');
        return res.status(401)
            .json({ error: "User is not verified!" });
    }

    const password = await user.comparePassword(passwordReq);
    if (!password) {
        console.log('!password');
        return res.status(401)
            .json({ error: "Invalid credentials!" });
    }

    const loginToken = user.generateToken();

    User.updateOne({
        "email": email
    },
        {
            $set: {
                "loginToken": loginToken
            }
        }).then(() => {
            console.log("Users login token added")
        }).catch(err => console.log(err));


    return res.status(200).
        send(loginToken);

});

router.route('/forgot').post((req, res) => {
    const email = req.body.email;

    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            //user found
            //creating token
            const token = new Token({
                user: user._id,
            });

            //add token to db
            token.save()
                .then((token) => {
                    //update user with token
                    User.updateOne({
                        "email": email
                    },
                        {
                            $set: {
                                "token": token._id
                            }
                        }).then(() => {
                            console.log("User successfully updated with new token")
                            sendEmail(user.email, user.email, "reset", token);
                            return res.status(200).send();
                        }).catch(err => {
                            console.log(err);
                            return res.status(400).send();
                        });
                    console.log('Token added ')
                })
                .catch(err => {
                    console.log(err);
                    return res.status(400).send();
                });
        } else {
            console.log(`No user found with that email`);
            return res.status(200).send();
        }
    }).catch(err => {
        console.log(err);
        return res.status(400).send();
    });
});

router.route('/forgot/:id').post((req, res) => {
    Token.findById(req.params.id)
        .then(token => {
            if (token) {
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(req.body.password, salt, async (err, hash) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send();
                            return;
                        }

                        //find user with token
                        User.updateOne({
                            "token": token.id
                        },
                            {
                                //set password to new password, unlink token from acount
                                $set: {
                                    "token": undefined,
                                    "password": hash
                                }
                                //delete token
                            }).then((user) => {
                                if (user) {
                                    Token.findByIdAndDelete(req.params.id)
                                        .then(() => {
                                            console.log('Successfully deleted token');
                                            res.status(200).send();
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.status(400).send();
                                        });

                                    console.log("User successfully updated with new password")
                                }
                            }).catch(err => {
                                console.log(err);
                                res.status(400).send();
                            });
                        console.log('Token removed ')
                        res.json('Password updated')

                    }));

            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).send();
        });

});

router.route('/changepass').post((req, res) => {
    const id = req.body.id;
    console.log(id);
    bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if (err) {
            console.log(err);
            res.status(400).send();
            return;
        }

        //find user with token
        User.updateOne({
            "_id": id
        },
            {
                //set password to new password, unlink token from acount
                $set: {
                    "password": hash
                }
                //delete token
            }).then(() => {
                res.status(200).send()
                console.log("Password Changed");
            }).catch(err => {
                console.log(err);
                res.status(400).send();
            });
        res.json('Password updated')

    }));  

});

router.route('/forgot/token/:id').get(async (req, res) => {
    console.log('password reset ' + req.params.id)
    await Token.findById(req.params.id)
        .then(token => {
            if (token) {
                console.log('token exists');
                res.status(200).send();
            } else {
                console.log('token does not exist');
                res.status(400).send();
            }
        })
        .catch(err => {
            console.log('token does not exist');
            console.log(err);
            res.status(400).send();
        });


})

router.route('/verify').post((req, res) => {
    User.findOne({
        _id: req.body.id
    }).then(user => {
        res.send(user)
    })
        .catch(err => res.status(400).send());
})

module.exports = router;