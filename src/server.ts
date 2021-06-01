import "reflect-metadata"
import express from 'express'

import 'dotenv/config'

import './database'

import { routes } from './routes'

const port = process.env.APP_PORT || 3000
const app = express()

app.use(express.json())

app.use(routes)

app.listen(port, () => console.log(`Server is running on port ${port}. ✌`))