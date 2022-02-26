import { postCollection } from '../services/collections-service';
import { Request, Response } from 'express';

export async function getPost(req: Request, res: Response) {
  const post = await postCollection.getById(req.params.id);
  res.send(post);
}

export async function getPostsByUserId(req: Request, res: Response) {
  const post = await postCollection.getByUserId(req.params.user_id);
  res.send(post);
}

export async function getPosts(req: Request, res: Response) {
  const posts = await postCollection.query(req.query);
  res.send(posts);
}

export async function deletePost(req: Request, res: Response) {
  await postCollection.remove(req.params.id);
  res.end();
}

export async function updatePost(req: Request, res: Response) {
  const post = req.body;

  try {
    await postCollection.update(post, req.params.id);
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
}
export async function addPost(req: Request, res: Response) {
  const post = req.body;
  try {
    const addedPost = await postCollection.add(post);
    res.send(addedPost);
  } catch (err) {
    res.status(500).send(err);
  }
}
