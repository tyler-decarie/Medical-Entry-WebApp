
const express = require('express');
const router = express.Router();
let Entry = require('../models/Entry');
let Patient = require('../models/Patient');
let Category = require('../models/Category');
let User = require('../models/User');


router.route('/').post((req, res) => {
    console.log(req.body.patient)
    Entry.find({ patient: req.body.patient })
        .then(entries => res.send(entries))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/searchentries').post((req, res) => {
    console.log(req);
    Entry.find({ title: { "$regex": req.body.title, "$options": "i" }, patient: req.body.patient })
        .then(entries => res.send(entries))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// router.route('/add').post(async (req, res) => {

//     console.log(req.body.data[0].categoryQuestions);
// });

router.route('/add').post(async (req, res) => {
    console.log("id=" + req.body.id);
    await User.findOne({
        _id: req.body.id
    }).then(user => {
        if (user) {
            Patient.findOne({
                "email": user.email
            }).then(patient => {
                if (patient) {
                    console.log(`PATIENT: ` + user.id);
                    const contents = req.body.contents;
                    const data = req.body.data;
                    const title = req.body.title;
                    const dateOfEntry = req.body.date;
                    const timeOfEntry = req.body.time;
                    const patientID = user.id;
                    const newEntry = new Entry({
                        contents,
                        title,
                        patient: patientID,
                        dateOfEntry,
                        timeOfEntry,
                    });

                    newEntry.save()
                        .then(async (entry) => {

                            await Entry.updateOne(entry, {
                                $push: {
                                    "category": {
                                        $each: data
                                    }
                                }
                            }).catch((err) => console.log(err));

                            // data.forEach(async element => {
                            //     console.log(element);
                            //     await Entry.updateOne(entry, {
                            //         $addToSet: {
                            //             "category": {
                            //                 $each: data
                            //             }
                            //         }
                            //     }).catch((err) => console.log(err));
                            // });

                            await Patient.updateOne(patient, {
                                $push: {
                                    "entries": entry._id
                                }
                            }).then(() => {
                                console.log('Successfully created entry and attached it to the user!')
                                res.status(200).send('Successfully created entry');
                            }).catch((err) => {
                                res.status(400).send(`Error: ${err}`);
                                console.log(err);
                            })
                        })
                        .catch(err => {
                            res.status(400).send(`Error: ${err}`);
                            console.log(err);
                        });
                } else {
                    console.log('couldnt find patient');
                }
            })

        } else {
            res.status(400).send(`Error:`);
            console.log('patient not found');
        }
    }).catch(err => {
        res.status(400).send(`Error: ${err}`);
        console.log(err);
    });
});

router.route('/:id').get((req, res) => {
    Entry.findById(req.params.id)
        .then(entry => res.send(entry))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// router.route('/delete').delete((req, res) => {
//     // console.log("In the backend: " + req.data.title);
//     console.log("In the backend: " + req.params.data.title);
//     console.log("In the backend: " + res);
//     // console.log("In the backend: " + res.title);
//     const titleDelete = req.title;
//     // Entry.findByIdAndDelete(req.params.id)
//     //     .then(() => res.json('Deleted entry'))
//     //     .catch(err => res.status(400).json(`Error: ${err}`));
//     Entry.findOneAndDelete({ title: titleDelete }, function (err) {
//         if(err) console.log(err);
//         console.log("Successful deletion");
//       });
// });

router.route('/delete').post((req, res) => {
        //Delete by title
        const titleDelete = req.body.title;
        Entry.findOneAndDelete({"title": titleDelete }, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion");
          });
    });

router.route('/update/:id').post((req, res) => {
    Entry.findById(req.params.id)
        .then(entry => {
            entry.contents = req.body.contents;
            entry.save()
                .then(() => res.json('Updated entry'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/category/add').post((req, res) => {
    const categoryName = req.body.categoryName;
    const question = req.body.question;
    const response = req.body.response;


    // const category = new Category({
    //     categoryName,
    //     questions
    // });

    Category.updateOne({ categoryName: categoryName }, {
        $push: {
            "questions": { question, response }
        }
    }, { upsert: true }
    ).then((category) => {
        console.log(category);
        console.log(`Successfully added question to category ${categoryName}!`)
        res.status(200).send(`Successfully added question to category ${categoryName}!`);
    }).catch((err) => {
        res.status(400).send(`Error: ${err}`);
        console.log(err);
    })

});

router.route('/category/getQuestions').get((req, res) => {
    Category.find({
    })
        .then(categories => {
            if (categories) {
                console.log(categories);
                res.json(categories);
            } else {
                res.status(401).send();
            }
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/getentrylist').post((req, res) => {
    const selectedEntries = req.body.selectedEntries;
    Entry.find({
        _id: {
            $in: selectedEntries
        }
    }).then((entries) => {
        res.status(200).json(entries);
    }).catch((err) => {
        res.status(400).send();
    })
})

module.exports = router;