import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
  PORT : number
  POSTGRES_URL : string
  NATS_SERVER : string
  JWT_SECRET : string
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  POSTGRES_URL: joi.string().required(),
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
    url : envVars.POSTGRES_URL
  }
}