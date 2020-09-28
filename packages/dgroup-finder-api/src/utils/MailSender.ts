import * as SendGrid from "@sendgrid/mail";
import {MailDataRequired} from "@sendgrid/helpers/classes/mail";
import {Enquiry} from "../entities/Enquiry";

export async function sendEmail(enquiry: Enquiry) {

    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

    console.log('ENQUIRY', enquiry);

    const msg: MailDataRequired = {
        to: enquiry.dgroup.leader.username,
        from: enquiry.dgroup.satellite.email,
        replyTo: enquiry.contactEmail,
        subject: `New Enquiry Received for your CCF DGroup "${enquiry.dgroup.name}"`,
        text: enquiry.message,
        html: `<strong>${enquiry.message}</strong>`,
    };

    try {
        await SendGrid.send(msg);
    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
        return Promise.reject(error);
    }

}
