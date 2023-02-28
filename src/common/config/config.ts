require('dotenv').config()

export const port = process.env.PORT || 3000
export const dbPassword = process.env.DB_PASSWORD
export const dbUsername = process.env.DB_USERNAME
export const dbName = process.env.DB_NAME
export const dbHost = process.env.DB_HOST
export const jwtSecretKey = process.env.JWT_SECRET_KEY