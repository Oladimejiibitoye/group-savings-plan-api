import { Router } from "express";
import AuthController from "../controller/AuthController";
import { auth } from "../middleware/auth";

const router = Router();
//signup route
router.post("/signup", AuthController.signUp)

//Login route
router.post("/login", AuthController.login);

//Change my password
router.patch("/change-password", [auth], AuthController.changePassword);

export default router;