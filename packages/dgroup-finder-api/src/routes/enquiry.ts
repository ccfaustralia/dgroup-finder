import { Router } from "express";

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { EnquiryController } from "../controllers/EnquiryController";

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN", "COS"])], EnquiryController.getAll);

router.get(
    "/:id([0-9]+)", [checkJwt, checkRole(["ADMIN", "COS"])], EnquiryController.getOneById
);

router.post("/", [], EnquiryController.create);

router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN", "COS"])],
    EnquiryController.remove
);

export default router;