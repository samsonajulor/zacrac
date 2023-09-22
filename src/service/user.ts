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
        'zacrac api',
        error as string,
        'createUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw new ApiError(
        'zacrac api',
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
        'zacrac api',
        error as string,
        'getUserByEmail',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserByUsername(username: string) {
    try {
      const user = await User.findOne({ username });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      
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
        'zacrac api',
        error as string,
        'updateUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  deleteUserById = async(userId: string) => {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new ApiError(
        'zacrac api',
        error as string,
        'deleteUserById',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  deleteUserByEmail = async(email: string) => {
    try {
      const user = await User.findOneAndDelete({ email });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new ApiError(
        'zacrac api',
        error as string,
        'deleteUserByEmail',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  deleteUserByUsername = async(username: string) => {
    try {
      const user = await User.findOneAndDelete({ username });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new ApiError(
        'zacrac api', 
        error as string,
        'deleteUserByUsername',
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
        'zacrac api',
        error as string,
        'getAllUsers',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  getUsersBatch = async(page = 0, limit = 50) => {
    try {
      const users = await User.find().skip(page * limit).limit(limit);
      return users;
    } catch (error) {
      throw new ApiError(
        'zacrac api',
        error as string,
        'getAllUsersInPage',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new UserService();
