const express = require('express');
const router = express.Router();
const {
  getTests,
  getTestById,
  recordTestResult,
} = require('../controllers/testingController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.get('/', protect, authorize('admin'), getTests);
router.get('/pending', protect, authorize('admin'), (req, res, next) => {
  req.query.status = 'PENDING';
  return getTests(req, res, next);
});
router.get('/:id', protect, authorize('admin'), getTestById);
router.put('/:id/record', protect, authorize('admin'), recordTestResult);

module.exports = router;
