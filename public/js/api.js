const productService = {
    // Get products
    async getProducts() {
        try {
            const response = await fetch(`/products`);

            if(!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return await response.json();
        } catch(error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Create new product
    async createProduct(productData) {
        try {
            const response = await fetch(`/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if(!response.ok) throw new Error('Failed to create product');
            return await response.json();
        } catch(error) {
            console.error('Error in createProduct: ', error);
            throw error;
        }
    }
};

export default productService;