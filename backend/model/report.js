


const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ReportSchema = new mongoose.Schema({
  Reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Title: {
    type: String,
    required: [true, 'Title is required']
  },
  Description: {
    type: String,
    required: [true, 'Description is required']
  },
  Incident_Type: {
    type: String,
    required: [true, 'Incident Type is required']
  },
  Threat_Level: {
    type: String,
    required: [true, 'Severity is required']
  },
  Location: {
    type: String
  },
  Additional_Notes: {
    type: String
  },
  Report_ID: {
    type: String,
    unique: true
  },
  Status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Under Investigation', 'Closed'],
    default: 'Pending'
  },
  Date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });


ReportSchema.pre('save', async function(next) {
 
  if (this.isNew) {
    try {
    
      const lastReport = await this.constructor.findOne({}, { Report_ID: 1 })
        .sort({ createdAt: -1 })
        .lean();
      
      let newReportNumber = 1000;
      
      if (lastReport && lastReport.Report_ID) {
    
        const match = lastReport.Report_ID.match(/RPT-(\d+)/);
        if (match && match[1]) {
          newReportNumber = parseInt(match[1], 10) + 1;
        }
      }
      
      this.Report_ID = `RPT-${newReportNumber}`;
    } catch (error) {
      console.error('Error generating Report_ID:', error);
     
      const timestamp = Math.floor(Date.now() / 1000);
      this.Report_ID = `RPT-${timestamp}`;
    }
  }
  next();
});

ReportSchema.plugin(mongoosePaginate);

module.exports = mongoose.models.Report || mongoose.model('Report', ReportSchema);