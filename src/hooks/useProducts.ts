import { useState, useEffect } from "react";
import axios from "axios";
import { ApiResponse, Product } from "../types/product";

const API_URL = "https://apim-dev-proxy.sodhc.co/test-jasson/api/category";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get<ApiResponse>(API_URL);
      setProducts(res.data?.data?.results ?? []);
    } catch {
      setError("No se pudo cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  return { products, loading, error };
};
