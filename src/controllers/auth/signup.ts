import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { Toolbox } from '../../utils';
import { userService } from '../../service';

const { apiResponse } = Toolbox;

async function signup(req: Request, res: Response) {
  try {
    const { phoneNumber, email, password, username } = req.body as any;

    const existingEmail = await userService.getUserByEmail(email);

    if (existingEmail) {
      return apiResponse(
        res,
        ResponseType.FAILURE,
        StatusCode.ALREADY_EXISTS,
        ResponseCode.FAILURE,
        {},
        'User already exists'
      );
    }

    const existingUsername = await userService.getUserByUsername(username);

    if (existingUsername) {
      return apiResponse(
        res,
        ResponseType.FAILURE,
        StatusCode.ALREADY_EXISTS,
        ResponseCode.FAILURE,
        {},
        'Username already exists'
      );
    }

    const tempToken = jwt.sign({ email }, process.env.JWT_SECRET as string as string, {
      expiresIn: '7d',
    });
    const _token = tempToken;

    await User.create({
      phoneNumber,
      password: bcrypt.hashSync(String(password), 10),
      email,
      username,
      expiresIn: new Date(new Date().setDate(new Date().getDate() + 7)),
    });

    return apiResponse(
      res,
      ResponseType.SUCCESS,
      StatusCode.OK,
      ResponseCode.SUCCESS,
      { _token },
      'Registration successful.'
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

export default signup;
