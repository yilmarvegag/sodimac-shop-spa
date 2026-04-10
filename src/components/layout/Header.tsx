import { useRouter } from "next/router";
import { useCart } from "../../context/CartContext";
import styles from "./Header.module.css";
import { ShoppingBag, ShoppingCart } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.logo} onClick={() => router.push("/")}>
          <ShoppingCart size={18} /> {" "}
          Sodimac Shop
        </h1>
        <button className={styles.cartBtn} onClick={() => router.push("/cart")}>
          <span className={styles.cartIcon}><ShoppingBag size={18} /></span>
          {totalItems > 0 && (
            <span className={styles.badge}>{totalItems}</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;