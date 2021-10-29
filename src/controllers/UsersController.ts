import { Request, Response } from "express";
import * as Yup from 'yup';
import { getConnection } from "typeorm";
import { uuid } from 'uuidv4';
import { hash } from 'bcryptjs';

import Users from "../models/Users";

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const {name, email, password, admin } = request.body;

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            admin: Yup.boolean().required(),
        });
        
        if (!(await schema.isValid(request.body))) {
		    return response.status(400).json({ error: 'Validation fails.' });
        }

        const userExists = await getConnection()
            .createQueryBuilder()
            .select("users.email")
            .from(Users, 'users')
            .where("users.email = :email", { email })
            .getOne();

        if (userExists) {
            return response.status(400).json({ error: 'E-mail address has already been used.' });
        }

        const hashedPassword = await hash(password, 8);

        const user = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Users)
            .values([
                {
                    id: uuid(),
                    name,
                    email,
                    password: (await hashedPassword).toString(),
                    admin,
                },
            ])
            .execute();

        return response.json(user)

    }
}