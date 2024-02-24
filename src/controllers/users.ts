import express from 'express';

import { deleteUserById, getUsers, getUserById, UserModel } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
  
      const deletedUser = await deleteUserById(id);
  
      return res.json(deletedUser);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  // TODO: fix the parsing
  export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const { username } = req.body;
  
      if (!username) {
        return res.sendStatus(400);
      }
  
      const user = await getUserById(id);
      
      user.username = username;
      const updatedUser = await user.save();
  
      return res.status(200).json(updatedUser).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
