import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../types/product";

const API_URL = "https://apim-dev-proxy.sodhc.co/test-jasson/api/category";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProducts(res.data.data.result))
      .catch(() => setError("No se pudo cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};