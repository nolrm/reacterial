// service/productService.ts

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  sku: string;
}

// Fetch all products
export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products; // Adjust if necessary based on the response structure
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Search products by keyword
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products; // Adjust if necessary based on the response structure
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};
