import { BaseExpressAPI } from '@poster/express-api';
import { router } from './app/router/router';

new BaseExpressAPI({
  defaultPort: 3334,
  apiUrl: '/api/auth',
  router: router,
});
