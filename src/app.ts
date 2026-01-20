import dotenv from 'dotenv'
import express from 'express'

export const app = express()

dotenv.config({ path: process.env.ENVIRONMENT === 'production' ? '.env.prod' : '.env' }) 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
