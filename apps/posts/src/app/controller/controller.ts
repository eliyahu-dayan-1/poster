import { Request, Response } from 'express';
import Post from '../interfaces/data-contracts/Post';
import { postService } from '../services/post';

class PostController {
  getPost = async (req: Request, res: Response) => {
    const getPostRes = await postService.getPost(req.params.id);

    res.send(getPostRes);
  };

  getPostsByUser = async (req: Request, res: Response) => {
    const getPostByUserRes = await postService.getPostByUser(
      req.params.user_id
    );
    res.send(getPostByUserRes);
  };

  getPosts = async (req: Request, res: Response) => {
    const getAllPostsRes = await postService.getAllPosts();

    res.send(getAllPostsRes);
  };

  deletePost = async (req: Request, res: Response) => {
    const deletePostRes = await postService.deletePost(req.params.id);

    res.send(deletePostRes);
  };

  updatePost = async (req: Request, res: Response) => {
    const post: Post = req.body;
    const updatePostRes = await postService.updatePost(post, req.params.id);

    res.send(updatePostRes);
  };
  addPost = async (req: Request, res: Response) => {
    const post: Post = req.body;
    const addPostRes = await postService.addPost(post);

    res.send(addPostRes);
  };
}

export { PostController };
