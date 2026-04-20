const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Route = require('./Router');

const API_PORT = process.env.API_PORT || 3001;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/fea_test';

mongoose.set('strictQuery', false);

const api = express();
api.use(cors());
api.use(express.json());
api.use('/api', Route.router);

async function connectDb() {
  try {
    await mongoose.connect(DB_URL);
    api.listen(API_PORT, () => console.log('Server started'));
  } catch (e) {
    console.log(e);
  }
}

async function disconnectDb() {
  await mongoose.disconnect();
}

// for local nodemon launch
connectDb();

module.exports = {
  connectDb,
  disconnectDb
};
