const express = require('express');
const router = express.Router();
const { uploadImage, uploadSong } = require('../utils/upload');
const { addSongWithFile, updateArtistProfile } = require('../controllers/songController');
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

// Upload song route
router.post('/upload/song', uploadSong.single('song'), addSongWithFile);

// Upload image route
router.post('/upload/image', uploadImage.single('image'), updateArtistProfile);


module.exports = router;
