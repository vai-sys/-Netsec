// const mongoose = require("mongoose");


// const IncidentSchema = new mongoose.Schema({
//   Incident_ID: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   Date: {
//     type: Date,
//     required: true
//   },
//   Platform: {
//     type: String,
//     required: true
//   },
//   Sector: {
//     type: String,
//     required: true
//   },
//   Incident_Type: {
//     type: String,
//     required: true
//   },
//   Threat_Level: {
//     type: String,
//     required: true,
//     enum: ['Low', 'Medium', 'High', 'Critical']
//   },
//   Location: {
//     type: String,
//     required: true
//   },
//   Description: {
//     type: String,
//     required: true
//   },
//   Incident_Solved: {
//     type: Boolean,
//     default: false
//   },
//   Source: {
//     type: String
//   },
//   Summary: {
//     type: String,
//     required: true
//   },
//   Coordinates: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       default: 'Point'
//     },
//     coordinates: {
//       type: [Number],
//       required: true
//     }
//   }
// }, {
//   timestamps: true
// });


// IncidentSchema.index({ Coordinates: '2dsphere' });
// IncidentSchema.index({
//   Description: 'text',
//   Location: 'text',
//   Incident_Type: 'text'
// });


// module.exports = mongoose.models.Incident || mongoose.model('Incident', IncidentSchema);


const mongoose = require("mongoose");

// Check if the model exists already before defining it
const IncidentSchema = new mongoose.Schema({
  Incident_ID: {
    type: String,
    required: true,
    unique: true
  },
  Date: {
    type: Date,
    required: true
  },
  Platform: {
    type: String,
    required: true
  },
  Sector: {
    type: String,
    required: true
  },
  Incident_Type: {
    type: String,
    required: true
  },
  Threat_Level: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High', 'Critical']
  },
  Location: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Incident_Solved: {
    type: Boolean,
    default: false
  },
  Source: {
    type: String
  },
  Summary: {
    type: String,
    required: true
  },
  Coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
}, {
  timestamps: true
});

// Add indexes
IncidentSchema.index({ Coordinates: '2dsphere' });
IncidentSchema.index({
  Description: 'text',
  Location: 'text',
  Incident_Type: 'text'
});

// Safer model registration that avoids the "Cannot overwrite model once compiled" error
const Incident = mongoose.models.Incident || mongoose.model('Incident', IncidentSchema);

module.exports = Incident;