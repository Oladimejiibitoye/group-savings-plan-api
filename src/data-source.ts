import "reflect-metadata"
import { DataSource } from "typeorm"
import { dbHost, dbName, dbPassword, dbUsername } from "./common/config/config"
import { Saving_Plan } from "./entity/saving-plan"
import { Buddy } from "./entity/buddy"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: dbHost,
    port: 3306,
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    synchronize: false,
    logging: false,
    entities: [
      User, Saving_Plan, Buddy
     ],
     migrations: [
      'build/migration/*.js'
     ],
     subscribers: [],

})


