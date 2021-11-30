import { ip } from 'express-fast-ip'
import * as express from 'express'

const app = express()

app.use(ip)

app.get('/', function (req, res) {
    res.send(req.ipInfo)
})