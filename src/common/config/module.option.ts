import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const configModuleOptions: ConfigModuleOptions = {
  validationSchema: Joi.object({
    APP_PORT: Joi.number().port().default(3000),
    APP_ENV: Joi.string().valid('prod', 'dev').insensitive(),
    JWT_SECRET: Joi.string().required(),
    DATABASE_HOST: Joi.string().hostname().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_PORT: Joi.number().port().default(5432),
    UUID_NAMESPACE: Joi.string().uuid().required(),
    EMAIL_USERNAME: Joi.string().email().required(),
    EMAIL_PASSWORD: Joi.string().required(),
    EMAIL_HOST: Joi.string().hostname().required(),
    EMAIL_PORT: Joi.number().port().required(),
  }),
  isGlobal: true,
};
