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

// Add a new song
const addSong = async (req, res) => {
  try {
    const { name, artist_id, album_id, genre_id, image_url, length, song_url } = req.body;

    if (!name || !artist_id || !song_url) {
      return res.status(400).send('Name, artist ID, and song URL are required!');
    }

    const pool = await poolPromise;
    const result = await pool.request()
      .input('name', name)
      .input('artist_id', artist_id)
      .input('album_id', album_id || null)
      .input('genre_id', genre_id || null)
      .input('image_url', image_url || null)
      .input('length', length || null)
      .input('song_url', song_url)
      .query(queries.insertSong);

    res.status(201).send('Song added successfully!');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Search songs by term
const searchSongs = async (req, res) => {
  try {
    const { term } = req.query;

    if (!term) {
      return res.status(400).send('Search term is required!');
    }

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

// Filter songs by genre or album
const filterSongs = async (req, res) => {
  try {
    const { genre_id, album_id } = req.query;

    if (!genre_id && !album_id) {
      return res.status(400).send('Provide at least one filter: genre_id or album_id');
    }

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

// Get sorted and paginated songs
const getSortedPaginatedSongs = async (req, res) => {
  try {
    const { sort_by = 'name', order = 'asc', page = 1, limit = 10 } = req.query;

    // Validate and sanitize sort_by to prevent SQL injection
    const validSortColumns = ['name', 'artist', 'album', 'genre', 'streams'];
    const sortBy = validSortColumns.includes(sort_by.toLowerCase()) ? sort_by : 'name';

    // Validate order to be either 'asc' or 'desc'
    const validOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const pool = await poolPromise;
    const result = await pool.request()
      .input('offset', offset)
      .input('limit', parseInt(limit))
      .query(`
        SELECT * FROM songs
        ORDER BY ${sortBy} ${validOrder}
        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY
      `);

    // Get total songs count for pagination
    const countResult = await pool.request().query(queries.getTotalSongsCount);
    const total = countResult.recordset[0].total;

    res.status(200).json({
      data: result.recordset,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Upload Song with File
const addSongWithFile = async (req, res) => {
  try {
    const { name, artist_id, album_id, genre_id, length } = req.body;

    if (!name || !artist_id || !req.file) {
      return res.status(400).send('Name, artist ID, and song file are required!');
    }

    const songUrl = `/uploads/songs/${req.file.filename}`;
    const pool = await poolPromise;

    const result = await pool.request()
      .input('name', name)
      .input('artist_id', artist_id)
      .input('album_id', album_id || null)
      .input('genre_id', genre_id || null)
      .input('length', length || null)
      .input('song_url', songUrl)
      .query(queries.insertSong);

    res.status(201).send({
      message: 'Song uploaded and added successfully!',
      songUrl,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Like a song
const likeSong = async (req, res) => {
  try {
    const { song_id, user_id } = req.body;

    if (!song_id || !user_id) {
      return res.status(400).send('Song ID and User ID are required!');
    }

    const pool = await poolPromise;
    await pool.request()
      .input('song_id', song_id)
      .input('user_id', user_id)
      .query(queries.likeSong);

    res.status(200).send('Song liked successfully!');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Play song and stream to history
const streamSong = async (req, res) => {
  try {
    const { song_id, user_id } = req.body;

    if (!song_id || !user_id) {
      return res.status(400).send('Song ID and User ID are required!');
    }

    const pool = await poolPromise;

    // Check if the same song is already streaming
    const existingStream = await pool.request()
      .input('song_id', song_id)
      .input('user_id', user_id)
      .query(queries.checkExistingStream);

    if (existingStream.recordset.length > 0) {
      // Song is already logged, no need to re-insert
      return res.status(200).json({
        message: 'Song already streaming.',
        song_url: existingStream.recordset[0].song_url,
      });
    }

    // Get song details
    const songResult = await pool.request()
      .input('song_id', song_id)
      .query(queries.getSongById);

    if (songResult.recordset.length === 0) {
      return res.status(404).send('Song not found!');
    }

    // Insert stream history when a new song is played
    await pool.request()
      .input('song_id', song_id)
      .input('user_id', user_id)
      .query(queries.streamSong);

    res.status(200).json({
      message: 'Song streamed and logged successfully!',
      song_url: songResult.recordset[0].song_url,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};


module.exports = {
  getSongs,
  getSongListOutput,
  addSong,
  searchSongs,
  filterSongs,
  getSortedPaginatedSongs,
  addSongWithFile,
  likeSong,
  streamSong
};
