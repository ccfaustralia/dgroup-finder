import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

import { User } from "../entities/User";
import config from "../config/config";

export class AuthController {
    static async login(req: Request, res: Response) {
        //Check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send();
        }

        //Get user from database
        let user: User;
        try {
            user = await User.findOneOrFail({ username });
        } catch (error) {
            res.status(401).send();
            return;
        }

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send();
            return;
        }

        //Sign JWT, valid for 1 hour
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        //Send the jwt in the response
        res.send(token);
    }

    static async changePassword(req: Request, res: Response) {
        //Get ID from JWT
        const id = res.locals.jwtPayload.userId;

        //Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send();
        }

        //Get user from the database
        let user: User;
        try {
            user = await User.findOneOrFail(id);
        } catch (id) {
            res.status(401).send();
        }

        //Check if old password matches
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            res.status(401).send();
            return;
        }

        //Validate the password
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        //Hash the new password and save
        user.hashPassword();
        await user.save();

        res.status(204).send();
    }
}
