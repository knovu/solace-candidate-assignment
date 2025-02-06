import { sql } from 'drizzle-orm';
import {
    pgTable,
    integer,
    text,
    jsonb,
    serial,
    timestamp,
    bigint,
    index,
} from 'drizzle-orm/pg-core';

const advocates = pgTable(
    'advocates',
    {
        id: serial('id').primaryKey(),
        firstName: text('first_name').notNull(),
        lastName: text('last_name').notNull(),
        city: text('city').notNull(),
        degree: text('degree').notNull(),
        specialties: jsonb('payload').default([]).notNull(),
        yearsOfExperience: integer('years_of_experience').notNull(),
        phoneNumber: bigint('phone_number', { mode: 'number' }).notNull(),

        // @ts-ignore
        createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    },
    (table) => ({
        // Adds proper index for helping with searching performance
        advocateIndex: index('advocate_index').on(
            table.firstName,
            table.lastName,
            table.city,
            table.degree,
            table.specialties,
        ),
    }),
);

export { advocates };
