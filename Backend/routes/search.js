const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
let User = require("../models/User");
let Patient = require("../models/Patient");
let MedicalProvider = require('../models/MedicalProvider');

//Search for a patient
// router.route('/search-patient').post((req, res) => {

// //Get the name of patient to search
// const firstname = req.body.firstname;
// console.log("firstname: " + firstname);

// Patient.findOne({'personalInfo.firstname': firstname}).then(function(result){
//     //Will return the email of found result
//     console.log(result.email);
//     console.log("Found patient: " + result.personalInfo.firstname + " " + result.personalInfo.lastname);
    

// }).catch(err => {
//     console.log(err);
//     res.status(400).json(`Error: ${err}`)
// });

// res.json('Patient Searched');
// });

//Search for multiple patients
router.route('/search-patients').post((req, res) => {
    //Get the name of patient to search
    const firstname = req.body.firstname;
    console.log("firstname: " + firstname);
    
    Patient.find({'personalInfo.firstname': firstname})
    .then(function(result){
        //Will return the info of users found
        result.forEach((result) =>
        {
            console.log(result.email);
        console.log("Found patient: " + result.personalInfo.firstname + " " + result.personalInfo.lastname);
        });
         
    }).catch(err => {
        console.log(err);
        res.status(400).json(`Error: ${err}`)
    });
    });

//Search for a Medical Provdier
// router.route('/search-medical-provider').post((req, res) => {

//     //Get the name of patient to search
//     const firstname = req.body.name;
//     console.log("firstname: " + firstname);
    
//     MedicalProvider.findOne({'personalInfo.firstname': firstname}).then(function(result){
//         //Will return the email of found results
//         console.log(result.email);
//         console.log("Found Medical provider: " + result.personalInfo.firstname + " " + result.personalInfo.lastname);
        
    
//     }).catch(err => {
//         console.log(err);
//         res.status(400).json(`Error: ${err}`)
//     });
    
//     res.json('Medical Provider Searched');
//     });

    //Search for a Medical Provdier
router.route('/search-medical-provider').post((req, res) => {

    //Get the name of patient to search
    const firstname = req.body.name;
    console.log("firstname: " + firstname);
    
    MedicalProvider.find({'personalInfo.firstname': firstname})
    .then(function(result){

        //Will return the info of Medical Providers found
        result.forEach((result) =>
        {
            console.log(result.email);
            console.log("Found Medical provider: " + result.personalInfo.firstname + " " + result.personalInfo.lastname);
        });
    
    }).catch(err => {
        console.log(err);
        res.status(400).json(`Error: ${err}`)
    });
    
    res.json('Medical Provider Searched');
    });



module.exports = router;