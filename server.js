const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express()
const port = 5000
const GRAPHQL_URL = 'http://localhost:3000';

// fix cors issue
app.use(cors())

// for body parser access
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/get-data', async (req, res) => {
    const query = `{
                  allGenres {
                    name
                    id
                    Songs {
                        id
                        name
                        isHit
                        artist
                        duration
                        photo
                    }
                  }
              }`
    const response = await axios({
        url: GRAPHQL_URL,
        method: 'POST',
        data: {query: query}
    })

    if (response.status === 200) {
        res.status(200).send(JSON.stringify(response.data.data));
    } else {
        res.sendStatus(500)
    }
})

app.delete('/delete-song', async(req, res) => {
    const songIdToDelete = Number(req.body.songId);
    const removeSongMutation = `mutation {
                            removeSong(id:${songIdToDelete}) {
                                name
                            }
                        }`
    const response = await axios({
        url: GRAPHQL_URL,
        method: 'POST',
        data: {query: removeSongMutation}
    });

    if (response.status === 200) {
        res.status(200).send(JSON.stringify(response.data.data));
    } else {
        res.sendStatus(500)
    }
})

app.post('/add-song', async(req, res) => {
    const data = req.body.data;
    const genreName = '"' + data.genreName + '"';
    const genreIdQuery = `
                          {
                            allGenres(filter: {name: ${genreName}}) {
                                id
                            }
                          }`

    const genreIdResponse = await axios({
        url: GRAPHQL_URL,
        method: 'POST',
        data: {query: genreIdQuery}
    })

    if (genreIdResponse.status === 200) {
        const genreId = Number(genreIdResponse.data.data.allGenres[0].id);
        const name = '"' + data.name + '"';
        const artist = '"' + data.artist + '"';
        const photo = '"images/no.jpg"';
        const addSongMutation = `
                            mutation {
                                        createSong(name: ${name}, artist: ${artist}, duration: ${data.duration},
                                         isHit: ${data.isHit}, isSingle: ${data.isSingle}, photo: ${photo}, 
                                         genre_id: ${genreId}) {
                                            name
                                            artist
                                            }
                                     }`
        const response = await axios({
            url: GRAPHQL_URL,
            method: 'POST',
            data: {query: addSongMutation}
        })

        if (response.status === 200) {
            res.status(200).send(JSON.stringify(response.data.data));
        } else {
            res.sendStatus(500)
        }
    } else {
        res.sendStatus(500)
    }
})

app.listen(port, () => {
    console.log(`Music app listening at http://localhost:${port}`)
})