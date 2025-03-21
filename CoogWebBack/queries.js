// Query Inputs

const getSongs = 
    `SELECT * FROM SONG;`

const getUsers =
    `SELECT * FROM USER;`

const getArtists =
    `SELECT * FROM ARTIST;`

const getAlbums = 
    `SELECT * FROM ALBUM;`

const getPlaylists =
    `SELECT * FROM PLAYLIST;`

const getSongListOutput =
    `SELECT SONG.name, ARTIST.name, SONG.image_url, SONG.song_url
     FROM SONG, ARTIST
     WHERE SONG.artist_id = ARTIST.artist_id;`

const getArtistListOutput =
    `SELECT ARTIST.username, ARTIST.image_url
     FROM ARTIST;`

const getAlbumListOutput =
    `SELECT ALBUM.name, ALBUM.image_url
     FROM ALBUM;`

const getPlaylistListOutput =
    `SELECT PLAYLIST.name, PLAYLIST.image_url
     FROM PLAYLIST;`
    
const getUserListOutput =
    `SELECT USER.username, USER.image_url
     FROM USER;`

/*
const insertSong = `
  INSERT INTO song (name, artist_id, album_id, genre_id, image_url, length, song_url, created_at)
  VALUES (@name, @artist_id, @album_id, @genre_id, @image_url, @length, @song_url, SYSUTCDATETIME());
`;
*/

const insertAlbum = `INSERT INTO album (name, artist_id, image_url, created_at) values (?,?,?,?,?);`
// VALUES (@username, @email, @password_hash, @genre_id, @image_url, SYSUTCDATETIME())

const insertArtist = `INSERT INTO artist (username, email, password, genre, image_url, created_at) values (?,?,?,?,?,?);`
// VALUES (@username, @email, @password_hash, @genre_id, @image_url, SYSUTCDATETIME())

const insertUser = `INSERT INTO user (username, password, email, image_url, created_at) values (?,?,?,?,?);`
// VALUES (@username, @password_hash, @email, @image_url, @role, SYSUTCDATETIME())

const insertAdmin = `INSERT INTO admin (username, password, email, image_url, created_at) values (?,?,?,?,?);`

const insertFollowing = `INSERT INTO following (user_id, artist_id, followed_at) values (?,?,?);`

const insertFriend = `INSERT INTO friend (user_id_1, user_id_2, friend_at) values (?,?,?);`

const insertLikedAlbum = `INSERT INTO liked_album (user_id, album_id, liked_at) values (?,?,?)`

const insertSong = `INSERT INTO song (name, artist_id, album_id, genre, image_url, length, song_url, created_at)
    values (?,?,?,?,?,?,?,?);`

const insertHistory = `INSERT INTO history (user_id, song_id, last_listen) values (?,?,?);`

const insertLikedSong = `INSERT INTO liked_song (user_id, song_id, liked_at) values (?,?,?);`   

const insertPlaylist = `INSERT INTO playlist (name, user_id, image_url, created_at) values (?,?,?,?);`

/*
// Search Songs by Name or Artist
const searchSongs = `
  SELECT SONG.name, ARTIST.name AS artist_name, SONG.image_url, SONG.song_url
  FROM SONG
  JOIN ARTIST ON SONG.artist_id = ARTIST.artist_id
  WHERE SONG.name LIKE @searchTerm OR ARTIST.name LIKE @searchTerm;
`;

// Filter Songs by Genre or Album
const filterSongs = `
  SELECT SONG.name, ARTIST.name AS artist_name, SONG.image_url, SONG.song_url
  FROM SONG
  JOIN ARTIST ON SONG.artist_id = ARTIST.artist_id
  WHERE (@genre_id IS NULL OR SONG.genre_id = @genre_id)
    AND (@album_id IS NULL OR SONG.album_id = @album_id);
`;

// Search Artists by Username
const searchArtists = `
  SELECT ARTIST.username, ARTIST.image_url
  FROM ARTIST
  WHERE ARTIST.username LIKE @searchTerm;
`;

// Filter Albums by Genre or Artist
const filterAlbums = `
  SELECT ALBUM.name, ALBUM.image_url
  FROM ALBUM
  WHERE (@genre_id IS NULL OR ALBUM.genre_id = @genre_id)
    AND (@artist_id IS NULL OR ALBUM.artist_id = @artist_id);
`;

// Get Sorted and Paginated Songs
const getSortedPaginatedSongs = `
  SELECT SONG.name, ARTIST.name AS artist_name, SONG.image_url, SONG.song_url
  FROM SONG
  JOIN ARTIST ON SONG.artist_id = ARTIST.artist_id
  ORDER BY 
    CASE WHEN @sort_by = 'name' AND @order = 'asc' THEN SONG.name END ASC,
    CASE WHEN @sort_by = 'name' AND @order = 'desc' THEN SONG.name END DESC,
    CASE WHEN @sort_by = 'artist' AND @order = 'asc' THEN ARTIST.name END ASC,
    CASE WHEN @sort_by = 'artist' AND @order = 'desc' THEN ARTIST.name END DESC
  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;
`;

// Get Total Song Count for Pagination
const getTotalSongsCount = `
  SELECT COUNT(*) AS total FROM SONG;
`;

// Get Sorted and Paginated Albums
const getSortedPaginatedAlbums = `
  SELECT ALBUM.name, ARTIST.username AS artist_name, ALBUM.image_url
  FROM ALBUM
  JOIN ARTIST ON ALBUM.artist_id = ARTIST.artist_id
  ORDER BY 
    CASE WHEN @sort_by = 'name' AND @order = 'asc' THEN ALBUM.name END ASC,
    CASE WHEN @sort_by = 'name' AND @order = 'desc' THEN ALBUM.name END DESC,
    CASE WHEN @sort_by = 'artist' AND @order = 'asc' THEN ARTIST.username END ASC,
    CASE WHEN @sort_by = 'artist' AND @order = 'desc' THEN ARTIST.username END DESC
  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;
`;

// Get Total Album Count for Pagination
const getTotalAlbumsCount = `
  SELECT COUNT(*) AS total FROM ALBUM;
`;

*/

module.exports = {
    getSongs,
    getUsers,
    getAlbums,
    getArtists,
    getPlaylists,
    getSongListOutput,
    getArtistListOutput,
    getAlbumListOutput,
    getPlaylistListOutput,
    getUserListOutput,
    insertAlbum,
    insertAdmin,
    insertArtist,
    insertFollowing,
    insertFriend,
    insertHistory,
    insertLikedAlbum,
    insertLikedSong,
    insertPlaylist,
    insertSong,
    insertUser
    /*
    searchSongs,
    filterSongs,
    searchArtists,
    filterAlbums
    getSortedPaginatedSongs,
    getTotalSongsCount,
    getSortedPaginatedAlbums,
    getTotalAlbumsCount
    */
}