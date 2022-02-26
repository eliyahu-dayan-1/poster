import { Logger } from '@poster/logger-service';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import express from 'express';
interface Constractor {
  defaultPort: number;
  apiUrl: string;
  router: express.Router;
  logger?: Console | Logger;
}

class BaseExpressAPI {
  app;
  constructor({
    defaultPort = 3000,
    apiUrl = '',
    router,
    logger = console,
  }: Constractor) {
    this.app = express();
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
    const isProduction = this.app.get('env') === 'production';
    this.app.use(
      session({
        secret: 'test',
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: isProduction ? true : false,
          maxAge: 60000,
        },
      })
    );

    if (isProduction) {
      this.app.set('trust proxy', 1); // trust first proxy
    }

    this.app.use(apiUrl, router);
    const server = this.app.listen(port, () => {
      logger.log(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', logger.error);
  }
}

export { BaseExpressAPI };
