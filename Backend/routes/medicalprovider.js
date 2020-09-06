const express = require('express');
const router = express.Router();
let MedicalProvider = require('../models/MedicalProvider');
let User = require('../models/User');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { comparePassword, generateToken } = require('../models/User');
let Token = require('../models/Token');
const { sendEmail } = require("../util/mail");
require('dotenv').config()

router.route('/').get((req, res) => {
    MedicalProvider.find()
        .then(medicalprovider => res.send(medicalprovider))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req,res) => {

    const email = req.body.email;
    const password = req.body.password;

    //patients: added here

    //Peronsal info variables
    const firstname = req.body.personalInfo.firstname;
    const lastname = req.body.personalInfo.lastname;

    //Address
    const street = "";
    const city = "";
	const postalCode = "";
    const country = "";
    const address = {street, city,postalCode, country};

    //Emergency Contact
    const name =  req.body.personalInfo.emergencyContact.name;
    const phoneNumber =  req.body.personalInfo.emergencyContact.phoneNumber;
    const emg_email =  req.body.personalInfo.emergencyContact.emg_email;
    const emergencyContact = {name, phoneNumber, emg_email};

    const personalInfo = {firstname,lastname, address, emergencyContact};

    //medicalStats variables

    //Clinic
    const clinicName =  req.body.medicalStats.clinic.clinicName;
    //Location variables
    const clnc_address =  req.body.medicalStats.clinic.location.clinicName;
    const clnc_city =  req.body.medicalStats.clinic.location.clinicName;
    const clnc_postalCode =  req.body.medicalStats.clinic.location.clinicName;
    const clnc_country =  req.body.medicalStats.clinic.location.clinicName;
    const location = {clnc_address,clnc_city,clnc_postalCode,clnc_country};
    const clinic = {clinicName, location};

    //License
    const license =  req.body.medicalStats.license;

    const medicalStats = {clinic, license};

   
    //Create new medical provider
    const newMedProv = new MedicalProvider({email, password, personalInfo, medicalStats});
    console.log("new medical provider: " + newMedProv);

        newMedProv.save()
       .then(() => res.json('Medical Provider added'))
       .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add/medicalpro').post((req, res) => {
	console.log(req.body);
    const username = req.body.username;
	const email = req.body.email;
    const password = req.body.password;

    //patients: added here

    //Peronsal info variables
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    //Address
    const street = "";
    const city = "";
	const postalCode = "";
    const country = "";
    const address = {street, city,postalCode, country};

    //Emergency Contact
    const name =  "";
    const phoneNumber =  "";
    const emg_email =  "";
    const emergencyContact = {name, phoneNumber, emg_email};

    const personalInfo = {firstname,lastname, address, emergencyContact};

    //medicalStats variables

    //Clinic
    const clinicName = "";
    //Location variables
    const clnc_address = "";
    const clnc_city = "";
    const clnc_postalCode = "";
    const clnc_country = "";
    const location = {clnc_address,clnc_city,clnc_postalCode,clnc_country};
    const clinic = {clinicName, location};

    //License
    const license =  req.body.licenseid;

    const medicalStats = {clinic, license};

	bcrypt.genSalt(10, (err, salt) =>
		bcrypt.hash(password, salt, async (err, hash) => {
			if (err) {
				console.log(err);
				res.status(500).json(`Error: ${err}`);
				return;
			}
			const newMedPro = new MedicalProvider({ username, email, password: hash, personalInfo, medicalStats });
			const user = new User({ username, email, password: hash, type: "medicalProvider" });
			console.log("new MedicalProvider: " + user);

			await user.save()
				.then(() => {
					newMedPro.save()
						.then(() => {
							console.log('USER.VERIFY TOKEN: ' + user.verifyToken);
							sendEmail(user.email, newMedPro.personalInfo.firstname, "register", user.verifyToken);
						})
						.catch(err => console.log(`Error: ${err}`));
					res.json('User added')
				}).catch(err => {
					console.log(err);
					res.status(400).json(`Error: ${err}`)
				});
		}));



});

module.exports = router;