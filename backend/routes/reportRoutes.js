const express = require('express');
const { createReport, downloadReports,getAllReports } = require('../controllers/reportController');
const auth = require('../middleware/auth.js');
const rbac = require('../middleware/rbacMiddleware');
const router = express.Router();


router.post('/', auth, rbac(['admin', 'user']), createReport);

router.get('/download', auth, rbac(['admin', 'user']), downloadReports);
router.get('/',auth,rbac(['admin','user']),getAllReports)

module.exports = router;
