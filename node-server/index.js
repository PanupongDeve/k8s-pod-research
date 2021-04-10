const express = require('express');
const bodyParser = require('body-parser')


const app = express();
app.use(bodyParser.json())

let respone_timeout = 200;


app.get('/set-timeout/:timeout', (req, res) => {
    const { timeout } = req.params;
    respone_timeout = timeout;
    res.send({
        respone_timeout: `${respone_timeout} ms`
    })
})

app.get('/healthz', (req, res) => {
    setTimeout(() => {
        res.send({
            respone_timeout: `${respone_timeout} ms`
        })
    }, respone_timeout) 
})


const port = 3000 || process.env.PORT

app.listen(port, () => {
    console.log(`Server running at port: ${port}`)
})