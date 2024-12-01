const fs = require('fs');
const pdfkit = require('pdfkit');
const { parse } = require('json2csv');
const Report = require('../model/report');


const generatePDF = async (reportData, res) => {
  const doc = new pdfkit();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=incident_report.pdf');
  
  doc.pipe(res);
  
  doc.fontSize(18).text('Incident Report', { align: 'center' });
  doc.fontSize(12).moveDown();
  
  reportData.forEach((report, index) => {
    doc.text(`Report #${index + 1}:`);
    doc.text(`Report ID: ${report.Report_ID}`);
    doc.text(`Incident Type: ${report.Incident_Type}`);
    doc.text(`Location: ${report.Location}`);
    doc.text(`Description: ${report.Description}`);
    doc.text(`Threat Level: ${report.Threat_Level}`);
    doc.text(`Status: ${report.Status}`);
    doc.text(`Date: ${report.Date}`);
    doc.moveDown();
  });
  
  doc.end();
};

// Generate CSV Report
const generateCSV = (reportData, res) => {
  const csvData = parse(reportData);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=incident_report.csv');
  res.send(csvData);
};

module.exports = { generatePDF, generateCSV };
