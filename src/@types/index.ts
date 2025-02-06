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
