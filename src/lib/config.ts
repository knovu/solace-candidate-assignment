import { Config } from '@/@types';
import { getEnv, getOptionalEnv, toBool } from './utils';
import { DEFAULT_CACHE_TTL } from './constants';

export const config: Config = {
    connectToDatabase: toBool(getOptionalEnv('CONNECT_TO_DATABASE')),
    cache: {
        ttl: getOptionalEnv('CACHE_TTL', (value) => parseInt(value, 10)) || DEFAULT_CACHE_TTL,
    },
    db: {
        host: getEnv('POSTGRES_HOST'),
        database: getEnv('POSTGRES_DB'),
        user: getEnv('POSTGRES_USER'),
        pass: getEnv('POSTGRES_PASSWORD'),
    },
};
