const express = require('express');
const { getSongs, getSongListOutput, addSong, searchSongs, filterSongs } = require('../controllers/songController');
const router = express.Router();

router.get('/', getSongs);
router.get('/list', getSongListOutput);
router.post('/', addSong);

// Search and Filter Routes
router.get('/search', searchSongs);
router.get('/filter', filterSongs);

module.exports = router;
