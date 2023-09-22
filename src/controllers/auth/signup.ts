import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { Toolbox } from '../../utils';
import { logger, env } from '../../config';
import { userService } from '../../service';

const { apiResponse } = Toolbox;
const { APP_BASE_URL } = env;

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
    const redirectUrl = `${APP_BASE_URL}/auth/verify?token=${tempToken}`;

    await User.create({
      phoneNumber,
      password: bcrypt.hashSync(String(password), 10),
      email,
      username,
      expiresIn: new Date(new Date().setDate(new Date().getDate() + 7)),
    });

    logger('redirect url', redirectUrl);

    return apiResponse(
      res,
      ResponseType.SUCCESS,
      StatusCode.OK,
      ResponseCode.SUCCESS,
      { redirectUrl },
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
