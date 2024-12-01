import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './src/routes/homeRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import tokenRoutes from './src/routes/tokenRoutes.js';

const whiteList = [
  'https://example.com',
  'http://localhost:8101',
  'http://localhost:8100',
  'http://4alltests.com.br'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

import './src/database/index.js';

class App {

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/login/', tokenRoutes);
  }
}

export default new App().app;
