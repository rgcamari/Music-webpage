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

