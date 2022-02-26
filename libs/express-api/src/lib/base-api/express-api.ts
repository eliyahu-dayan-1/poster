import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';


interface Constractor {
  defaultPort: number;
  apiUrl: string;
  router: express.Router;
  logger?: Console;
}

class BaseExpressAPI {
  app = express();
  constructor({
    defaultPort = 3000,
    apiUrl = '',
    router,
    logger = console,
  }: Constractor) {
    // Express App Config //
    const port = process.env.port || defaultPort;
    if (process.env.NODE_ENV === 'production') {
      this.app.use(express.static('public'));
    } else {
      const corsOptions = {
        origin: [`http://127.0.0.1:${port}`, `http://localhost:${port}`],
        credentials: true,
      };
      this.app.use(cors(corsOptions));
    }

    this.app.use(json());
    this.app.use(cookieParser());
    this.app.use(session({
      secret: 'test',
      resave: false,
      saveUninitialized: true,
      cookie: {
          secure: false, //set true later
          maxAge: 60000
      }
  }));
    this.app.use(apiUrl, router);
    const server = this.app.listen(port, () => {
      logger.log(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', logger.error);
  }
}

export { BaseExpressAPI };
