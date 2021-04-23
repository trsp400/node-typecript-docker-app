import "reflect-metadata";
import server from "./server";

const startApp = async () => {
  await server.database();
  await server.plugins();
  await server.start();
};

startApp();
