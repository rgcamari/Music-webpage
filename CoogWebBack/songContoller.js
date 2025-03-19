const { poolPromise } = require('../config/db');
const queries = require('../queries/queries');

// Get all songs
const getSongs = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(queries.getSongs);
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get song list with artist names
const getSongListOutput = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(queries.getSongListOutput);
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addSong = async (req, res) => {
    try {
      const { name, artist_id, album_id, genre_id, image_url, length, song_url } = req.body;
      const pool = await poolPromise;
  
      const result = await pool.request()
        .input('name', name)
        .input('artist_id', artist_id)
        .input('album_id', album_id)
        .input('genre_id', genre_id)
        .input('image_url', image_url)
        .input('length', length)
        .input('song_url', song_url)
        .query(queries.insertSong);
  
      res.status(201).send('Song added successfully!');
    } catch (err) {
      res.status(500).send(err.message);
    }
};

const addSong = async (req, res) => {
    try {
      const { name, artist_id, album_id, genre_id, image_url, length, song_url } = req.body;
      const pool = await poolPromise;
  
      const result = await pool.request()
        .input('name', name)
        .input('artist_id', artist_id)
        .input('album_id', album_id)
        .input('genre_id', genre_id)
        .input('image_url', image_url)
        .input('length', length)
        .input('song_url', song_url)
        .query(queries.insertSong);
  
      res.status(201).send('Song added successfully!');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

const searchSongs = async (req, res) => {
    try {
      const { term } = req.query;
      const searchTerm = `%${term}%`;
  
      const pool = await poolPromise;
      const result = await pool.request()
        .input('searchTerm', searchTerm)
        .query(queries.searchSongs);
  
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
  // Filter Songs by Genre or Album
  const filterSongs = async (req, res) => {
    try {
      const { genre_id, album_id } = req.query;
  
      const pool = await poolPromise;
      const result = await pool.request()
        .input('genre_id', genre_id || null)
        .input('album_id', album_id || null)
        .query(queries.filterSongs);
  
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  

module.exports = {
  getSongs,
  getSongListOutput,
  addSong,
  searchSongs,
  filterSongs
};
