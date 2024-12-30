const express = require('express');
const router = express.Router();
const { handleShortURL, handleCreateShortURL } = require('../controllers/url.controller');

router.get('/:shortid', handleShortURL);
router.post('/', handleCreateShortURL);

module.exports = router;