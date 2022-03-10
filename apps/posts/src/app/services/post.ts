import { postCollection } from '../services/collections.service';
import Post from '../interfaces/data-contracts/Post';

class PostService {
  getPost = async (postId: string) => {
    const getPostRes = await postCollection.getById(postId);

    return getPostRes;
  };

  getPostByUser = async (userId: string) => {
    const getPostByUserRes = await postCollection.query({ user: userId });

    return getPostByUserRes;
  };

  getAllPosts = async () => {
    const getAllPostsRes = await postCollection.query();

    return getAllPostsRes;
  };

  deletePost = async (postId: string) => {
    const deletePostRes = await postCollection.removeById(postId);

    return deletePostRes;
  };

  updatePost = async (post: Post, postId: string) => {
    const updatePostRes = await postCollection.updateById(post, postId);

    return updatePostRes;
  };
  addPost = async (post: Post) => {
    const addedPostRes = await postCollection.add(post);

    return addedPostRes;
  };
}

const postService = new PostService();
export { postService };
