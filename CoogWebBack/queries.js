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


const insertAlbum = `INSERT INTO album (name, artist_id, genre, image_url, created_at) values (?,?,?,?,?);`

const insertArtist = `INSERT INTO artist (username, email, password, genre, image_url, created_at) values (?,?,?,?,?,?);`

const insertUser = `INSERT INTO user (username, password, email, image_url, created_at) values (?,?,?,?,?);`

const insertAdmin = `INSERT INTO admin (username, password, email, image_url, created_at) values (?,?,?,?,?);`

const insertFollowing = `INSERT INTO following (user_id, artist_id, followed_at) values (?,?,?);`

const insertFriend = `INSERT INTO friend (user_id_1, user_id_2, friend_at) values (?,?,?);`

const insertLikedAlbum = `INSERT INTO liked_album (user_id, album_id, liked_at) values (?,?,?)`

const insertSong = `INSERT INTO song (name, artist_id, album_id, genre, image_url, length, song_url, created_at)
    values (?,?,?,?,?,?,?,?);`

const insertHistory = `INSERT INTO history (user_id, song_id, last_listen) values (?,?,?);`

const insertLikedSong = `INSERT INTO liked_song (user_id, song_id, liked_at) values (?,?,?);`   

const insertPlaylist = `INSERT INTO playlist (name, user_id, image_url, created_at) values (?,?,?,?);`



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
}