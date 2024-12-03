const Report = require('../model/report');
const Incident = require('../model/Incident');
const { generatePDF, generateCSV } = require('../util/reportUtils');


exports.createReport = async (req, res) => {
  try {
    
    const incident = await Incident.findById(req.body.Incident);
    if (!incident) {
      return res.status(404).json({ message: 'Related incident not found' });
    }

    const report = new Report({
      ...req.body,
      Reporter: req.user._id,
      Incident_Type: incident.Incident_Type,
      Threat_Level: incident.Threat_Level,
      Location: incident.Location
    });

    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error: error.message });
  }
};


exports.getAllReports = async (req, res) => {
  try {
    const { 
      search, 
      status, 
      incidentType, 
      threatLevel, 
      startDate, 
      endDate,
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

  
    if (search) {
      filter.$or = [
        { Description: { $regex: search, $options: 'i' } },
        { Location: { $regex: search, $options: 'i' } }
      ];
    }

    
    if (status) filter.Status = status;
    if (incidentType) filter.Incident_Type = incidentType;
    if (threatLevel) filter.Threat_Level = threatLevel;

    
    if (startDate && endDate) {
      filter.Date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    
    const totalReports = await Report.countDocuments(filter);
    const reports = await Report.find(filter)
      .populate('Reporter', 'name email')
      .populate('Incident', 'Incident_ID Description')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      reports,
      currentPage: page,
      totalPages: Math.ceil(totalReports / limit),
      totalReports
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};


exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('Reporter', 'name email')
      .populate('Incident');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report', error: error.message });
  }
};

exports.updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const report = await Report.findByIdAndUpdate(
      req.params.id, 
      { Status: status }, 
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error updating report', error: error.message });
  }
};


exports.downloadReports = async (req, res) => {
  const { format, reportId } = req.query;

 
  if (!format || (format !== 'pdf' && format !== 'csv')) {
    return res.status(400).json({ message: 'Invalid format. Use "pdf" or "csv".' });
  }

  try {
    let query = {};

   
    if (reportId) {
      if (!mongoose.Types.ObjectId.isValid(reportId)) {
        return res.status(400).json({ message: 'Invalid report ID format' });
      }
      query._id = new mongoose.Types.ObjectId(reportId);
    }

    const reports = await Report.find(query)
      .populate('Reporter', 'name email')
      .populate('Incident', 'Incident_ID Description');

    if (reports.length === 0) {
      return res.status(404).json({ message: 'No reports available for download.' });
    }

   
    const formattedReports = reports.map(report => ({
      Report_ID: report._id.toString(),
      Incident_Type: report.Incident_Type,
      Location: report.Location,
      Description: report.Description,
      Threat_Level: report.Threat_Level,
      Status: report.Status,
      Date: report.Date,
      Reporter: report.Reporter ? report.Reporter.name : 'N/A',
      Incident_Ref: report.Incident ? report.Incident.Incident_ID : 'N/A'
    }));

  
    if (format === 'pdf') {
      return generatePDF(formattedReports, res);
    } else {
      return generateCSV(formattedReports, res);
    }

  } catch (err) {
    console.error('Error in downloading reports:', err);
    return res.status(500).json({ 
      message: 'Error generating report', 
      error: err.message 
    });
  }
};