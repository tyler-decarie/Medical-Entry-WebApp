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


router.route("/").get((req, res) => {
	User.find()
		.then((patients) => res.send(patients))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.post("/add", (req, res) => {
	const email = req.body.email;
	bcrypt.genSalt(10, (err, salt) =>
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			if (err) {
				console.log(err);
				res.status(500).json(`Error: ${err}`);
				return;
			}
			//console.log(hash);
			const newPatient = new User({
				email: email,
				password: hash,
			});

			newPatient
				.save()
				.then(() => {
					res.json("User added");
					//res.redirect('/login');
				})
				.catch((err) =>
					res.status(400).json(`Error: ${err}`)
				);
		})
	);
});

//Adding a new phone account
router.route('/add/phone').post((req, res) => {

	const phonenumber = req.body.phonenumber;
	const password = req.body.password;

	const newPhone = new Phone({ phonenumber, password });
	console.log("new phone: " + newPhone);
	newPhone.save()
		.then(() => {
			user.save().catch(err => res.status(400).json(`Error: ${err}`));
			res.json('phone added')
		}).catch(err => res.status(400).json(`Error: ${err}`));
});


router.route("/loadUser/:id").get(async(req, res) => {
	console.log(req.params);
	await User.findOne({
		"_id": req.params.id,
	})
	.then(async(user) => {
		if(user){
			console.log('user' + user.email);
			await Patient.findOne({
				"email": user.email,
			})
			.then((patient) => {
				res.status(200).json(patient);
			}).catch(err => {
				console.log(err);
				res.status(400).send();
			});
		}else{
			console.log("error");
			res.status(400).send();
		}
	})
	.catch(err => {
		console.log(err);
		res.status(400).send();
	});
});

router.route('/update').post(async(req, res ) => {
	const id = req.body.id;

	const email = req.body.email;
	const username = req.body.username;

	/* Personal info */
	const firstname = req.body.firstName;
	const lastname = req.body.lastName;
	const phoneNum= req.body.phoneNum;
	// address
	const street=  req.body.street;
	const city= req.body.city;
	const postalCode= req.body.postalcode;
	const province= req.body.province;
	const country= req.body.country;
	// emergency contact
	const name= req.body.name;
	const phoneNumber= req.body.phoneNumber;
	const emg_email= req.body.emg_email;

	const address = { street, city, postalCode, country, province };
	const emergencyContact = { name, phoneNumber, emg_email };
	const personalInfo = { firstname, lastname, phoneNum, address, emergencyContact};

	/* Patient Stats */ 
	const gender = req.body.gender;
	const birthday =  req.body.birthday;
	const bloodType =  req.body.bloodType;
	// height
	const height_unit = req.body.height_unit;
	const height_num = req.body.height_num;
	// weight
	const weight_unit = req.body.weight_unit;
	const weight_num = req.body.weight_num;
	// disabilites
	const disab_name = req.body.disab_name;
	const disab_type = req.body.disab_type;
	const disab_definition = req.body.disab_definition;
	// allergies
	const alg_name = req.body.alg_name;
	const alg_type = req.body.alg_type;
	const alg_severity = req.body.alg_severity;
	// medication
	const med_name = req.body.med_name;
	const dosage = req.body.dosage;
	const fillCount = req.body.fillCount;
	const prescribedBy = req.body.prescribedBy;
	const prescribedDate = req.body.prescribedDate;
	const renewDate = req.body.renewDate;

	const height = { height_unit, height_num};
	const weight = { weight_unit, weight_num};
	const disabilities = { disab_name, disab_type, disab_definition };
	const allergies = { alg_name, alg_type, alg_severity };
	const medications = { med_name, dosage, fillCount, prescribedBy, prescribedDate, renewDate }

	const patientStats = { gender, birthday, bloodType, height, weight, disabilities, allergies, medications };

	await User.findOneAndUpdate({
		"_id": id,
	},
	{
		"email": email,
		"username": username,
	})
	.then(async(user) => {
		if(user){
			console.log('user' + user.email);
			await Patient.findOneAndUpdate({
				"email": user.email,
			},
			{
				"username" : username,
				"email" : email,
				"personalInfo": personalInfo,
				"patientStats": patientStats,
			})
			.then((patient) => {
				console.log("patient" + patient);
				console.log("Account updated");
			}).catch(err => {
				console.log(err);
				res.status(400).send();
			});
		}
	})
	.then(() => {
		res.status(200).send()
		console.log("Account updated");
	}).catch(err => {
		console.log(err);
		res.status(400).send();
	});
})

//Adding a new patient to the database 
router.route('/add/patient').post((req, res) => {
	console.log(req.body);

	const email = req.body.email;
	const password = req.body.password;
	//Peronsal info variables
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const username = req.body.username;
	//Address
	const street = "";
	const city = "";
	const postalCode = "";
	// const country = req.body.personalInfo.address.country;
	const address = { street, city, postalCode };
	//Emergency Contact
	// const name = req.body.personalInfo.emergencyContact.name;
	const phoneNum = req.body.phoneNum;
	// const emg_email = req.body.personalInfo.emergencyContact.emg_email;
	// const emergencyContact = { name, phoneNumber, emg_email };
	// const personalInfo = { firstname, lastname, address, emergencyContact };
	const personalInfo = { firstname, lastname, address, phoneNum };
	//Patient stats variables
	const gender = "";
	const birthday = "";
	// const bloodType = req.body.patientStats.bloodType;
	//Height
	// const height_unit = req.body.height;
	// const height_num = req.body.height.;
	// const height = { height_unit, height_num };
	// //Weight 
	// const weight_unit = req.body.patientStats.weight.weight_unit;
	// const weight_num = req.body.patientStats.weight.weight_num;
	// const weight = { weight_unit, weight_num };
	// //Disabilities
	// const disab_name = req.body.patientStats.disabilities[0].disab_name;
	// const disab_type = req.body.patientStats.disabilities[0].disab_type;
	// const disab_definition = req.body.patientStats.disabilities[0].disab_definition;
	// const disabilities = [{ disab_name, disab_type, disab_type }];
	// //Allergies
	// const alg_name = req.body.patientStats.allergies[0].alg_name;
	// const alg_type = req.body.patientStats.allergies[0].alg_type;
	// const alg_severity = req.body.patientStats.allergies[0].alg_severity;
	// const allergies = [{ alg_name, alg_type, alg_severity }];

	// //Medication
	// const med_name = req.body.patientStats.medications[0].med_name;
	// const dosage = req.body.patientStats.medications[0].dosage;
	// const fillCount = req.body.patientStats.medications[0].fillCount;
	// const prescribedBy = req.body.patientStats.medications[0].prescribedBy;
	// const prescribedDate = req.body.patientStats.medications[0].prescribedDate;
	// const renewDate = req.body.patientStats.medications[0].renewDate;
	// const medications = [{ med_name, dosage, fillCount, prescribedBy, prescribedDate, renewDate }];

	// const patientStats = { gender, birthday, bloodType, height, weight, disabilities, allergies, medications };
	const patientStats = { gender, birthday };

	// //Medical Providers
	// const medicalProviders = new Array();

	// //Entries
	// const entries = new Array();

	//Create new patient
	// const newPatient = new Patient({ email, password, personalInfo, patientStats, medicalProviders, entries });

	bcrypt.genSalt(10, (err, salt) =>
		bcrypt.hash(password, salt, async (err, hash) => {
			if (err) {
				console.log(err);
				res.status(500).json(`Error: ${err}`);
				return;
			}
			const newPatient = new Patient({ username, email, password: hash, personalInfo, patientStats });
			const user = new User({ username, email, password: hash, type: "patient" });
			console.log("new Patient: " + newPatient);

			await user.save()
				.then(() => {
					newPatient.save()
						.then(() => {
							console.log('USER.VERIFY TOKEN: ' + user.verifyToken);
							sendEmail(user.email, newPatient.personalInfo.firstname, "register", user.verifyToken);
						})
						.catch(err => res.status(400).json(`Error: ${err}`));
					res.json('User added')
				}).catch(err => {
					console.log(err);
					res.status(400).json(`Error: ${err}`)
				});
		}));



});

router.route('/activate').post((req, res) => {
	console.log(req.body.token);
	User.findOne({
		verifyToken: req.body.token
	}).then(user => {
		user.isVerified = true;
		user.save();
		//console.log(user.isVerified);
		res.send(user)
	})
		.catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/getpatients').post((req, res) => {
	Patient.find({isActive: true}).then(users => {
		res.send(users);
	})
		.catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/searchpatients').post((req, res) => {
	console.log(req.body.firstname);
	Patient.find({'personalInfo.firstname': req.body.firstname}).then(users => {
		console.log(users);
		res.send(users);
	})
		.catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/searchmedpros').post((req, res) => {
	console.log(req.body.firstname);
	MedicalProvider.find({'personalInfo.firstname': req.body.firstname}).then(users => {
		console.log(users);
		res.send(users);
	})
		.catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/getmedpros').post((req, res) => {
	MedicalProvider.find({isActive: true}).then(users => {
		console.log(users);
		res.send(users);
	})
		.catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;
