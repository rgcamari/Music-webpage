const express = require('express');
const { getAlbums, getAlbumListOutput, filterAlbums } = require('../controllers/albumController');
const router = express.Router();

router.get('/', getAlbums);
router.get('/list', getAlbumListOutput);
router.get('/filter', filterAlbums);

module.exports = router;
