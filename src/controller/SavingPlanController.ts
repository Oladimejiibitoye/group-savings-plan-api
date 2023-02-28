import { NextFunction, Request, Response } from "express"
import { Saving_Plan } from "../entity/saving-plan";
import { User } from "../entity/User"; 
import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { Buddy } from "../entity/buddy";


class SavingPlanController{

  static CreateSavingPlan = async (req: Request, res: Response, next: NextFunction ) => {
    try {
      const { 
        title, 
        number_of_saving_buddy, 
        target_set, saving_process, 
        saving_frequency, 
        twelve_month_saving_target, 
        saving_start } = req.body;

    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;
    
    //Get the user from database
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({ where: { id } });
    if (!user){
      return res.status(404).send({
          message: "User not found"});
    }
    let saving_plan = new Saving_Plan();
    saving_plan.title = title;
    saving_plan.number_of_saving_buddies = number_of_saving_buddy;
    saving_plan.target_set = target_set;
    saving_plan.saving_process = saving_process;
    saving_plan.saving_frequency = saving_frequency;
    saving_plan.twelve_month_saving_target =twelve_month_saving_target;
    saving_plan.saving_start = saving_start;
    saving_plan.user = user

    //Validate if the parameters are ok
    const errors = await validate(saving_plan);
    if(errors.length > 0){
      res.status(400).send(errors);
      return;
    }
    //Try to save. If fails, the email is already in use
    const savingPlanRepository = AppDataSource.getRepository(Saving_Plan)
    try {
      await savingPlanRepository.save(saving_plan);
    } catch (e) {
      console.log(e)
      res.status(409).send({
        message: e.message});
      return;
    }
    return res.status(201).json({
      message: "✅ Saving Plan created",
      saving_plan
    })
    } catch (error) {
      next(error)
    }
    
  }

  static InviteBuddy = async (req: Request, res: Response, next: NextFunction ) => {
    try {

      const {name} = req.body;
    
      const id = req.params.id;

      //Get ID from JWT
      const userId = res.locals.jwtPayload.userId;
      //Get the user from database
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneOrFail({ where: { id: userId } });
      if (!user){
        return res.status(404).send({
            message: "User not found"});
      }
      const invitedUser = await userRepository.findOneOrFail({where: { name: name}})
      if(!invitedUser){
        return res.status(404).send({
          message: "Invited User does not have an account"
        })
      }
       //Get the account from database
       const savingPlanRepository = AppDataSource.getRepository(Saving_Plan);
       const saving_plan = await savingPlanRepository.findOneOrFail({ where: { id } });
       if (!saving_plan){
         return res.status(404).send({
             message: "Saving Plan not found"});
       }

       

       const buddyRepository = AppDataSource.getRepository(Buddy);
       const buddies = await buddyRepository.find({ 
        relations: {
          saving_plan: true
        },
        where: {
          saving_plan: {
            id: saving_plan.id
          }
        }
      })
      //user can not sent invite to more than 5 buddies
      if(buddies.length === 5){
        return res.status(400).send({
          message: "User can only send 5 invites"});
      }

      let buddy = new Buddy();
      buddy.buddy = invitedUser.id
      buddy.saving_plan = saving_plan;
      
      await buddyRepository.save(buddy);

      return res.status(200).json({
        message: "✅ Invite sent Successfully",
        saving_plan: saving_plan,
        invited_user: invitedUser,
        buddy: buddy
      })
    } catch (error) {
      next(error)
    }
  }

  static AcceptOrDeclineInvite = async (req: Request, res: Response, next: NextFunction ) => {
    try {

      const {acceptance} = req.query;
    
      const id = req.params.id;


      let buddy: Buddy
      

      const buddyRepository = AppDataSource.getRepository(Buddy);
      buddy = await buddyRepository.findOneOrFail({ where: { id } });
      if(!buddy){
        return res.status(404).send({
          message: "buddy not found"});
      }
      if(acceptance === "declined"){
        buddy.accceptance = "declined";
        await buddyRepository.save(buddy);
      }

      if(acceptance === "accepted"){
        buddy.accceptance = "accepted";
        await buddyRepository.save(buddy);
      }
  
      return res.status(201).json({
        message: `Invite ${acceptance}`,
        buddy: buddy
      })
    } catch (error) {
      next(error)
    }
  }

}

export default SavingPlanController