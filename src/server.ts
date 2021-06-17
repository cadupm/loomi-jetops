import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import 'dotenv/config'

import './container'
import './database'

import { routes } from './routes'
import { AppError } from './errors/AppError'

const port = process.env.APP_PORT || 3000
const app = express()

app.use(express.json())

app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.httpCode).json({
        error: err.message,
      })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error: ${err.message}`,
    })
  },
)

app.listen(port, () => console.log(`Server is running on port ${port}. ✌`))
