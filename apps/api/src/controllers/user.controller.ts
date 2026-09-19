import { Request, Response } from 'express';

export const listUsers = async (req: Request, res: Response) => {
  // TODO: Implement user listing
  res.status(200).json({ users: [] });
};

export const createUser = async (req: Request, res: Response) => {
  // TODO: Implement user creation
  res.status(201).json({ message: 'User created' });
};