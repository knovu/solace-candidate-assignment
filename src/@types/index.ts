import { advocates } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export interface Config {
    connectToDatabase?: boolean;
    cache: {
        ttl: number;
    };
    db: {
        host: string;
        database: string;
        user: string;
        pass: string;
    };
}

export interface PageOptions {
    limit?: number;
    offset?: number;
    search?: string;
}

export interface PageInfo {
    totalCount: number;
    count: number;
}

export interface PageResponse<TData extends any> {
    pageInfo: PageInfo;
    data: TData[];
}

export type Tuple<T = any, K = any> = [T, K];

export interface Advocate extends InferSelectModel<typeof advocates> {}

export interface AdvocatePageOptions extends PageOptions {}

export interface AdvocatedResponse extends PageResponse<Advocate> {}
