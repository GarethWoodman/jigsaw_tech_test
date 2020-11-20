const express = require('express');
const router = express.Router();
var categories = require('../controllers/categories')
var dates = require('../controllers/dates')

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
    await dates.initialize()
    res.status(200).json(dates.getAggregatedList());
  } catch (err) {
    return next(err);
  }
});

module.exports = router;