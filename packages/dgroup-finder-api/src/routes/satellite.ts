import { Router } from "express";

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { SatelliteController } from "../controllers/SatelliteController";

const router = Router();

router.get("/", [], SatelliteController.getAll);

router.get(
    "/:id([0-9]+)", [], SatelliteController.getOneById
);

router.post("/", [checkJwt, checkRole(["ADMIN"])], SatelliteController.create);

router.put(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    SatelliteController.edit
);

router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    SatelliteController.remove
);

export default router;