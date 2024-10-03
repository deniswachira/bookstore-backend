import { z } from 'zod';

export const createBookValidator = z.object({
    title: z.string(),
    author: z.string(),
    year: z.number()
});

export const updateBookValidator = z.object({
    title: z.string(),
    author: z.string(),
    year: z.number()
});