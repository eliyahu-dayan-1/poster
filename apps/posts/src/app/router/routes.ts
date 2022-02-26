import * as express from 'express';
import {
  requireAuth,
  requireAdmin,
} from '../../middlewares/requireAuth.middleware';
import {
  getPost,
  getPosts,
  deletePost,
  updatePost,
  addPost,
  getPostsByUserId,
} from '../controller/controller';

const router = express.Router();

router.get('/', getPosts);
router.get('/by_user_id/:user_id', getPostsByUserId);
router.get('/:id', getPost);
router.put('/:id', requireAuth, updatePost);
router.post('/', requireAuth, addPost);
router.delete('/:id', requireAuth, requireAdmin, deletePost);

export default router;
