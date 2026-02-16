const BASE_URL = 'http://localhost:3000';

// Search products
const productService = {
    async getProducts() {
        try {
            const response = await fetch(`${BASE_URL}/products`);

            if(!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            return await response.json();
        } catch(error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    } 
}

export default productService;