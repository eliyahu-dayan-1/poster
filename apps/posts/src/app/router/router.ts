import * as express from 'express';
import {
  requireAuth,
  requireAdmin,
} from '../../middlewares/requireAuth.middleware';
import { PostController } from '../controller/controller';

const postController = new PostController();

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/by_user_id/:user_id', postController.getPostsByUserId);
router.get('/:id', postController.getPost);
router.put('/:id', requireAuth, postController.updatePost);
router.post('/', requireAuth, postController.addPost);
router.delete('/:id', requireAuth, requireAdmin, postController.deletePost);

export { router };
