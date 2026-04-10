import type { AppProps } from "next/app";
import { CartProvider } from "../src/context/CartContext";
import Header from "../src/components/layout/Header";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </CartProvider>
  );
}