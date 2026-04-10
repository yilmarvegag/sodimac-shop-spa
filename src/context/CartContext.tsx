import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { CartItem, Product } from "../types/product";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "INCREASE_QTY"; payload: string }
  | { type: "DECREASE_QTY"; payload: string }
  | { type: "LOAD_CART"; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
  totalItems: number;
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "LOAD_CART":
      return { items: action.payload };

    case "ADD_ITEM": {
      const exists = state.items.find(
        (i) => i.product.productId === action.payload.productId
      );
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.product.productId === action.payload.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { product: action.payload, quantity: 1 }] };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (i) => i.product.productId !== action.payload
        ),
      };

    case "INCREASE_QTY":
      return {
        items: state.items.map((i) =>
          i.product.productId === action.payload
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };

    case "DECREASE_QTY":
      return {
        items: state.items
          .map((i) =>
            i.product.productId === action.payload
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType>({} as CartContextType);
const STORAGE_KEY = "sodimac_cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(saved) });
      }
    } catch {
      // Si hay error al parsear, se ignora y se inicia con carrito vacío
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product) =>
    dispatch({ type: "ADD_ITEM", payload: product });

  const removeItem = (productId: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: productId });

  const increaseQty = (productId: string) =>
    dispatch({ type: "INCREASE_QTY", payload: productId });

  const decreaseQty = (productId: string) =>
    dispatch({ type: "DECREASE_QTY", payload: productId });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, increaseQty, decreaseQty, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);