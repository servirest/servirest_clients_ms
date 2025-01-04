import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
  PORT : number
  POSTGRES_HOST: string
  POSTGRES_PORT: number
  POSTGRES_USERNAME: string
  POSTGRES_PASSWORD: string
  POSTGRES_DATABASE: string
  NATS_SERVER : string
  JWT_SECRET : string
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  POSTGRES_HOST: joi.string().required(),
  POSTGRES_PORT : joi.number().required(),
  POSTGRES_USERNAME : joi.string().required(),
  POSTGRES_PASSWORD : joi.string().required(),
  POSTGRES_DATABASE : joi.string().required(),
  NATS_SERVER: joi.string().required(),
  JWT_SECRET: joi.string().required()
})
.unknown(true)

const {error, value} = envsSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
  port:envVars.PORT,
  natsServer: envVars.NATS_SERVER,
  jwtSecret: envVars.JWT_SECRET,
  postgres:{
    host: envVars.POSTGRES_HOST,
    port: envVars.POSTGRES_PORT,
    username: envVars.POSTGRES_USERNAME,
    password: envVars.POSTGRES_PASSWORD,
    database: envVars.POSTGRES_DATABASE
  }
}