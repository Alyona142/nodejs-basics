import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';

const bootspar = async () => {
  await initMongoDB();
  startServer();
};
bootspar();
