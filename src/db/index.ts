import { config } from '@/lib';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const setup = (): PostgresJsDatabase | undefined => {
    if (!config.connectToDatabase) {
        return undefined;
    }

    // for query purposes
    const queryClient = postgres({
        host: config.db.host,
        database: config.db.database,
        user: config.db.user,
        pass: config.db.pass,
    });
    const db = drizzle(queryClient);
    return db;
};

export default setup();
