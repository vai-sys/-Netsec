const Report = require('../model/report');
const Incident = require('../model/Incidentmodel');
const { generatePDF, generateCSV } = require('../util/reportUtils');
const mongoose = require('mongoose');

exports.createReport = async (req, res) => {
  try {
    const {
      title,
      description,
      incidentType,
      severity,
      location,
      additionalNotes
    } = req.body;
    
    const requiredFields = [
      { field: 'title', message: 'Title is required' },
      { field: 'description', message: 'Description is required' },
      { field: 'incidentType', message: 'Incident Type is required' },
      { field: 'severity', message: 'Severity is required' }
    ];
    
    for (const { field, message } of requiredFields) {
      if (!req.body[field] || req.body[field].trim() === '') {
        return res.status(400).json({
          message,
          field
        });
      }
    }
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }
    
    const report = new Report({
      Title: title.trim(),
      Description: description.trim(),
      Incident_Type: incidentType,
      Threat_Level: severity,
      Location: location ? location.trim() : '',
      Additional_Notes: additionalNotes ? additionalNotes.trim() : '',
      Reporter: req.user._id,
      Date: new Date()
    });
    
    await report.save();
    
    res.status(201).json({
      message: 'Report created successfully',
      report: {
        id: report._id,
        reportId: report.Report_ID,
        title: report.Title,
        incidentType: report.Incident_Type
      }
    });
  } catch (error) {
    console.error('Report Creation Error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      message: 'Error creating report',
      error: error.message
    });
  }
};

exports.getReportById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid report ID' });
    }

    const report = await Report.findById(req.params.id)
      .populate('Reporter', 'name email')
      .populate('Incident');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ message: 'Error fetching report', error: error.message });
  }
};

exports.updateReportStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid report ID' });
    }

    const { status } = req.body;

    if (!status || status.trim() === '') {
      return res.status(400).json({ message: 'Status is required' });
    }

    const report = await Report.findByIdAndUpdate(
      req.params.id, 
      { 
        Status: status,
        updatedAt: new Date()
      }, 
      { 
        new: true,
        runValidators: true
      }
    );

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({
      message: 'Report status updated successfully',
      report
    });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ message: 'Error updating report', error: error.message });
  }
};

exports.downloadReports = async (req, res) => {
  try {
    const { format, reportId } = req.query;

    if (!format || (format !== 'pdf' && format !== 'csv')) {
      return res.status(400).json({ message: 'Invalid format. Use "pdf" or "csv".' });
    }

    let query = {};

    if (reportId) {
      if (!mongoose.Types.ObjectId.isValid(reportId)) {
        return res.status(400).json({ message: 'Invalid report ID format' });
      }
      // Fixed: Use proper ObjectId creation
      query._id = new mongoose.Types.ObjectId(reportId);
    }

    const reports = await Report.find(query)
      .populate('Reporter', 'name email')
      .populate('Incident', 'Incident_ID Description')
      .lean(); // Use lean() for better performance

    if (reports.length === 0) {
      return res.status(404).json({ message: 'No reports available for download.' });
    }

    const formattedReports = reports.map(report => ({
      Report_ID: report._id.toString(),
      Incident_Type: report.Incident_Type,
      Location: report.Location || 'N/A',
      Description: report.Description,
      Threat_Level: report.Threat_Level,
      Status: report.Status,
      Date: report.Date,
      Reporter: report.Reporter ? report.Reporter.name : 'N/A',
      Incident_Ref: report.Incident ? report.Incident.Incident_ID : 'N/A'
    }));

    try {
      if (format === 'pdf') {
        return await generatePDF(formattedReports, res);
      } else {
        return await generateCSV(formattedReports, res);
      }
    } catch (genError) {
      console.error('Error generating document:', genError);
      return res.status(500).json({ 
        message: `Error generating ${format} document`, 
        error: genError.message 
      });
    }
  } catch (error) {
    console.error('Error downloading reports:', error);
    res.status(500).json({ 
      message: 'Error generating report', 
      error: error.message 
    });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    // Parse and sanitize query parameters
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 9;
    const search = req.query.search || '';
    const incidentType = req.query.incidentType || '';
    const threatLevel = req.query.threatLevel || '';

    // Validate parameters
    const pageNum = Math.max(1, page || 1); // Default to page 1 if invalid
    const limitNum = Math.min(100, Math.max(1, limit || 9)); // Limit between 1-100, default 9
    const skip = (pageNum - 1) * limitNum;

    const query = {};
    
    if (search) {
      query.$or = [
        { Title: { $regex: search, $options: 'i' } },
        { Description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (incidentType) {
      query.Incident_Type = incidentType;
    }
    
    if (threatLevel) {
      query.Threat_Level = threatLevel;
    }

    // Get total count for pagination
    const totalReports = await Report.countDocuments(query);
    
    // Get reports for current page
    const reports = await Report.find(query)
      .sort({ Date: -1 }) // Sort by Date instead of createdAt which might not exist
      .skip(skip)
      .limit(limitNum)
      .populate('Reporter', 'name email');

    const totalPages = Math.ceil(totalReports / limitNum);

    res.status(200).json({
      reports,
      currentPage: pageNum,
      totalPages,
      totalReports
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};