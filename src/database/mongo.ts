import mongoose from 'mongoose';

import log from '../lib/logger';

function connect(): void {
  if (!process.env.MONGODB_URI) {
    return;
  }

  mongoose.set('useCreateIndex', true);

  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('open', () => {
    log.info(`${process.env.NAME} Connected to MongoDB`);
  });

  mongoose.connection.on('error', (err) => {
    log.fatal(`Connection Error: ${JSON.stringify(err)}`);
  });
}

export default { connect };
