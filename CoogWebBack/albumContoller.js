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

module.exports = {
  getAlbums,
  getAlbumListOutput
};
