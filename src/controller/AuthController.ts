import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
import { AppDataSource } from "../data-source";

import { User } from "../entity/User";
import { jwtSecretKey } from "../common/config/config";

class AuthController {
  static signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Get parameters from the body
    let { name, email, password } = req.body;
    let user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
   
  
    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
  
    //Try to save. If fails, the email is already in use
    const userRepository = AppDataSource.getRepository(User)
    try {
      await userRepository.save(user);
    } catch (e) {
      console.log(e)
      res.status(409).send({
        message: e.message});
      return;
    }
    const token = jwt.sign(
      {email: user.email, userId: user.id},
      jwtSecretKey, 
      {expiresIn : '1hr'})
  
    //If all ok, send 201 response
    return res.status(201).json({
      message: "✅ New user created",
      user,
      token,        
  })
    } catch (error) {
      console.log(error)
      next(error)
    }
    
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
   try {
    //Check if username and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send({
        message: 'provide the required credential'
      });
    }
    const userRepository = AppDataSource.getRepository(User)
    //Get user from database
    let user: User;
    user = await userRepository.findOneOrFail({ where: { email } });
    if(!user){
      return res.status(401).send({
        message: 'invalid credential'
      });
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      return res.status(401).send({
        message: 'invalid credential'
      });
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      jwtSecretKey,
      { expiresIn: "1h" }
    );

    //Send the jwt in the response
    return res.status(200).send({
      message: "✅ User Login Successful",
      user,
      token, 
    });
   } catch (error) {
     next(error)
   }
    
  };
  static changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Get ID from JWT
      const id = res.locals.jwtPayload.userId;
     
      //Get parameters from the body
      const { oldPassword, password } = req.body;
      if (!(oldPassword && password)) {
        res.status(400).send({
          message: "please enter the required credential"
        });
      }
      const userRepository = AppDataSource.getRepository(User)
      //Get user from the database
      const user: User = await userRepository.findOneOrFail({ where: { id } });
      if(!user){
        return res.status(404).send({
          message: "user not found"
        });
      }
      //Check if old password matchs
      if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        return res.status(401).send({
          message: "invalide credential"
        });
      }

      //Validate de model (password lenght)
      user.password = password;
      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }
      //save
      user.hashPassword();
      userRepository.save(user);

      res.status(201).send({
        message: "password change completed"
      });
    } catch (error) {
      console.log(error)
      next(error)
    }
  };
}

export default AuthController