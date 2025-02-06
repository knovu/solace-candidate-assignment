import { NextRequest, NextResponse } from 'next/server';
import { advocateData } from '../../../db/seed/advocates';
import { AdvocateService } from '../services';
import { DEFAULT_LIMIT, DEFAULT_OFFSET, MAX_LIMIT, MAX_OFFSET, MIN_LIMIT, MIN_OFFSET } from '@/lib';
import { AdvocatedResponse } from '@/@types';

// Create service to be used instead of on every request for performance improvements
// this could also be DI injected in an isolated Express.js/Nest.js proj
const advocateService = new AdvocateService();

interface AdvocateParams {
    limit?: number;
    offset?: number;
    search?: string;
}

const validateAdvocateParams = (params: AdvocateParams = {}): string[] => {
    const { limit, offset } = params;
    const errors: string[] = [];

    if (limit && (limit < MIN_LIMIT || limit > MAX_LIMIT)) {
        errors.push(`limit cannot exceed bounds of ${MIN_LIMIT} to ${MAX_LIMIT}`);
    }

    if (offset && (offset < MIN_OFFSET || offset > MAX_OFFSET)) {
        errors.push(`offset cannot exceed bounds of ${MIN_OFFSET} to ${MAX_OFFSET}`);
    }

    return errors;
};

export async function GET(req: NextRequest) {
    // eslint-disable-next-line no-console
    console.log('[API]: Fetching advocates...');

    const searchParams = req.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    const search = searchParams.get('search');
    const parsedLimit = limit != undefined ? parseInt(limit as string, 10) : DEFAULT_LIMIT;
    const parsedOffset = offset != undefined ? parseInt(offset as string, 10) : DEFAULT_OFFSET;
    const validationErrors = validateAdvocateParams({ limit: parsedLimit, offset: parsedOffset });

    if (validationErrors.length > 0) {
        return Response.json(
            {
                error: 'Bad Request',
                errors: validationErrors,
            },
            {
                status: 400,
            },
        );
    }

    const data: AdvocatedResponse = await advocateService.findMany({
        limit: parsedLimit,
        offset: parsedOffset,
        search: search != undefined ? search : undefined,
    });

    return NextResponse.json(data);
}
