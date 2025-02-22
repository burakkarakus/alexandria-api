import { Request, Response } from 'express';
import { User } from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
};