import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import BaseRouter from '@src/routes/api'
import HttpStatusCodes from '@src/types/HttpStatusCodes'
import { ApiError } from './types/types'
import mongoose from 'mongoose'

const app = express()

// Basic middleware
app.use(express.json())
app.use(cors())
// Add APIs, must be after middleware
app.use('/api', BaseRouter)

// Add error handler
app.use((
  err: ApiError,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  let status = err.status ?? HttpStatusCodes.BAD_REQUEST
  mongoose.connection.close()
  return res.status(status).json({ error: err.message })
})

export default app
