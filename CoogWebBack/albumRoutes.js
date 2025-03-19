const express = require('express');
const { getAlbums, getAlbumListOutput, filterAlbums, getSortedPaginatedAlbums } = require('../controllers/albumController');

const router = express.Router();

router.get('/', getAlbums);
router.get('/list', getAlbumListOutput);

router.get('/filter', filterAlbums);
router.get('/sorted-paginated', getSortedPaginatedAlbums);

module.exports = router;
