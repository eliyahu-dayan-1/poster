import { Request, Response } from 'express';
import { wixEditorService } from '../services/wixEditor.service';

class WixEditorController {
  addComponent = async (req: Request, res: Response) => {
    const wixComponent = req.body.wixComponent
    const addComponentRes = await wixEditorService.addComponent(wixComponent);

    res.send(addComponentRes);
  };

  openWixEditor = async (req: Request, res: Response) => {
    const url = req.body.url
    const openWixEditorRes = await wixEditorService.openWixEditor(url);

    res.send(openWixEditorRes);
  };

  // getPosts = async (req: Request, res: Response) => {
  //   const getAllPostsRes = await postService.getAllPosts();

  //   res.send(getAllPostsRes);
  // };

  // deletePost = async (req: Request, res: Response) => {
  //   const deletePostRes = await postService.deletePost(req.params.id);

  //   res.send(deletePostRes);
  // };

  // updatePost = async (req: Request, res: Response) => {
  //   const post: Post = req.body;
  //   const updatePostRes = await postService.updatePost(post, req.params.id);

  //   res.send(updatePostRes);
  // };
  // addPost = async (req: Request, res: Response) => {
  //   const post: Post = req.body;
  //   const addPostRes = await postService.addPost(post);

  //   res.send(addPostRes);
  // };
}

const wixEditorController = new WixEditorController()

export { wixEditorController };
