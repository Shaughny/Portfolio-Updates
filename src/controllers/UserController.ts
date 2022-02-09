import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { User } from '../models/User';
import { getConnection } from 'typeorm';


interface user {
    name: string,
    email: string,
    password: string
}
interface UserDTO{
    id: number,
    name: string,
    email: string,
    password: string
}
const getAllUsers = async (req: Request, res: Response) => {
    User.find().then((data) => {

        res.send(data);
    })

};

const createUser = async (req: Request, res: Response) => {
    const temp: user = req.body
    User.insert({
        name: temp.name,
        email: temp.email,
        password: temp.password
    });
    res.status(200).end();
};

const deleteUser = async (req: Request, res: Response) => {
    await getConnection().manager.delete(User, parseInt(req.params.id));

    res.status(200).end();
}

const updateUser =async (req: Request, res: Response) => {
    const userDTO: UserDTO = req.body;
    await getConnection().createQueryBuilder().update(User).set({name: userDTO.name, email:userDTO.email, password: userDTO.password}).where("id = :id", { id: userDTO.id }).execute();
    res.status(200).end();
}



module.exports = {
        createUser,
        getAllUsers,
        deleteUser,
        updateUser
}
