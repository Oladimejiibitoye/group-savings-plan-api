import { AppDataSource } from "./data-source";
import { dbName } from "./common/config/config"

export const createDBIfNotExists =async () : Promise<void> => {
  
  await AppDataSource.initialize();

  console.log(`Creating database with name "${dbName}"`)
  await AppDataSource.query(`CREATE DATABASE IF NOT EXISTS "${dbName}"`)

  await AppDataSource.destroy()
  
}

