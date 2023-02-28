import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { jwtSecretKey } from "../common/config/config";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers.authorization.split(" ")[1];
  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, jwtSecretKey);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, email } = jwtPayload;
  const newToken = jwt.sign({ userId, email }, jwtSecretKey, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};