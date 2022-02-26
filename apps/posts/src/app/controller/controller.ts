import { postCollection } from '../services/collections-service';
import { Request, Response } from 'express';

class PostController {
  getPost = async (req: Request, res: Response) => {
    const post = await postCollection.getById(req.params.id);
    res.send(post);
  };

  getPostsByUserId = async (req: Request, res: Response) => {
    const post = await postCollection.getByUserId(req.params.user_id);
    res.send(post);
  };

  getPosts = async (req: Request, res: Response) => {
    const posts = await postCollection.query(req.query);
    res.send(posts);
  };

  deletePost = async (req: Request, res: Response) => {
    await postCollection.remove(req.params.id);
    res.end();
  };

  updatePost = async (req: Request, res: Response) => {
    const post = req.body;

    try {
      await postCollection.update(post, req.params.id);
      res.send(post);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  addPost = async (req: Request, res: Response) => {
    const post = req.body;
    try {
      const addedPost = await postCollection.add(post);
      res.send(addedPost);
    } catch (err) {
      res.status(500).send(err);
    }
  };
}

export { PostController };
