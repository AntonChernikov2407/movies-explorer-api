const router = require('express').Router();
const reqValidation = require('../utils/reqValidation');
const {
  getThisUserById,
  updateUserProfile,
} = require('../controllers/users');

router.get('/me', getThisUserById);
router.patch('/me', reqValidation.me, updateUserProfile);

module.exports = router;
