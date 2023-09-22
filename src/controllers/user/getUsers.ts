import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { Toolbox } from '../../utils';
import { userService } from '../../service';

const { apiResponse } = Toolbox;

async function getUsers(req: Request, res: Response) {
  try {
    const { page, limit } = req.query;
      const userDetails: any = await userService.getUsersBatch(Number(page), Number(limit));

    if (!userDetails) {
      return apiResponse(
        res,
        ResponseType.FAILURE,
        StatusCode.NOT_FOUND,
        ResponseCode.FAILURE,
        {},
        'users not found'
      );
    }
    return apiResponse(
      res,
      ResponseType.SUCCESS,
      StatusCode.OK,
      ResponseCode.SUCCESS,
      userDetails as object
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

export default getUsers;
