import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import postRoutes from './routes';

const app = express();

// Express App Config //
const port = process.env.port || 3333;
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));
} else {
  const corsOptions = {
    origin: [`http://127.0.0.1:${port}`, `http://localhost:${port}`],
    credentials: true,
  };
  app.use(cors(corsOptions));
}
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/post', postRoutes);
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
