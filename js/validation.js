import { z } from 'zod';

export const LIMITS = {
    MIN_PRICE: 0.50,
    MAX_PRICE: 999999.99,
    MAX_FILE_SIZE: 2 * 1024 * 1024
};

export const productSchema = z.object({
    title: z.string()
        .min(3, "Title is too short (minimum 3 characters)")
        .max(100, "Title cannot exceed 100 characters"),
    description: z.string()
        .min(10, "Description is too short (minimum 10 characters)"),
    price: z.number()
        .min(LIMITS.MIN_PRICE, `Price must be at least $${LIMITS.MIN_PRICE.toFixed(2)}`)
        .max(LIMITS.MAX_PRICE, `Price cannot exceed $${LIMITS.MAX_PRICE}`),
    image: z.any()
        .refine((file) => !file || file.size <= LIMITS.MAX_FILE_SIZE, "Image size must be less than 2MB")
});