const Incident = require('../model/Incident');
const mongoose = require('mongoose');

exports.createIncident = async (req, res) => {
  try {
  
    const lastIncident = await Incident.findOne().sort({ createdAt: -1 });
    const newIncidentId = lastIncident 
      ? `INC-${parseInt(lastIncident.Incident_ID.split('-')[1]) + 1}`
      : 'INC-1000';

    const newIncident = new Incident({
      ...req.body,
      Incident_ID: newIncidentId
    });

    await newIncident.save();
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(500).json({ message: 'Error creating incident', error: error.message });
  }
};

exports.getAllIncidents = async (req, res) => {
  try {
    const { 
      search, 
      platform, 
      sector, 
      threatLevel, 
      incidentSolved, 
      startDate, 
      endDate,
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { Description: { $regex: search, $options: 'i' } },
        { Location: { $regex: search, $options: 'i' } },
        { Incident_Type: { $regex: search, $options: 'i' } }
      ];
    }

    if (platform) filter.Platform = platform;
    if (sector) filter.Sector = sector;
    if (threatLevel) filter.Threat_Level = threatLevel;
    if (incidentSolved !== undefined) filter.Incident_Solved = incidentSolved === 'true';

    if (startDate && endDate) {
      filter.Date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const totalIncidents = await Incident.countDocuments(filter);
    const incidents = await Incident.find(filter)
      .sort({ Date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      incidents,
      currentPage: page,
      totalPages: Math.ceil(totalIncidents / limit),
      totalIncidents
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching incidents', error: error.message });
  }
};

exports.getIncidentById = async (req, res) => {
  try {
   
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid incident ID format' });
    }

    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.json(incident);
  } catch (error) {
    console.error('Error fetching incident:', error);
    res.status(500).json({ 
      message: 'Error fetching incident', 
      error: error.message 
    });
  }
};

exports.updateIncident = async (req, res) => {
  try {
    // Ensure only specific fields can be updated
    const updateFields = {
      Platform: req.body.Platform,
      Sector: req.body.Sector,
      Incident_Type: req.body.Incident_Type,
      Threat_Level: req.body.Threat_Level,
      Location: req.body.Location,
      Description: req.body.Description,
      Incident_Solved: req.body.Incident_Solved,
      Source: req.body.Source,
      Summary: req.body.Summary,
      Coordinates: req.body.Coordinates
    };

    const updatedIncident = await Incident.findByIdAndUpdate(
      req.params.id, 
      { $set: updateFields }, 
      { new: true, runValidators: true }
    );

    if (!updatedIncident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    res.json(updatedIncident);
  } catch (error) {
    res.status(500).json({ message: 'Error updating incident', error: error.message });
  }
};

exports.deleteIncident = async (req, res) => {
  try {
    const deletedIncident = await Incident.findByIdAndDelete(req.params.id);

    if (!deletedIncident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    res.json({ message: 'Incident deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting incident', error: error.message });
  }
};

exports.getAdvancedIncidentMap = async (req, res) => {
  try {
    const incidents = await Incident.aggregate([
      {
        $group: {
          _id: {
            sector: '$Sector',
            threatLevel: '$Threat_Level'
          },
          incidents: {
            $push: {
              id: '$_id',
              location: '$Location',
              coordinates: '$Coordinates',
              description: '$Description',
              date: '$Date'
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          sector: '$_id.sector',
          threatLevel: '$_id.threatLevel',
          incidents: 1,
          count: 1,
          _id: 0
        }
      }
    ]);

    // Add a check for empty results
    if (incidents.length === 0) {
      return res.status(404).json({ message: 'No incidents found' });
    }

    res.json(incidents);
  } catch (error) {
    console.error('Advanced Map Error:', error);
    res.status(500).json({ 
      message: 'Error fetching advanced map data', 
      error: error.message 
    });
  }
};

exports.getSectorThreatAnalysis = async (req, res, next) => {
  try {
    // Aggregate analysis of incidents by sector and threat level
    const sectorThreatAnalysis = await Incident.aggregate([
      {
        $group: {
          _id: {
            sector: '$Sector',
            threatLevel: '$Threat_Level'
          },
          totalIncidents: { $sum: 1 },
          unsolvedIncidents: { 
            $sum: { $cond: [{ $eq: ['$Incident_Solved', false] }, 1, 0] } 
          },
          mostRecentIncident: { $max: '$Date' }
        }
      },
      {
        $group: {
          _id: '$_id.sector',
          threatLevels: {
            $push: {
              level: '$_id.threatLevel',
              totalIncidents: '$totalIncidents',
              unsolvedIncidents: '$unsolvedIncidents',
              mostRecentIncident: '$mostRecentIncident'
            }
          },
          totalSectorIncidents: { $sum: '$totalIncidents' }
        }
      },
      {
        $project: {
          sector: '$_id',
          threatLevels: 1,
          totalSectorIncidents: 1,
          _id: 0
        }
      },
      { $sort: { totalSectorIncidents: -1 } }
    ]);

    res.json({
      success: true,
      count: sectorThreatAnalysis.length,
      data: sectorThreatAnalysis
    });
  } catch (error) {
    next(createError(500, 'Error retrieving sector threat analysis'));
  }
};


exports.getIncidentTimeline = async (req, res, next) => {
  try {
   
    const { 
      startDate, 
      endDate, 
      threatLevel, 
      sector, 
      incidentType 
    } = req.query;

   
    const query = {};
    
    if (startDate && endDate) {
      query.Date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    if (threatLevel) {
      query.Threat_Level = threatLevel;
    }
    
    if (sector) {
      query.Sector = sector;
    }
    
    if (incidentType) {
      query.Incident_Type = incidentType;
    }

   
    const timeline = await Incident.find(query)
      .select('Incident_ID Date Sector Incident_Type Threat_Level Location Description Incident_Solved Coordinates')
      .sort({ Date: -1 })
      .lean();

   
    const timelineMetrics = {
      totalIncidents: timeline.length,
      threatLevelBreakdown: {},
      solvedStatus: {
        solved: timeline.filter(incident => incident.Incident_Solved).length,
        unsolved: timeline.filter(incident => !incident.Incident_Solved).length
      }
    };

    timeline.forEach(incident => {
      if (!timelineMetrics.threatLevelBreakdown[incident.Threat_Level]) {
        timelineMetrics.threatLevelBreakdown[incident.Threat_Level] = 0;
      }
      timelineMetrics.threatLevelBreakdown[incident.Threat_Level]++;
    });

    res.json({
      success: true,
      metrics: timelineMetrics,
      timeline
    });
  } catch (error) {
    next(createError(500, 'Error retrieving incident timeline'));
  }
};
