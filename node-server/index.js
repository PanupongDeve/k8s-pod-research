const express = require('express');
const bodyParser = require('body-parser')


const app = express();
app.use(bodyParser.json())

let respone_timeout = 200;

let respone_error_timeout = 10000;

const hostname = "No HostName" || process.env.HOSTNAME;


app.get('/set-timeout/:timeout', (req, res) => {
    const { timeout } = req.params;
    respone_timeout = timeout;
    res.send({
        respone_timeout: `${respone_timeout} ms`,
        respone_error_timeout: `${respone_error_timeout} ms`,
        hostname
    })
})

app.get('/set-error-timeout/:timeout', (req, res) => {
    const { timeout } = req.params;
    respone_error_timeout = timeout;
    res.send({
        respone_timeout: `${respone_timeout} ms`,
        respone_error_timeout: `${respone_error_timeout} ms`,
        hostname
    })
})

app.get('/healthz', (req, res) => {

    if (respone_timeout < respone_error_timeout) {
        setTimeout(() => {
            res.send({
                respone_timeout: `${respone_timeout} ms`,
                respone_error_timeout: `${respone_error_timeout} ms`,
                hostname
            })
        }, respone_timeout) 
    } else {
        setTimeout(() => {
            res.status(500).send({
                respone_timeout: `${respone_timeout} ms`,
                respone_error_timeout: `${respone_error_timeout} ms`,
                hostname
            })
        }, respone_error_timeout) 
    }
    
})


const port = 3000 || process.env.PORT

app.listen(port, () => {
    console.log(`Server running at port: ${port}`)
})