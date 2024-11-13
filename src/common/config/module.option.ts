import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const configModuleOptions: ConfigModuleOptions = {
  validationSchema: Joi.object({
    APP_PORT: Joi.number().port().default(3000),
    APP_ENV: Joi.string().valid('prod', 'dev').insensitive(),
    DATABASE_HOST: Joi.string().hostname().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_PORT: Joi.number().port().default(5432),
  }),
  isGlobal: true,
};
