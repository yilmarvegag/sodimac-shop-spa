import { CartItem } from "../types/product";

// Obtiene el precio principal del producto (INTERNET > NORMAL)
export const getMainPrice = (prices: CartItem["product"]["prices"]): number => {
  const internet = prices.find((p) => p.type === "INTERNET");
  const normal = prices.find((p) => p.type === "NORMAL");
  return (internet || normal)?.priceWithoutFormatting ?? 0;
};

// Formatea a precio
export const formatPrice = (value: number): string =>
  `$${value.toLocaleString("es-CO")}`;

// Generar y descargar el archivo JSON del carrito
export const downloadCartJSON = (items: CartItem[]): void => {
  const data = items.map((item) => {
    const unitPrice = getMainPrice(item.product.prices);
    return {
      productId: item.product.productId,
      nombre: item.product.displayName,
      marca: item.product.brand,
      cantidad: item.quantity,
      precioUnitario: unitPrice,
      precioTotal: unitPrice * item.quantity,
    };
  });

  const totalCompra = data.reduce((sum, i) => sum + i.precioTotal, 0);

  const payload = {
    fecha: new Date().toISOString(),
    productos: data,
    totalCompra,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `carrito_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};