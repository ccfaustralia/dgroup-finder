import { Router } from "express";

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import {UserController} from "../controllers/UserController";

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.getAll);

router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.getOneById
);

router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.create);

router.put(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.edit
);

router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.remove
);

export default router;