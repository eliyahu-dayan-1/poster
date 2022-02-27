import * as express from 'express';
import {
  requireAuth,
} from '../middlewares/requireAuth.middleware';
import { AuthController } from '../controller/controller';

const authController = new AuthController();

const router = express.Router();

router.get('/session', authController.getSession);
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/logout', requireAuth, authController.logout);

export { router };
