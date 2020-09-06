var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PatientSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isBanned: {
        type: Boolean,
        required: false,
        default: false
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    personalInfo: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        phoneNum: {
            type: String,
            required: false
        },
        address: {
            street: {
                type: String,
                required: false
            },
            city: {
                type: String,
                required: false
            },
            postalCode: {
                type: String,
                required: false
            },
            country: {
                type: String,
                required: false
            },
            province:{
                type: String,
                required: false
            }
        }
        ,
        emergencyContact: {
            name: {
                type: String,
                required: false
            },
            phoneNumber: {
                type: String,
                required: false
            },
            emg_email: {
                type: String,
                required: false
            }
        }
    },
    patientStats: {
        gender: {
            type: String,
            required: false
        },
        birthday: {
            type: Date,
            required: false
        },
        bloodType: {
            type: String,
            required: false
        },
        height: {
            height_unit: {
                type: String,
                required: false
            },
            height_num: {
                type: Number,
                required: false
            }
        },
        weight: {
            weight_unit: {
                type: String,
                required: false
            },
            weight_num: {
                type: Number,
                required: false
            }
        },
        disabilities: {
            disab_name: {
                type: String,
                required: false
            },
            disab_type: {
                type: String,
                required: false
            },
            disab_definition: {
                type: String,
                required: false
            }
        },
        allergies: {
            alg_name: {
                type: String,
                required: false
            },
            alg_type: {
                type: String,
                required: false
            },
            alg_severity: {
                type: String,
                required: false
            }
        },
        medications: {
            med_name: {
                type: String,
                required: false
            },
            dosage: {
                type: String,
                required: false
            },
            fillCount: {
                type: Number,
                required: false
            },
            prescribedBy: {
                type: String,
                required: false
            },
            prescribedDate: {
                type: Date,
                required: false
            },
            renewDate: {
                type: Date
            }
        }
    },
    medicalProviders: {},
    entries: {}
});

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;
