import express from "express";
import connectDb from "./database/connection";

import router from './routes/index.routes';
const server = express();

const app = {
  database: async () => {
    try {
      console.log('============= starting database =============')
      return connectDb();
    } catch (error) {
      throw new Error(error);
    }
  },
  plugins: async () => {
    server.use(express.json())
    server.use(router);
    console.log('============= starting plugins =============')
  },
  start: async () => {
    try {
      console.log('============= starting server =============')
      server.createdAt = new Date();
      return server.listen(3333, "0.0.0.0", () => {
        console.log("============= server stated at http://localhost:3333 =============")
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default app;
