import React from "react";
import { useRouter } from "next/router";
import { useCart } from "../src/context/CartContext";
import { formatPrice, getMainPrice, downloadCartJSON } from "../src/utils/cartHelpers";
import styles from "../styles/Cart.module.css";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

export default function Cart() {
  const router = useRouter();
  const { state, removeItem, increaseQty, decreaseQty } = useCart();
  const { items } = state;

  const total = items.reduce((sum, item) => {
    return sum + getMainPrice(item.product.prices) * item.quantity;
  }, 0);

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.bold}><ShoppingCart size={18} /> {" "} Tu carrito está vacío</p>
        <button onClick={() => router.push("/")}>Ver productos</button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Mi Carrito</h2>

      <div className={styles.layout}>
        <div className={styles.items}>
          {items.map(({ product, quantity }) => {
            const unitPrice = getMainPrice(product.prices);
            return (
              <div key={product.productId} className={styles.item}>
                <img
                  src={`${product.mediaUrls[0]}?width=100`}
                  alt={product.displayName}
                  className={styles.img}
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
                />
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{product.displayName}</p>
                  <p className={styles.itemPrice}>{formatPrice(unitPrice)} / und</p>
                </div>
                <div className={styles.qtyBox}>
                  <button onClick={() => decreaseQty(product.productId)}><Minus size={16} /></button>
                  <span>{quantity}</span>
                  <button onClick={() => increaseQty(product.productId)}><Plus size={16} /></button>
                </div>
                <p className={styles.subtotal}>{formatPrice(unitPrice * quantity)}</p>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeItem(product.productId)}
                >
                  <Trash2 size={20} /> 
                </button>
              </div>
            );
          })}
        </div>

        <div className={styles.summary}>
          <h3>Resumen</h3>
          <div className={styles.summaryRow}>
            <span>Productos ({items.reduce((s, i) => s + i.quantity, 0)})</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <strong>Total</strong>
            <strong>{formatPrice(total)}</strong>
          </div>
          <button
            className={styles.checkoutBtn}
            onClick={() => downloadCartJSON(items)}
          >
            Finalizar compra
          </button>
          <button className={styles.backBtn} onClick={() => router.push("/")}>
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  );
}