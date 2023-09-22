import { Request, Response } from 'express';
import { userService } from '../../service';
import { ResponseCode, ResponseType, StatusCode } from '../../@types';
import { Toolbox } from '../../utils';

const { apiResponse } = Toolbox;

async function hardDeleteUser(req: Request, res: Response) {
  try {
    const { email, userId, username } = req.body;

    if (email) {
      await userService.deleteUserByEmail(email);
    } else if (userId) {
      await userService.deleteUserById(userId);
    } else {
      await userService.deleteUserByUsername(username);
    }

    return apiResponse(
      res,
      ResponseType.SUCCESS,
      StatusCode.OK,
      ResponseCode.SUCCESS,
      {},
      'user deleted successfully'
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

export default hardDeleteUser;
