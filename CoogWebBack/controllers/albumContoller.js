const { poolPromise } = require('../config/db');
const queries = require('../queries/queries');

// Get all albums
const getAlbums = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(queries.getAlbums);
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get album list with image URLs
const getAlbumListOutput = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(queries.getAlbumListOutput);
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Filter Albums by Genre or Artist
const filterAlbums = async (req, res) => {
    try {
      const { genre_id, artist_id } = req.query;
  
      const pool = await poolPromise;
      const result = await pool.request()
        .input('genre_id', genre_id || null)
        .input('artist_id', artist_id || null)
        .query(queries.filterAlbums);
  
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
};

  // Get Sorted and Paginated Albums
const getSortedPaginatedAlbums = async (req, res) => {
    try {
      const { sort_by = 'name', order = 'asc', page = 1, limit = 10 } = req.query;
      const offset = (parseInt(page) - 1) * parseInt(limit);
  
      const pool = await poolPromise;
      const result = await pool.request()
        .input('sort_by', sort_by)
        .input('order', order.toLowerCase() === 'desc' ? 'desc' : 'asc')
        .input('offset', offset)
        .input('limit', parseInt(limit))
        .query(queries.getSortedPaginatedAlbums);
  
      const countResult = await pool.request().query(queries.getTotalAlbumsCount);
      const total = countResult.recordset[0].total;
  
      res.status(200).json({
        data: result.recordset,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
};

module.exports = {
  getAlbums,
  getAlbumListOutput,
  filterAlbums,
  getSortedPaginatedAlbums
};
