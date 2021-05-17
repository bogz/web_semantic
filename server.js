const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express()
const port = 5000

// fix cors issue
app.use(cors())

// for body parser access
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.post('/backend-query', async (req, res) => {
    const response = await axios({
        url: 'http://localhost:3000',
        method: 'POST',
        data: {query: req.body.query.toString()}
    })

    if (response.status === 200) {
        res.status(200).send(JSON.stringify(response.data.data));
    } else {
        res.sendStatus(500)
    }
})

app.post('/backend-mutation', async (req, res) => {
    const response = await axios({
        url: 'http://localhost:3000',
        method: 'POST',
        data: {mutation: req.body.mutation.toString(), query: req.body.query.toString()}
    })

    if (response.status === 200) {
        res.status(200).send(JSON.stringify(response.data.data));
    } else {
        res.sendStatus(500)
    }
})

app.listen(port, () => {
    console.log(`Music app listening at http://localhost:${port}`)
})