// Query Inputs

const getSongs = 
    `SELECT * FROM SONG`;

const getUsers =
    `SELECT * FROM USER`;

const getArtists =
    `SELECT * FROM ARTIST`;

const getAlbums = 
    `SELECT * FROM ALBUM`;

const getPlaylists =
    `SELECT * FROM PLAYLIST`;

const getSongListOutput =
    `SELECT SONG.name, ARTIST.name, SONG.image_url
     FROM SONG, ARTIST
     WHERE SONG.artist_id = ARTIST.artist_id `;

