import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { Toolbox } from '../../utils';

const { apiResponse } = Toolbox;

async function resetPassword(req: Request, res: Response) {
  try {
    let appUser = res.locals.user;
    const { password, newPassword } = req.body;

    if (!bcrypt.compareSync(String(password), appUser.password)) {
      throw new Error('Invalid credentials');
    }

    await User.updateOne(
      { _id: appUser.id },
      { password: bcrypt.hashSync(String(newPassword), 10) },
      { runValidators: true }
    );
    return apiResponse(
      res,
      ResponseType.SUCCESS,
      StatusCode.OK,
      ResponseCode.SUCCESS,
      'pin reset success.'
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

export default resetPassword;
