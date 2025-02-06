import { Config } from '@/@types';
import { getEnv, getOptionalEnv, toBool } from './utils';

export const config: Config = {
    connectToDatabase: toBool(getOptionalEnv('CONNECT_TO_DATABASE')),
    db: {
        host: getEnv('POSTGRES_HOST'),
        database: getEnv('POSTGRES_DB'),
        user: getEnv('POSTGRES_USER'),
        pass: getEnv('POSTGRES_PASSWORD'),
    },
};
