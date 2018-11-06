const express = require('express');
const router = express.Router();

// @route  GET request to api/posts/rest
// @desc   Tests post route
// @access Public
router.get('/test', (req,res) => res.json({msg: "Posts Works"}));

module.exports = router;