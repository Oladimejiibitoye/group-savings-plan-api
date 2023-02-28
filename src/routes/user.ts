import { Router } from "express";
import UserController from "../controller/UserController";
import { auth } from "../middleware/auth";

const router = Router();

//Get all users
router.get("/",  UserController.GetAllUsers);

// Get one user
router.get("/user", [auth], UserController.getUserById);

//Edit one user
router.patch("/edituser",[auth], UserController.editUser);

//Delete one user
router.delete("/:id", [auth], UserController.deleteUser);

export default router;