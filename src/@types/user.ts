import { Document } from 'mongoose';

export interface UserInterface extends Document {
  expiresIn: Date;
  hasLoggedIn: boolean;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  email?: string;
  isActive: boolean;
  address?: string;
  city?: string;
  state?: string;
  country: string;
  dob?: string;
  phoneNumber?: string;
  password?: string;
  tempToken?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type RegisterType = {
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dob: string;
};
