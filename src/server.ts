require('dotenv').config();

import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';

import './database';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port} `);
});