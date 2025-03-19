const express = require('express');
const { getSongs, getSongListOutput, addSong, searchSongs, filterSongs, getSortedPaginatedSongs } = require('../controllers/songController');
const router = express.Router();

router.get('/', getSongs);
router.get('/list', getSongListOutput);
router.post('/', addSong);

// Search and Filter Routes
router.get('/search', searchSongs);
router.get('/filter', filterSongs);

//Paginate Routes
router.get('/sorted-paginated', getSortedPaginatedSongs);

module.exports = router;
