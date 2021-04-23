import express from "express";
import connectDb from "./database/connection";

const server = express();

const instance = {
  database: async () => {
    try {
      console.log('============= starting database =============')
      return connectDb();
    } catch (error) {
      throw new Error(error);
    }
  },
  plugins: async () => {
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

export default instance;
