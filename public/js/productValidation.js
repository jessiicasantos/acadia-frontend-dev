import { z } from 'zod';
import { maskCurrency } from './utils.js';

export const LIMITS = {
    MIN_PRICE: 10,
    MAX_PRICE: 99999.99,
    MAX_FILE_SIZE: 2 * 1024 * 1024,
    ACCEPTED_IMAGE_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"]
};

export const productSchema = z.object({
    title: z.string()
        .min(3, "Title is too short (minimum 3 characters)")
        .max(100, "Title cannot exceed 100 characters"),
    description: z.string()
        .min(10, "Description is too short (minimum 10 characters)")
        .max(200, "Description cannot exceed 200 characters"),
    price: z.coerce.number({ 
        required_error: "Price is required",
        invalid_type_error: "Please, insert a price" })
        .min(LIMITS.MIN_PRICE, `Price must be at least ${maskCurrency(LIMITS.MIN_PRICE)}`)
        .max(LIMITS.MAX_PRICE, `Price cannot exceed ${maskCurrency(LIMITS.MAX_PRICE)}`),
    image: z.file({ error: "Please, insert an image" })
        .max(LIMITS.MAX_FILE_SIZE, "Image too big. File size limit: 2MB")
        .mime(LIMITS.ACCEPTED_IMAGE_TYPES, "Only image formats are allowed")
});