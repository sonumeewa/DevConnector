const express = require('express');
const router = express.Router();

// @route    GET api/profile
// @desc     TEST route
// @access   Public
router.get('/', (req, res) => res.send('Profile router working'));
module.exports = router;
