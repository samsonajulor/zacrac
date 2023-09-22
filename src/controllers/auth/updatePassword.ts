import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { Toolbox } from '../../utils';

const { apiResponse } = Toolbox;

async function updatePassword(req: Request, res: Response) {
  try {
    const { password, email } = req.body;
    if (!password) throw new Error('Please include password');
    const user = await User.findOneAndUpdate(
      { email },
      { password: bcrypt.hashSync(String(password), 10) },
      { new: true, runValidators: true }
    );
    if (!user)
      return apiResponse(
        res,
        ResponseType.FAILURE,
        StatusCode.NOT_FOUND,
        ResponseCode.FAILURE,
        {},
        'user not found'
      );

    return apiResponse(
      res,
      ResponseType.SUCCESS,
      StatusCode.OK,
      ResponseCode.SUCCESS,
      {},
      'Password update successful'
    );
  } catch (error) {
    return apiResponse(
      res,
      ResponseType.FAILURE,
      StatusCode.INTERNAL_SERVER_ERROR,
      ResponseCode.FAILURE,
      {},
      `looks like something went wrong: ${JSON.stringify(error)} `
    );
  }
}

export default updatePassword;
