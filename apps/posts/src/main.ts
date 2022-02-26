import { BaseExpressAPI } from '@poster/express-api';
import postRoutes from './app/router/routes';

new BaseExpressAPI({
  defaultPort: 3333,
  apiUrl: '/api/post',
  router: postRoutes,
});
