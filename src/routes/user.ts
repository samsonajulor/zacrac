import express from 'express';
import { Uploader } from '../middleware';
import { UserController } from '../controllers';
import { UserMiddleware } from '../middleware';

const router = express.Router();

const { upload, resetPin, hardDeleteUser, getUsers, updateUser } = UserController;

const { inspectDeleteUser, inspectUpdateUser, inspectGetUsers } = UserMiddleware;

router.post('/reset', resetPin);
router.post('/upload', Uploader.single('image'), upload);
router.delete('/delete', inspectDeleteUser, hardDeleteUser);
router.get('/', inspectGetUsers, getUsers);
router.put('/', inspectUpdateUser, updateUser);

export default router;
