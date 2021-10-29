require("dotenv/config");

import * as Yup from 'yup';
import { Request, Response } from 'express';
import { getConnection } from "typeorm";
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Users from '../models/Users';
import authConfig from '../config/auth';

export default class SessionController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6)
    });

    if (!(await schema.isValid(request.body))) {
	    return response.status(400).json({ error: 'Incorrect e-mail/password combination.' });
    }

    const user = await getConnection()
      .createQueryBuilder()
      .select("users")
      .from(Users, 'users')
      .where("users.email = :email", { email })
      .getOne();

    if (!user) {
      return response.status(400).json({ error: 'User does not exists.' });
    }

    const hashedPass = await bcrypt.hash(password, 8);

    const passwordMatched = await bcrypt.compare(password, (await hashedPass).toString());

    if (!passwordMatched) {
      return response.status(401).json({ error: 'Incorrect e-mail/password combination.' });
    }

    const token = sign({}, authConfig.jwt.secret, {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      });
    
    return response.json({auth: user, token})
  }
}