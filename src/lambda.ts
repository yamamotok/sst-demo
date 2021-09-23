import awsLambdaFastify from 'aws-lambda-fastify';
import app from './app';

const proxy = awsLambdaFastify(app);
export const handler = proxy;
