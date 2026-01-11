import axios from "axios";
import { Product } from "../types/product";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(
      `${API_URL}/api/products/featured`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
