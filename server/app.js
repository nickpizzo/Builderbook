import dotenv from 'dotenv';
import express from 'express';
import next from 'next';
import mongoose from 'mongoose';
import session from 'express-session';
import mongoSessionStore from 'connect-mongo';

import User from './models/User';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const MONGO_URL = process.env.MONGO_URL_TEST;

// Mongo

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose.connect(
  MONGO_URL,
  options,
);

// Server

const port = process.env.PORT || 8000;
const ROOT_URL = process.env.ROOT_URL || `http://localhost:${port}`;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const MongoStore = mongoSessionStore(session);

  // Session options
  const sess = {
    name: 'builderbook.sid',
    secret: 'pQeaPDeh-VRgE8!%a-5U+jG*^9z_jBW&?F9V@JXJ',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60, // save session 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  };

  server.use(session(sess));

  // test route
  server.get('/', async (req, res) => {
    req.session.foo = 'bar';
    const user = await User.findOne({ slug: 'team-builder-book' });
    app.render(req, res, '/', { user });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, () => {
    console.log(`ready on ${ROOT_URL}`); // eslint-disable-line no-console
  });
});
