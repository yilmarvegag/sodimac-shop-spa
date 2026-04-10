import React from "react";
import { useProducts } from "../src/hooks/useProducts";
import ProductCard from "../src/components/ui/ProductCard";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { products, loading, error } = useProducts();

  if (loading) return <div className={styles.center}>Cargando productos...</div>;
  if (error) return <div className={styles.center}>{error}</div>;

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Silla Escalera y Butacos</h2>
      <p className={styles.sub}>{products.length} productos encontrados</p>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}