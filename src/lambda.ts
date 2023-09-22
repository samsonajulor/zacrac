import awsServerlessExpress from 'aws-serverless-express';
import app from './index';

const server = awsServerlessExpress.createServer(app);

export const universal = (event: any, context: any) => awsServerlessExpress.proxy(server, event, context);
