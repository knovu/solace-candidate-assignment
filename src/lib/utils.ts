/**
 * Returns environment variable on the process.env object otherwise throws error
 * @throws {Error} when process.env does not have the variable set
 */
export const getEnv = (key: string): string => {
    const envVariable: string | undefined = process.env[key];

    if (!envVariable) {
        throw new Error(`${key} is not set. Did you forget to set the value in your .env file?`);
    }

    return envVariable;
};

/**
 * Returns an environment on the process.env object if it exists
 * @returns
 */
export const getOptionalEnv = (key: string, transform?: (value: string) => any): any => {
    const envVariable: string | undefined = process.env[key];

    if (envVariable && transform) {
        return transform(envVariable);
    }

    return envVariable;
};

/**
 * Converts the value to bool
 * @returns boolean
 */
export const toBool = (value?: any): boolean => {
    return value === 'true';
};
