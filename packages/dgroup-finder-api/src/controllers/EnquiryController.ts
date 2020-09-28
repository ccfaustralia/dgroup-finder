import {NextFunction, Request, Response} from "express";
import {Enquiry} from "../entities/Enquiry";
import {validate} from "class-validator";
import {sendEmail} from "../utils/MailSender";

export class EnquiryController {

    static async getAll(request: Request, response: Response, next: NextFunction) {
        const enquiries = await Enquiry.find();
        response.send(enquiries);
    }

    static async getOneById(request: Request, response: Response, next: NextFunction) {
        const id: string = request.params.id;
        try {
            const enquiry = await Enquiry.findOneOrFail(id);
            response.send(enquiry);
        } catch (error) {
            response.status(404).send("Enquiry not found");
        }
    }

    static async create(request: Request, response: Response, next: NextFunction) {
        let { contactName, contactEmail, contactPhone, contactGender, message, dgroupId } = request.body;
        let enquiry: Enquiry = new Enquiry();
        enquiry.contactName = contactName;
        enquiry.contactEmail = contactEmail;
        enquiry.contactPhone = contactPhone;
        enquiry.contactGender = contactGender;
        enquiry.message = message;
        enquiry.dgroup = dgroupId;

        //Validate if the parameters are ok
        const errors = await validate(enquiry);
        if (errors.length > 0) {
            response.status(400).send(errors);
            return;
        }

        try {
            // Send email
            // await sendEmail(enquiry);
            const result = await enquiry.save();
            console.log('CREATED ENQUIRY', result.dgroup);
        } catch (error) {
            response.status(500).send("Failed to create enquiry");
            return;
        }

        response.status(201).send("Enquiry created");
    }

    static async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        let enquiry: Enquiry;
        try {
            enquiry = await Enquiry.findOneOrFail(id);
        } catch (error) {
            response.status(404).send("Enquiry not found");
            return;
        }
        await enquiry.remove();
        response.status(204).send();
    }

}