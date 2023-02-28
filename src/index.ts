import * as express from "express";
import { Request, Response } from "express"
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import * as morgan from 'morgan';
import * as cors from "cors";
import { port, dbName } from "./common/config/config";

//Access the routes 
import auth from "./routes/auth";
import user from "./routes/user";
import savingPlan from "./routes/savingPlan";
import { createDBIfNotExists } from "./createDatabase";



function handleError(err: { stausCode: any; message: any; }, res: Response) {
    res.status(err.stausCode || 500).send({message: err.message});

}


AppDataSource.initialize().then(async () => {
    
    // create express app
    const app = express();

    //call middlewares
    app.use(cors());
    app.use(morgan('tiny'));
    app.use(bodyParser.json());

    app.get("/", (req: Request, res: Response) => res.send("APP is running!"));


    //Set all routes from routes folder
    app.use("/api/auth", auth);
    app.use("/api/users", user);
    app.use("/api/saving-plan", savingPlan)
    


    //handle Error
    app.use(handleError);

    // start express server
    app.listen(port)


    console.log(`Express server has started on port ${port}.`)

}).catch(error => console.log(error))
