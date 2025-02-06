import { Advocate, AdvocatedResponse, AdvocatePageOptions, Tuple } from '@/@types';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { CacheService, ICacheService } from './cache-service';
import { config, DEFAULT_LIMIT, DEFAULT_OFFSET } from '@/lib';
import db from '@/db';
import { advocateData } from '@/db/seed/advocates';
import { advocates } from '@/db/schema';
import { count, sql } from 'drizzle-orm';

export interface IAdvocateService {
    findMany: (options?: AdvocatePageOptions) => Promise<AdvocatedResponse>;
}

/**
 * Advocate service for pulling advocate data from database or static data
 */
export class AdvocateService {
    private readonly db?: PostgresJsDatabase;
    private readonly data: Advocate[] = [];
    private readonly cacheService: ICacheService = new CacheService();

    constructor() {
        if (config.connectToDatabase) {
            this.db = db;
        }

        // We would rather do a deep copy rather than just a shallow copy
        if (Array.isArray(advocateData) && advocateData.length > 0) {
            this.data = [...(advocateData as Advocate[])];
        }
    }

    public async findMany(options: AdvocatePageOptions = {}): Promise<AdvocatedResponse> {
        const paginatedResponse: AdvocatedResponse = {
            pageInfo: {
                totalCount: 0,
                count: 0,
            },
            data: [],
        };

        const cacheKey: string = `advocates:limit=${options.limit}:offset=${options.offset}:search=${options.search}`;
        const cachedData = this.cacheService.getCachedSlot<AdvocatedResponse>(cacheKey);

        // Fetch the data from cache if available
        if (cachedData && cachedData.pageInfo && cachedData.data) {
            // eslint-disable-next-line no-console
            console.log(`Cache slot found with key ${cacheKey} Fetching data from cache`);

            // TODO: Improve the typeing around this for promise based req's
            // @ts-ignore
            return cachedData as AdvocatedResponse;
        }

        const [advocates, totalCount] = this.db
            ? await this.findAndCountFromDatabase(options)
            : this.findAndCountFromStaticData(options);
        const count = advocates.length;

        // Set the paginated response to the valid response
        paginatedResponse.pageInfo.totalCount = totalCount;
        paginatedResponse.pageInfo.count = count;
        paginatedResponse.data = advocates;

        // Cache the results
        this.cacheService.setCachedSlot(cacheKey, paginatedResponse);

        return paginatedResponse;
    }

    private async findAndCountFromDatabase(
        options: AdvocatePageOptions,
    ): Promise<Tuple<Advocate[], number>> {
        const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET, search } = options;
        const pageData: Tuple<Advocate[], number> = [[], 0];

        const whereClause = search
            ? sql`
                CONCAT(${advocates.firstName}, ' ', ${advocates.lastName}) LIKE '%' || ${search} || '%' OR
                ${advocates.firstName} LIKE '%' || ${search} || '%' OR 
                ${advocates.lastName} LIKE '%' || ${search} || '%' OR
                ${advocates.city} LIKE '%' || ${search} || '%' OR
                ${advocates.specialties}::text LIKE '%' || ${search} || '%' OR
                ${advocates.degree} LIKE '%' || ${search} || '%'
            `
            : sql`1 = 1`; // No filter when search is undefined or empty

        const rowCountData = await this.db!.select({ totalCount: count() })
            .from(advocates)
            .where(whereClause);

        const data = await this.db!.select()
            .from(advocates)
            .limit(limit)
            .offset(offset)
            .where(whereClause)
            .orderBy(advocates.id);

        // Extract the count from the result
        pageData[0] = data;
        pageData[1] = rowCountData[0]?.totalCount || 0;

        // Return the tuple with the paginated data and total count
        return pageData;
    }

    private findAndCountFromStaticData(options: AdvocatePageOptions): Tuple<Advocate[], number> {
        const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET, search } = options;
        const pageData: Tuple<Advocate[], number> = [[], 0];

        // Filter the advocates if a search term is provided
        const advocates = search
            ? this.data.filter(
                  (advocate) =>
                      advocate.firstName.includes(search) ||
                      advocate.lastName.includes(search) ||
                      (advocate.firstName + ' ' + advocate.lastName).includes(search) ||
                      advocate.city.includes(search) ||
                      (advocate.specialties as string[]).includes(search) ||
                      advocate.degree.includes(search),
              )
            : this.data;

        // Slice the array based on the offset and limit
        pageData[0] = advocates.slice(offset, offset + limit);
        pageData[1] = advocates.length;

        // Return the tuple with the paginated data and total count
        return pageData;
    }
}
