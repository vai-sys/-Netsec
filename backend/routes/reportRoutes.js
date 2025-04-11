// const express = require('express');
// const {
//   createReport,
//   downloadReports,
//   getAllReports,
//   getReportById,
//   updateReportStatus,
// } = require('../controllers/reportController.js');
// const auth = require('../middleware/auth.js');
// const rbac = require('../middleware/rbacMiddleware.js');

// const router = express.Router();

// router.post('/', auth, rbac(['admin', 'user']), createReport);
// router.get('/', auth, rbac(['admin', 'user']), getAllReports);


// router.get('/export', auth, rbac(['admin', 'user']), downloadReports);

// router.get('/:id', auth, rbac(['admin', 'user']), getReportById);
// router.patch('/:id/status', auth, rbac(['admin']), updateReportStatus);

// module.exports = router;



const express = require('express');
const {
  createReport,
  downloadReports,
  getAllReports,
  getReportById,
  updateReportStatus,
} = require('../controllers/reportController');
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbacMiddleware');

const router = express.Router();


router.post('/', auth, rbac(['admin', 'user']), createReport);


router.get('/', auth, rbac(['admin', 'user']), getAllReports);

router.get('/download', auth, rbac(['admin', 'user']), downloadReports);


router.get('/:id', auth, rbac(['admin', 'user']), getReportById);


router.patch('/:id/status', auth, rbac(['admin']), updateReportStatus);

module.exports = router;



