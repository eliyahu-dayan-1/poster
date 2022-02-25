import * as postService from './services/postService';

export async function getPost(req, res) {
  const post = await postService.getById(req.params.id);
  res.send(post);
}

export async function getPostsByUserId(req, res) {
  const post = await postService.getByUserId(req.params.user_id);
  res.send(post);
}

export async function getPosts(req, res) {
  const posts = await postService.query(req.query);
  res.send(posts);
}

export async function deletePost(req, res) {
  await postService.remove(req.params.id);
  res.end();
}

export async function updatePost(req, res) {
  const post = req.body;
  
  try {
    await postService.update(post, req.params.id);
    req.session.post = post;
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
}
export async function addPost(req, res) {
  const post = req.body;
  try {
    const addedPost = await postService.add(post);
    res.send(addedPost);
  } catch (err) {
    res.status(500).send(err);
  }
}
