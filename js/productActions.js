import productService from './api.js';
import { fileToBase64 } from './utils.js';
import { productSchema } from './validation.js';

export const handleProductSubmission = async (formData, imgFile) => {
    const rawData = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        image: imgFile
    };

    const validation = productSchema.safeParse(rawData); 

    if (!validation.success) {
        throw new Error({ 
            isValidationError: true, 
            errors: validation.error.flatten().fieldErrors 
        });
    }

    let imageBase64 = null;
    if (imgFile) {
        imageBase64 = await fileToBase64(imgFile);
    }

    const productData = {
        ...validation.data,
        image: imageBase64,
        alt: validation.data.title
    };

    return await productService.createProduct(productData);
};