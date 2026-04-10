import React, { useState } from "react";
import { useRouter } from "next/router";
import { Product } from "../../types/product";
import { useCart } from "../../context/CartContext";
import { formatPrice, getMainPrice } from "../../utils/cartHelpers";
import SuccessPopup from "./SuccessPopup";
import styles from "./ProductCard.module.css";
import { ShoppingCart } from "lucide-react";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const router = useRouter();
  const { addItem } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const price = getMainPrice(product.prices);
  const imageUrl = product.mediaUrls?.[0]
    ? `${product.mediaUrls[0]}?width=300`
    : "/placeholder.png";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setShowPopup(true);
  };

  return (
    <>
      <div className={styles.card} onClick={() => router.push(`/product/${product.productId}`)}>
        {product.badges?.[0] && (
          <span className={styles.badge}>{product.badges[0].value}</span>
        )}
        <img
          src={imageUrl}
          alt={product.displayName}
          className={styles.image}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.png";
          }}
        />
        <div className={styles.body}>
          <p className={styles.brand}>{product.brand}</p>
          <h3 className={styles.name}>{product.displayName}</h3>
          <p className={styles.price}>{formatPrice(price)}</p>
          <p className={styles.unit}>/ {product.prices[0]?.unit}</p>
        </div>
        <button className={styles.btn} onClick={handleAddToCart}>
          <ShoppingCart size={18} /> {" "}
          Agregar al carrito
        </button>
      </div>

      {showPopup && (
        <SuccessPopup
          message={`¡${product.displayName} agregado al carrito exitosamente!`}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default ProductCard;