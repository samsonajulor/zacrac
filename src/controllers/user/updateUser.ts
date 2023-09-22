import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { Toolbox } from '../../utils';
import { userService } from '../../service';

const { apiResponse } = Toolbox;

async function updateUser(req: Request, res: Response) {
  try {
    let appUser = res.locals.user;

    await userService.updateUser(appUser._id, req.body);

    return apiResponse(
      res,
      ResponseType.SUCCESS,
      StatusCode.OK,
      ResponseCode.SUCCESS,
      {},
      'user updated successfully'
    );
  } catch (error: any) {
    return apiResponse(
      res,
      ResponseType.FAILURE,
      StatusCode.INTERNAL_SERVER_ERROR,
      ResponseCode.FAILURE,
      {},
      `looks like something went wrong: ${JSON.stringify(
        error.response ? error.response.data : error
      )} `
    );
  }
}

export default updateUser;
