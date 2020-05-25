import {NextFunction, Request, Response} from "express";
import {User} from "../entities/User";
import {validate} from "class-validator";

export class UserController {

    static async getAll(request: Request, response: Response, next: NextFunction) {
        const users = await User.find({
            select: ["id", "username", "role", "createdAt", "createdBy", "updatedAt", "updatedBy", "satellite"]
        });
        response.send(users);
    }

    static async getOneById(request: Request, response: Response, next: NextFunction) {
        const id: string = request.params.id;
        try {
            const user = await User.findOneOrFail(id, {
                select: ["id", "username", "role", "createdAt", "createdBy", "updatedAt", "updatedBy"]
            });
            response.send(user);
        } catch (error) {
            response.status(404).send("User not found");
        }
    }

    static async create(request: Request, response: Response, next: NextFunction) {
        let { username, password, role, satellite } = request.body;
        let user: User = new User();
        user.username = username;
        user.password = password;
        user.role = role;
        user.satellite = satellite;
        user.createdBy = response.locals.jwtPayload.userId;


        //Validate if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            response.status(400).send(errors);
            return;
        }

        //Hash the password, to securely store on DB
        user.hashPassword();

        //Try to save. If fails, the username is already in use
        try {
            await user.save();
        } catch (error) {
            response.status(409).send("Username already in use");
            return;
        }

        response.status(201).send("User created");
    }

    static async edit(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        const { username, role, satellite } = request.body;

        //Try to find user in the database
        let user: User;
        try {
            user = await User.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            response.status(404).send("User not found");
            return;
        }

        //Validate the new values on model
        user.username = username;
        user.role = role;
        user.satellite = satellite;
        user.updatedBy = response.locals.jwtPayload.userId;

        const errors = await validate(user);
        if (errors.length > 0) {
            response.status(400).send(errors);
            return;
        }

        //Try to save, if fails, that means username is already in use
        try {
            await user.save();
        } catch (error) {
            response.status(409).send("Username already in use");
            return;
        }
        response.status(204).send();
    }

    static async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        let user: User;
        try {
            user = await User.findOneOrFail(id);
        } catch (error) {
            response.status(404).send("User not found");
            return;
        }
        await user.remove();
        response.status(204).send();
    }

}