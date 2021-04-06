'use strict';

const path = require('path');
const express = require('express');
const { loadNuxt } = require('nuxt');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const { createServer, proxy } = require('aws-serverless-express');

async function bootstrap() {
  const app = express();

  // Pass API Gateway event context.
  app.use(awsServerlessExpressMiddleware.eventContext());

  // Server static assets.
  app.use('/_nuxt', express.static(path.join(__dirname, '.nuxt', 'dist')));

  // Render nuxt server side.
  const nuxt = await loadNuxt({ for: 'start' });
  app.use(nuxt.render);

  return createServer(app, null, ['*/*']);
}

let server;
exports.handler = async function handler(event, context) {
  if (!server) {
    server = await bootstrap();
  }

  return proxy(server, event, context, 'PROMISE').promise;
};
