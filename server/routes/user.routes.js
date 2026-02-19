import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getUserProfile,
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh").post(refreshAccessToken);
router.route("/me").get(verifyJWT, getUserProfile);
router.route("/me/address").post(verifyJWT, addAddress);
router.route("/me/addresses").get(verifyJWT, getAddresses);
router
  .route("/me/address/:id")
  .put(verifyJWT, updateAddress)
  .delete(verifyJWT, deleteAddress);

export default router;
