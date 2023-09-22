import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { env } from '../../config';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { Toolbox } from '../../utils';

const { apiResponse } = Toolbox;

const { PROD_BASE_URL, DEV_BASE_URL, NODE_ENV } = env;

async function login(req: Request, res: Response) {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (!user || !bcrypt.compareSync(String(req.body.password), user.password as string)) {
      return apiResponse(
        res,
        ResponseType.FAILURE,
        StatusCode.UNAUTHORIZED,
        ResponseCode.FAILURE,
        {},
        'Invalid credentials'
      );
    }

    if (!user?.isActive) {
      const tempToken = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET as string as string,
        {
          expiresIn: '7d',
        }
      );

      const _token = tempToken;
      if (
        !user.expiresIn ||
        new Date(user.expiresIn).toLocaleDateString('en-CA') <=
          new Date().toLocaleDateString('en-CA')
      ) {
        user.expiresIn = new Date(new Date().setDate(new Date().getDate() + 7));
        await user.save();

        return apiResponse(
          res,
          ResponseType.SUCCESS,
          StatusCode.OK,
          ResponseCode.SUCCESS,
          { _token },
          'Please verify your account using the token provided.'
        );
      }

      return apiResponse(
        res,
        ResponseType.FAILURE,
        StatusCode.UNAUTHORIZED,
        ResponseCode.FAILURE,
        { _token },
        'Please verify your account using the token provided .'
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string as string, {
      expiresIn: '30d',
    });
    const userJSON = user.toObject();
    const { password, _id, ...others } = userJSON;

    return apiResponse(res, ResponseType.SUCCESS, StatusCode.OK, ResponseCode.SUCCESS, {
      ...others,
      token,
    });
  } catch (error: any) {
    return apiResponse(
      res,
      ResponseType.FAILURE,
      StatusCode.INTERNAL_SERVER_ERROR,
      ResponseCode.FAILURE,
      {},
      `looks like something went wrong: ${JSON.stringify(
        error.message || error.response ? error.response.data : error
      )} `
    );
  }
}

export default login;
