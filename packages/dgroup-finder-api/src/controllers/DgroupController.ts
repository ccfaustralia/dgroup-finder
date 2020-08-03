import {NextFunction, Request, Response} from "express";
import {validate} from "class-validator";
import {Dgroup, IDgroupQuery} from "../entities/Dgroup";
import {getConnection} from "typeorm";

export class DgroupController {

    static async getAll(request: Request, response: Response, next: NextFunction) {
        console.log(JSON.stringify(request.query));
        const query: IDgroupQuery = <any>request.query;
        let dgroups;
        if (query.lat && query.lng && query.radius) {
            const haversineFormula = `( 6371 * acos( cos( radians(${query.lat}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${query.lng}) ) + sin( radians(${query.lat}) ) * sin( radians( latitude ) ) ) )`;
            dgroups = await getConnection()
                .createQueryBuilder()
                .select("dgroup")
                .from(Dgroup, "dgroup")
                .where(`${haversineFormula} < :radius`, { radius: parseInt(query.radius)})
                .getMany();
        } else {
            dgroups = await Dgroup.find();
        }
        response.send(dgroups);
    }

    static async getOneById(request: Request, response: Response, next: NextFunction) {
        const id: string = request.params.id;
        try {
            const dgroup = await Dgroup.findOneOrFail(id);
            response.send(dgroup);
        } catch (error) {
            response.status(404).send("Dgroup not found");
        }
    }

    static async create(request: Request, response: Response, next: NextFunction) {
        let { name, description, lifeStage, latitude, longitude, satelliteId} = request.body;
        let dgroup: Dgroup = new Dgroup();
        dgroup.name = name;
        dgroup.description = description;
        dgroup.lifeStage = lifeStage;
        dgroup.latitude = latitude;
        dgroup.longitude = longitude;
        dgroup.satellite = satelliteId;
        dgroup.createdBy = response.locals.jwtPayload.userId;

        const errors = await validate(dgroup);
        if (errors.length > 0) {
            response.status(400).send(errors);
            return;
        }

        try {
            await dgroup.save();
        } catch (error) {
            response.status(500).send("Failed to create dgroup");
            return;
        }

        response.status(201).send("Dgroup created");
    }

    static async edit(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        let { name, description, lifeStage, latitude, longitude, satelliteId} = request.body;

        let dgroup: Dgroup;
        try {
            dgroup = await Dgroup.findOneOrFail(id);
        } catch (error) {
            response.status(404).send("Dgroup not found");
            return;
        }

        dgroup.name = name;
        dgroup.description = description;
        dgroup.lifeStage = lifeStage;
        dgroup.latitude = latitude;
        dgroup.longitude = longitude;
        dgroup.satellite = satelliteId;
        dgroup.updatedBy = response.locals.jwtPayload.userId;
        const errors = await validate(dgroup);
        if (errors.length > 0) {
            response.status(400).send(errors);
            return;
        }

        try {
            await dgroup.save();
        } catch (error) {
            response.status(500).send("Failed to update dgroup");
            return;
        }
        response.status(204).send();
    }

    static async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        let dgroup: Dgroup;
        try {
            dgroup = await Dgroup.findOneOrFail(id);
        } catch (error) {
            response.status(404).send("Dgroup not found");
            return;
        }
        await dgroup.remove();
        response.status(204).send();
    }

}