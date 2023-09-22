import express from 'express';
import { AuthController } from '../controllers';
import { UserMiddleware } from '../middleware';

const router = express.Router();

const { signup, getUser, login, updatePassword, verifyToken, softDeleteUser } = AuthController;
const {
  inspectRegisterUser,
  inspectAuthRoutes,
  inspectVerifyToken,
  inspectToggleActivationStatus,
  inspectGetUser,
} = UserMiddleware;

router.post('/signup', inspectRegisterUser, signup);
router.post('/login', inspectAuthRoutes, login);
router.post('/password', inspectAuthRoutes, updatePassword);
router.get('/verify', inspectVerifyToken, verifyToken);
router.patch('/status', inspectToggleActivationStatus, softDeleteUser);
router.get('/me', inspectGetUser, getUser);

export default router;
