const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  Report_ID: { type: String, required: true, unique: true },
  Reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Date: { type: Date, default: Date.now },
  Incident_Type: { type: String, required: true },
  Threat_Level: { type: String, required: true },
  Location: { type: String, required: true },
  Description: { type: String, required: true },
  Status: { type: String, enum: ['Pending', 'Reviewed', 'Under Investigation'], default: 'Pending' },  
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);
