var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MedicalProviderSchema = new Schema({
  email: {
    type: String,
    required: true
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
  patients: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'PatientSchema'
  }],
  personalInfo: {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
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
      postalCode:{
        type: String,
        required: false
    },
      country: {
        type: String,
        required: false
      }
    },
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
  medicalStats: {
    clinic: {
      clinicName: {
        type: String,
        required: false
      },
      location: {
        clnc_address: {
          type: String,
          required: false
        },
        clnc_city: {
          type: String,
          required: false
        },
        clnc_postalCode:{
          type: String,
          required: false
      },
        clnc_country: {
          type: String,
          required: false
        }
      }
    },
    license: {
      type: String,
      required: true
    }
  }
});

const MedicalProvider = mongoose.model('MedicalProvider', MedicalProviderSchema);
module.exports = MedicalProvider;