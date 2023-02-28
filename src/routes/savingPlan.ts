import { Router } from "express";
import SavingPlanController from "../controller/SavingPlanController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/create", [auth], SavingPlanController.CreateSavingPlan);
router.post("/invite/:id", [auth], SavingPlanController.InviteBuddy);
router.get("/status/:id", [auth], SavingPlanController.AcceptOrDeclineInvite);




export default router;