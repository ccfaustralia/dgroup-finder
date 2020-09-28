import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import satellite from "./satellite";
import dgroup from "./dgroup";
import enquiry from "./enquiry";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/satellite", satellite);
routes.use("/dgroup", dgroup);
routes.use("/enquiry", enquiry);

export default routes;