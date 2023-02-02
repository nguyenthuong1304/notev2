import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import routes from './routes/index.js';

const app = express();
const httpServer = http.createServer(app);

app.use(
  cors(),
  // authorizationJWT,
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
);

app.use('/api/', routes);

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to DB');
    await new Promise((resolve) => httpServer.listen({ port: process.env.APP_PORT }, resolve));
    console.log(`🚀 Server ready at port ${process.env.APP_PORT}`);
  });