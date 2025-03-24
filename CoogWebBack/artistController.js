const { poolPromise } = require('../config/db');
const queries = require('../queries/queries');

const getArtists = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(queries.getArtists);
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getArtistListOutput = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(queries.getArtistListOutput);
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


// Search Artists by Name
const searchArtists = async (req, res) => {
    try {
      const { term } = req.query;
      const searchTerm = `%${term}%`;
  
      const pool = await poolPromise;
      const result = await pool.request()
        .input('searchTerm', searchTerm)
        .query(queries.searchArtists);
  
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
  
// Upload Artist Profile Image
const updateArtistProfile = async (req, res) => {
  try {
    const { artist_id } = req.body;

    if (!artist_id || !req.file) {
      return res.status(400).send('Artist ID and image file are required!');
    }

    const imageUrl = `/uploads/images/${req.file.filename}`;
    const pool = await poolPromise;

    await pool.request()
      .input('artist_id', artist_id)
      .input('image_url', imageUrl)
      .query(queries.updateArtistProfile);

    res.status(200).send({
      message: 'Profile image updated successfully!',
      imageUrl,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
  
module.exports = {
  getArtists,
  getArtistListOutput,
  searchArtists,
  filterAlbums, 
  updateArtistProfile,
};
