import express from 'express';
import { wixEditorController } from '../controller/controller';


const router = express.Router();

router.post(
  '/open-editor',
  wixEditorController.openWixEditor
);

router.post(
  '/add-component',
  wixEditorController.addComponent
);

export { router };
