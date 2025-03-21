const express = require('express');
const { getArtists, getArtistListOutput, searchArtists } = require('../controllers/artistController');
const router = express.Router();

router.get('/', getArtists);
router.get('/list', getArtistListOutput);
router.get('/search', searchArtists);

module.exports = router;
