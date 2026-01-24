import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger-output.json' assert { type: 'json' };

export const app = express()

if (process.env.ENVIRONMENT !== 'production'){
  dotenv.config({ path: '.env' }) 

}

app.use(express.json())

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))

if (process.env.NODE_ENV !== 'production') {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

app.use(express.urlencoded({ extended: true }))
