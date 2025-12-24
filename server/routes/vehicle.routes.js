import { Router } from "express";
import { getCompanies, getModels, getYears } from "../controllers/vehicle.controller.js";

const router = Router();

router.route('/companies').get(getCompanies)
router.route('/models/:make_id').get(getModels)
router.route('/years/:model_id').get(getYears)


export default router;