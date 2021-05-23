const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express()
const port = 5000
const URL = 'http://localhost:3000';

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
        url: URL,
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
    const mutation = `
                        mutation {
                            removeSong(id:${songIdToDelete}) {
                                name
                            }
                        }`
    const response = await axios({
        url: URL,
        method: 'POST',
        data: {query: mutation}
    });

    if (response.status === 200) {
        res.status(200).send(JSON.stringify(response.data.data));
    } else {
        res.sendStatus(500)
    }
})

app.listen(port, () => {
    console.log(`Music app listening at http://localhost:${port}`)
})