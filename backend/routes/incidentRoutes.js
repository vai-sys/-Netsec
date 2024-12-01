const express = require('express');
const { createIncident, getAllIncidents, getIncidentMap, getIncidentTimeline } = require('../controllers/incidentController');
const auth = require('../middleware/auth.js');
const rbac = require('../middleware/rbacMiddleware');
const router = express.Router();

router.post('/', auth, rbac(['admin', 'user']), createIncident);
router.get('/', auth, rbac(['admin', 'user']), getAllIncidents);
router.get('/map', auth, rbac(['admin', 'user']), getIncidentMap);
router.get('/timeline', auth, rbac(['admin', 'user']), getIncidentTimeline);

module.exports = router;
