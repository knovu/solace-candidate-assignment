export interface Config {
    connectToDatabase?: boolean;
    db: {
        host: string;
        database: string;
        user: string;
        pass: string;
    };
}
