import mongoose from 'mongoose';
import config from './config';
import app from './app';

const server = async () => {
  try {
    await mongoose.connect(config.dbUrl as string);
    app.listen(config.port, () => {
      console.log(`Server is running on port http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

server();
