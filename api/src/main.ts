import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { Express } from 'express';
import { Server } from 'http';
import * as path from 'path';
import { AppModule } from './app.module';

dotenv.config();
console.log(`Loaded .env from ${path.resolve(process.cwd(), '.env')}`);

export async function createApp(
  expressApp: Express,
): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  return app;
}

async function bootstrap(): Promise<Server> {
  const expressApp = express();

  const app = await createApp(expressApp);
  await app.init();

  return createServer(expressApp);
}

let server: Server;

/*
 * Handler for AWS events
 */
export async function handler(event: any, context: Context): Promise<Response> {
  if (!server) {
    server = await bootstrap();
  }

  return proxy(server, event, context, 'PROMISE').promise;
}

/*
 * Main function for traditional nodejs express server.
 */
async function main() {
  const server = await bootstrap();

  server.listen(3001, () => {
    console.log('Server listening on http://localhost:3001');
  });
}

if (process.env.BOS_ENV === 'local') {
  main();
}
