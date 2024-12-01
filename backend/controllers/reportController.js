const Report = require('../model/report');
const { generatePDF, generateCSV } = require('../util/reportUtils');

// Create a new report
exports.createReport = async (req, res) => {
  try {
    const report = new Report({
      ...req.body,
      Reporter: req.user._id,
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error: error.message });
  }
};

// Download reports (PDF or CSV)
exports.downloadReports = async (req, res) => {
  const { format } = req.query;

  if (!format || (format !== 'pdf' && format !== 'csv')) {
    return res.status(400).json({ message: 'Invalid format. Use "pdf" or "csv".' });
  }

  try {

    const reports = await Report.find();

    if (reports.length === 0) {
      return res.status(404).json({ message: 'No reports available for download.' });
    }

   
    if (format === 'pdf') {
      generatePDF(reports, res);
    } else if (format === 'csv') {
      generateCSV(reports, res);
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error generating report', error: err.message });
  }
};

// Fetch all reports
exports.getAllReports = async (req, res) => {
  try {
    // Fetch all reports from the database
    const reports = await Report.find();

    // Check if reports exist
    if (reports.length === 0) {
      return res.status(404).json({ message: 'No reports found.' });
    }

    // Return the reports if found
    res.status(200).json(reports);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

