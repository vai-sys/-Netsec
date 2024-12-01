const mongoose=require("mongoose");
const IncidentSchema = new mongoose.Schema({
  Incident_ID: { type: String, required: true, unique: true },
  Date: { type: Date, required: true },
  Platform: { type: String, required: true },
  Sector: { type: String, required: true },
  Incident_Type: { type: String, required: true },
  Threat_Level: { type: String, required: true },
  Location: { type: String, required: true },
  Description: { type: String, required: true },
  Incident_Solved: { type: Boolean, default: false },
  Source: { type: String },
  Summary: { type: String, required: true },
  Coordinates: { 
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
}, { timestamps: true });

module.exports = mongoose.model('Incident', IncidentSchema);
