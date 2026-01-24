import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger-output.json' assert { type: 'json' };

export const app = express()

dotenv.config({ path: process.env.ENVIRONMENT === 'production' ? '.env.prod' : '.env' }) 

app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.urlencoded({ extended: true }))
