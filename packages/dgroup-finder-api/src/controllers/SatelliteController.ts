import {NextFunction, Request, Response} from "express";
import {validate} from "class-validator";
import {Satellite} from "../entities/Satellite";

export class SatelliteController {

    static async getAll(request: Request, response: Response, next: NextFunction) {
        const satellites = await Satellite.find();
        response.send(satellites);
    }

    static async getOneById(request: Request, response: Response, next: NextFunction) {
        const id: string = request.params.id;
        try {
            const satellite = await Satellite.findOneOrFail(id);
            response.send(satellite);
        } catch (error) {
            response.status(404).send("Satellite not found");
        }
    }

    static async create(request: Request, response: Response, next: NextFunction) {
        let { name, description, country, email } = request.body;
        let satellite: Satellite = new Satellite();
        satellite.name = name;
        satellite.description = description;
        satellite.country = country;
        satellite.email = email;
        satellite.createdBy = response.locals.jwtPayload.userId;

        const errors = await validate(satellite);
        if (errors.length > 0) {
            response.status(400).send(errors);
            return;
        }

        try {
            await satellite.save();
        } catch (error) {
            response.status(500).send("Failed to create satellite");
            return;
        }

        response.status(201).send("Satellite created");
    }

    static async edit(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        let { name, description, country, email } = request.body;

        let satellite: Satellite;
        try {
            satellite = await Satellite.findOneOrFail(id);
        } catch (error) {
            response.status(404).send("Satellite not found");
            return;
        }

        satellite.name = name;
        satellite.description = description;
        satellite.country = country;
        satellite.email = email;
        satellite.updatedBy = response.locals.jwtPayload.userId;
        const errors = await validate(satellite);
        if (errors.length > 0) {
            response.status(400).send(errors);
            return;
        }

        try {
            await satellite.save();
        } catch (error) {
            response.status(500).send("Failed to update satellite");
            return;
        }
        response.status(204).send();
    }

    static async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        let satellite: Satellite;
        try {
            satellite = await Satellite.findOneOrFail(id);
        } catch (error) {
            response.status(404).send("Satellite not found");
            return;
        }
        await satellite.remove();
        response.status(204).send();
    }

}