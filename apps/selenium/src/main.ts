import { BaseExpressAPI } from '@poster/express-api';
import { router } from './app/router/router';

new BaseExpressAPI({
  defaultPort: 3333,
  apiUrl: '/api/wix-editor',
  router: router,
});