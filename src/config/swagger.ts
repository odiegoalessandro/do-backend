import swaggerAutogen from 'swagger-autogen';
import { doc } from './doc';

const outputFile = './swagger-output.json';
const endpointsFiles = ['../index.ts'];

await swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
