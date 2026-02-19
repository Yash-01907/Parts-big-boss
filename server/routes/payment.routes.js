import Router from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import {
  createOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = Router();

router.use(verifyJWT);

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

export default router;
