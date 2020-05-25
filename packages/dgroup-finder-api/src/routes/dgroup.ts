import { Router } from "express";

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { DgroupController } from "../controllers/DgroupController";

const router = Router();

router.get("/", [], DgroupController.getAll);

router.get(
    "/:id([0-9]+)", [], DgroupController.getOneById
);

router.post("/", [checkJwt, checkRole(["ADMIN", "COS"])], DgroupController.create);

router.put(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN", "COS"])],
    DgroupController.edit
);

router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN", "COS"])],
    DgroupController.remove
);

export default router;