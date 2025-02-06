import db from '../../../db';
import { advocates } from '../../../db/schema';
import { advocateData } from '../../../db/seed/advocates';

export async function POST() {
    if (!db) {
        return Response.json(
            {
                error: 'Internal Server Error',
                errors: 'Database was not set. Did you forget to start your db?',
            },
            {
                status: 500,
            },
        );
    }

    const records = await db.insert(advocates).values(advocateData).returning();

    return Response.json({ advocates: records });
}
