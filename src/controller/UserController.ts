import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User";
import { validate } from "class-validator";
import { AppDataSource } from "../data-source";


class UserController{

    static GetAllUsers = async (req: Request, res: Response, next: NextFunction ) => {
      try {
        //Get users from database
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find({
            select: ["id", "name", "email"] //We dont want to send the passwords on response
        });
        //Send the users object
        res.status(200).send({
            users: users});
        } catch (error) {
            next(error)
        }
    };
    
    static getUserById = async (req: Request, res: Response, next: NextFunction) => {
     try {
         //Get ID from JWT
      const id = res.locals.jwtPayload.userId;
    
      //Get the user from database
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneOrFail({ where: { id } });
      if (!user){
        return res.status(404).send({
            message: "User not found"});
      }
      return res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email
      })
       
     } catch (error) {
        next(error)
     }
    };
    
    static editUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
           //Get ID from JWT
      const id = res.locals.jwtPayload.userId;
    
      //Get values from the body
      const { name } = req.body;
    
      //Try to find user on database
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneOrFail({ where: { id } });
      if(!user){
        return res.status(404).send({
            message: "User not found"});
      }
      //Validate the new values on model
      user.name = name;
      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }
      //Try to safe, if fails, that means name already in use
      try {
        await userRepository.save(user);
      } catch (e) {
        res.status(409).send("username already in use");
        return;
      }
      //After all send a 204 (no content, but accepted) response
      res.status(204).send();
      } catch (error) {
        next(error)
      }
      
    };
    
    static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
     try {
         //Get the ID from the url
      const id = req.params.id;
    
      const userRepository = AppDataSource.getRepository(User);
      const user: User = await userRepository.findOneOrFail({ where: { id } });
      if(!user){
        return res.status(404).send({
            message: "User not found"});
      }
      userRepository.delete(id);
    
      //After all send a 204 (no content, but accepted) response
      res.status(204).send();
     } catch (error) {
        next(error)
     }
    };
 }

    export default UserController;
