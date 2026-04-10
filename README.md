# Sodimac Shop

Aplicación web desarrollada como prueba técnica. Permite visualizar productos, consultar su detalle y gestionar un carrito de compras con persistencia local.

---

## Demo

[Shop SPA](https://sodimac-shop-spa.vercel.app/)

---

## Tecnologías

* React + Next.js
* TypeScript
* CSS Modules
* pnpm

---

## Instalación

```bash
git clone https://github.com/yilmarvegag/sodimac-shop-spa
cd sodimac-shop
pnpm install
pnpm dev
```

Aplicación disponible en:

```
http://localhost:3000
```

---

## Funcionalidades

### Listado de productos

* Consumo de API externa
* Visualización en cards
* Imagen, nombre y precio
* Opción de agregar al carrito

---

### Detalle de producto

* Navegación desde el listado
* Información ampliada
* Acción de agregar al carrito

---

### Carrito

* Visualización de productos seleccionados
* Manejo de cantidades
* Eliminación de productos
* Cálculo de totales

---

### Finalizar compra

* Generación de archivo JSON con:

  * Producto
  * Cantidad
  * Precio unitario
  * Total

---

### Persistencia

El carrito se almacena en `localStorage` y se recupera al recargar la aplicación.

---

## Decisiones técnicas

Se utilizó **Context API** para manejar el estado global del carrito, evitando prop drilling y facilitando la escalabilidad.

La estructura del proyecto se organizó separando responsabilidades:

* componentes reutilizables
* lógica de negocio
* tipado
* utilidades

Se optó por **CSS Modules** para mantener encapsulación de estilos.

---

## Consideraciones

La solución prioriza claridad en la estructura, separación de responsabilidades y una experiencia de usuario simple.

---

## Autor

Yilmar Vega
