const express = require('express')
const router = express.Router();
const {aggregatePolicies} = require('../Controller/aggregatePolicy')

router.get('/aggregate_policy',aggregatePolicies)


module.exports = router;