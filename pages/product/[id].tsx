import React, { useState } from "react";
import { useRouter } from "next/router";
import { useProducts } from "../../src/hooks/useProducts";
import { useCart } from "../../src/context/CartContext";
import { formatPrice, getMainPrice } from "../../src/utils/cartHelpers";
import SuccessPopup from "../../src/components/ui/SuccessPopup";
import styles from "../../styles/ProductDetail.module.css";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import HandleMessage from "../../src/components/ui/HandleMesage";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { products, loading } = useProducts();
  const { addItem } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);

  const product = products.find((p) => p.productId === id);

  if (loading) return <HandleMessage key={0} message="Cargando..." type="info" />;
  if (!product) return <HandleMessage key={1} message="Producto no encontrado" type="error" />;

  const price = getMainPrice(product.prices);

  return (
    <>
      <div className={styles.page}>
        <button className={styles.back} onClick={() => router.back()}>
          <ArrowLeft size={20} /> {" "} Volver
        </button>

        <div className={styles.layout}>
          {/* Galería */}
          <div className={styles.gallery}>
            <img
              src={`${product.mediaUrls[selectedImg]}?width=500`}
              alt={product.displayName}
              className={styles.mainImg}
              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
            />
            <div className={styles.thumbs}>
              {product.mediaUrls.slice(0, 5).map((url, i) => (
                <img
                  key={i}
                  src={`${url}?width=80`}
                  alt={`Vista ${i + 1}`}
                  className={`${styles.thumb} ${selectedImg === i ? styles.active : ""}`}
                  onClick={() => setSelectedImg(i)}
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className={styles.info}>
            {product.badges?.[0] && (
              <span className={styles.badge}>{product.badges[0].value}</span>
            )}
            <p className={styles.brand}>{product.brand}</p>
            <h1 className={styles.name}>{product.displayName}</h1>
            {product.model && <p className={styles.model}>Modelo: {product.model}</p>}

            <div className={styles.priceBox}>
              <span className={styles.price}>{formatPrice(price)}</span>
              <span className={styles.unit}>/ {product.prices[0]?.unit}</span>
            </div>

            {product.rating && (
              <p className={styles.rating}>
                <Star size={16} color="#f5a623" />{" "}
                 {parseFloat(product.rating).toFixed(1)}{" "}
                {product.totalReviews && `(${product.totalReviews} reseñas)`}
              </p>
            )}

            {product.highlights.length > 0 && (
              <div className={styles.highlights}>
                <h3>Especificaciones</h3>
                {product.highlights.map((h) => (
                  <div key={h.key} className={styles.spec}>
                    <span className={styles.specKey}>{h.key}</span>
                    <span>{h.value}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              className={styles.addBtn}
              onClick={() => { addItem(product); setShowPopup(true); }}
            >
              <ShoppingCart size={18} /> {" "}
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <SuccessPopup
          message={`¡${product.displayName} agregado al carrito!`}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}