const express = require('express');
const router = express.Router();
var categories = require('../controllers/categories')
var months = require('../controllers/dates')

router.get('/categories', async (req, res, next) => {
  try {
    await categories.initialize()
    res.status(200).json(categories.getAggregatedList());
  } catch (err) {
    return next(err);
  }
});

router.get('/cashflow', async (req, res, next) => {
  try {
    await months.initialize()
    res.status(200).json(months.getAggregatedList());
  } catch (err) {
    return next(err);
  }
});

module.exports = router;