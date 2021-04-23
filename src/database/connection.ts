import { createConnection,getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
}

const connectDb = async () => {
  let retries = 3;
  while (retries) {
    try {
      getConnectionOptions().then(options => {
        const newOptions = options as IOptions;
        newOptions.host = 'database';
        createConnection({
          ...options,
        });
      });
      break;
    } catch (err) {
      retries -= 1;
      await new Promise((res) => setTimeout(res, 500));
    }
  }
};

export default connectDb;
