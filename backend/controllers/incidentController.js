const Incident = require('../model/incident');
const Report = require('../model/report');


exports.createIncident = async (req, res) => {
  try {
    const newIncident = new Incident(req.body);
    await newIncident.save();
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(500).json({ message: 'Error creating incident', error: error.message });
  }
};
exports.getAllIncidents = async (req, res) => {
  try {
    const { search, platform, sector, threatLevel, incidentSolved, startDate, endDate } = req.query;

   
    const filter = {};

    if (search) {
      filter.$or = [
        { Description: { $regex: search, $options: 'i' } }, 
        { Location: { $regex: search, $options: 'i' } }    
      ];
    }

    if (platform) filter.Platform = platform;
    if (sector) filter.Sector = sector;
    if (threatLevel) filter.Threat_Level = threatLevel;
    if (incidentSolved !== undefined) filter.Incident_Solved = incidentSolved === 'true';
    if (startDate && endDate) {
      filter.Date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const incidents = await Incident.find(filter).sort({ Date: -1 }); 
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching incidents', error: error.message });
  }
};


// exports.getAllIncidents = async (req, res) => {
//   try {
//     const incidents = await Incident.find();
//     res.json(incidents);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching incidents', error: error.message });
//   }
// };


exports.getIncidentMap = async (req, res) => {
  try {
    const incidents = await Incident.find({}, 'Location Coordinates Description');
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching map data', error: error.message });
  }
};


exports.getIncidentTimeline = async (req, res) => {
  try {
    const incidents = await Incident.find().sort('Date');
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timeline', error: error.message });
  }
};
