import awsServerlessExpress from 'aws-serverless-express';
import app from './index';

const server = awsServerlessExpress.createServer(app);

export const universal = (event, context) => awsServerlessExpress.proxy(server, event, context);
