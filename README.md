# Music webpage

## Steps to Start Web App
1. cd CoogWeb
2. npm install
3. npm start

## Calling sorted and paginated songs
1. GET → http://localhost:5000/api/songs/sorted-paginated?sort_by=name&order=asc&page=1&limit=5
2. GET → http://localhost:5000/api/songs/sorted-paginated?sort_by=artist&order=desc&page=2&limit=10

## Calling sorted and paginated albums
1. GET → http://localhost:5000/api/albums/sorted-paginated?sort_by=name&order=asc&page=1&limit=5
2. GET → http://localhost:5000/api/albums/sorted-paginated?sort_by=artist&order=desc&page=2&limit=10