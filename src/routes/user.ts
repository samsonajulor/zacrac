import express from 'express';
import { UserController } from '../controllers';
import { UserMiddleware } from '../middleware';

const router = express.Router();

const { resetPassword, hardDeleteUser, getUsers, updateUser } = UserController;

const { inspectDeleteUser, inspectUpdateUser, inspectGetUsers } = UserMiddleware;

router.post('/reset', resetPassword);
router.delete('/delete', inspectDeleteUser, hardDeleteUser);
router.get('/', inspectGetUsers, getUsers);
router.put('/', inspectUpdateUser, updateUser);

export default router;
