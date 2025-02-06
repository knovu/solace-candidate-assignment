import { config } from '@/lib';

export interface CacheSlot {
    data: any;
    timeout: NodeJS.Timeout;
}

export interface ICacheService {
    getCachedSlot<TData extends any>(key: string): TData | undefined;
    setCachedSlot<TData extends any>(key: string, data: TData): void;
}

export class CacheService implements ICacheService {
    private readonly CACHE_TTL: number = config.cache.ttl; // Controls the TTL for the cache slots
    private readonly cache = new Map<string, CacheSlot>();

    constructor() {
        // eslint-disable-next-line no-console
        console.log('Initializing cache for data');
    }

    public getCachedSlot<TData extends any>(key: string): TData | undefined {
        const slot = this.cache.get(key);

        if (slot) {
            // eslint-disable-next-line no-console
            console.log('\x1b[94m%s\x1b[0m', `Refreshing cache slot: ${key}`);
            slot.timeout.refresh();
            return slot.data;
        }

        return undefined;
    }

    public setCachedSlot<TData extends any>(key: string, data: TData): void {
        // eslint-disable-next-line no-console
        console.log('\x1b[32m%s\x1b[0m', `Adding cache slot: ${key}`);

        this.cache.set(key, {
            data,
            timeout: setTimeout(() => {
                this.deleteCacheSlot(key);
            }, this.CACHE_TTL),
        });
    }

    private deleteCacheSlot(key: string) {
        // eslint-disable-next-line no-console
        console.log('\x1b[33m%s\x1b[0m', `Deleting cache slot: ${key}`);

        this.cache.delete(key);
    }
}
