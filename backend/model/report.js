const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  Report_ID: { 
    type: String, 
    required: true, 
    unique: true 
  },
  Reporter: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  Incident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incident',
    required: true
  },
  Date: { 
    type: Date, 
    default: Date.now 
  },
  Incident_Type: { 
    type: String, 
    required: true 
  },
  Threat_Level: { 
    type: String, 
    required: true 
  },
  Location: { 
    type: String, 
    required: true 
  },
  Description: { 
    type: String, 
    required: true 
  },
  Status: { 
    type: String, 
    enum: ['Pending', 'Reviewed', 'Under Investigation', 'Closed'], 
    default: 'Pending' 
  }
}, { timestamps: true });

// Pre-save hook to generate unique Report_ID
ReportSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastReport = await this.constructor.findOne().sort({ createdAt: -1 });
    const newReportNumber = lastReport 
      ? parseInt(lastReport.Report_ID.split('-')[1]) + 1 
      : 1000;
    this.Report_ID = `RPT-${newReportNumber}`;
  }
  next();
});

module.exports = mongoose.model('Report', ReportSchema);