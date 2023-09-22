import User from '../models/User';
import { StatusCode, UserInterface } from '../@types';
import { ApiError } from '../utils';

class UserService {
  async createUser(userData: UserInterface) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new ApiError(
        'core mobile api',
        error as string,
        'createUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await User.findById(userId).populate('plans').populate('reports');
      return user;
    } catch (error) {
      throw new ApiError(
        'core mobile api',
        error as string,
        'getUserById',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = User.findOne({ email });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new ApiError(
        'core mobile api',
        error as string,
        'getUserByEmail',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateUser(userId: string, userData: UserInterface) {
    try {
      const user = await User.findByIdAndUpdate(userId, userData, {
        new: true,
      });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new ApiError(
        'core mobile api',
        error as string,
        'updateUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  deleteUser = async(userId: string) => {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new ApiError(
        'core mobile api',
        error as string,
        'deleteUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  getAllUsers = async() => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new ApiError(
        'core mobile api',
        error as string,
        'getAllUsers',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new UserService();
