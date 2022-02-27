import { Logger } from '@poster/logger-service';
import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import cookieSession from 'cookie-session';

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
    this.app.use(
      cookieSession({
        name: 'session',
        keys: ['key1', 'key2'],
        maxAge: 60 * 1000,
      })
    );
    const isProduction = this.app.get('env') === 'production';

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
