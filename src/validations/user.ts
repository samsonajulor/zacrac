import Joi from 'joi';
import joiDate from '@joi/date';
import { RegisterType, DeleteUserType, GetUsersType, UpdateUserType } from '../@types';

const joi = Joi.extend(joiDate);

const user = {
  async validateUpdateUser(payload: UpdateUserType) {
    const schema = joi.object({
      email: joi.string().email().optional().label('Invalid or missing email'),
      username: joi.string().optional().label('Invalid or missing username'),
      firstName: joi.string().optional().label('Invalid or missing firstName'),
      lastName: joi.string().optional().label('Invalid or missing lastName'),
      phoneNumber: joi.string().optional().label('Invalid or missing phoneNumber'),
      address: joi.string().optional().label('Invalid or missing address'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
  async validateGetUsers(payload: GetUsersType) {
    const schema = joi.object({
      page: joi.number().optional().label('Invalid or missing page'),
      limit: joi.number().optional().label('Invalid or missing limit'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
  async validateUser(payload: DeleteUserType) {
    const schema = joi.object({
      email: joi.string().email().optional().label('Invalid or missing email'),
      username: joi.string().optional().label('Invalid or missing username'),
      userId: joi.string().optional().label('Invalid or missing userId'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
  async validateSignUp(payload: RegisterType) {
    const schema = joi.object({
      username: joi.string().optional().label('username is not valid'),
      email: joi.string().email().required().label('A valid email is required'),
      phoneNumber: joi.string().optional().allow('').label('A valid phone number is required'),
      password: joi
        .string()
        .min(4)
        .max(50)
        .required()
        .label('password is required. It must be greater than digits'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
  async validateAuth(payload: RegisterType) {
    const schema = joi.object({
      email: joi.string().email().required().label('A valid email is required'),
      password: joi
        .string()
        .min(4)
        .max(50)
        .required()
        .label('password is required. It must be greater than digits'),
      tempToken: joi.string().min(6).max(6).optional().label('Invalid or missing token'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
  async validateVerifyToken(payload: RegisterType) {
    const schema = joi.object({
      token: joi.string().required().label('Invalid or missing token in query'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
  async validateToggleStatus(payload: any) {
    const schema = joi.object({
      deactivate: joi.boolean().required().label('Invalid or missing request body.'),
      id: joi.string().required().label('Invalid or missing request body.'),
      reason: joi.string().optional().label('invalid or missing request body'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default user;
