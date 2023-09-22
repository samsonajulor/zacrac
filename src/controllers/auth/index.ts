import login from './login';
import updatePassword from './updatePassword';
import signup from './signup';
import verifyToken from './verifyToken';
import softDeleteUser from './softDeleteUser';
import getUser from './getUser';

const AuthController = {
  login,
  updatePassword,
  signup,
  verifyToken,
  softDeleteUser,
  getUser,
};

export default AuthController;
