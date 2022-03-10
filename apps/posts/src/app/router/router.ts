import * as express from 'express';
import {
  requireAuth,
  requireAdmin,
} from '../middlewares/requireAuth.middleware';
import { PostController } from '../controller/controller';
/
  @swagger
   components:
     schemas:
       Book:
         type: object
         required:
           - title
           - author
           - finished
         properties:
           id:
             type: integer
             description: The auto-generated id of the book.
           title:
             type: string
             description: The title of your book.
           author:
             type: string
             description: Who wrote the book?
           finished:
             type: boolean
             description: Have you finished reading it?
           createdAt:
             type: string
             format: date
             description: The date of the record creation.
         example:
            title: The Pragmatic Programmer
            author: Andy Hunt / Dave Thomas
            finished: true
 /

const postController = new PostController();

const router = express.Router();

router.get('/', requireAuth, postController.getPosts);
router.get(
  '/by_user_id/:user_id',
  requireAuth,
  postController.getPostsByUser
);
router.get('/:id', requireAuth, postController.getPost);
router.put('/:id', requireAuth, postController.updatePost);
router.post('/', requireAuth, postController.addPost);
router.delete('/:id', requireAuth, requireAdmin, postController.deletePost);

export { router };
