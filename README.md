# 🛒 Sodimac Shop - SPA React (Next.js)

Aplicación web SPA desarrollada con React y Next.js que permite visualizar productos, consultar su detalle y gestionar un carrito de compras.

---

## 🚀 Demo

> Link en Vercel

---

## 🧰 Tecnologías utilizadas

* ⚛️ React
* ▲ Next.js
* 🟦 TypeScript
* 📦 pnpm (gestor de paquetes)
* 🎨 CSS Modules
* 🧩 Lucide React (iconos)

---

## 📦 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPO>
cd sodimac-shop
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Ejecutar el proyecto

```bash
pnpm dev
```

La aplicación estará disponible en:

```
http://localhost:3000
```

---

## 🧩 Funcionalidades

### 🏠 Home (Listado de productos)

* Consumo de API:

  ```
  GET https://apim-dev-proxy.sodhc.co/test-jasson/api/category
  ```
* Visualización en cards:

  * Imagen del producto
  * Nombre
  * Precio
* Botón para agregar al carrito
* Popup de confirmación al agregar producto

---

### 📄 Detalle de producto

* Navegación desde la card
* Información detallada del producto
* Botón para agregar al carrito
* Botón para regresar

---

### 🛒 Carrito de compras

* Listado de productos agregados
* Manejo de cantidades:

  * Incrementar
  * Disminuir
* Eliminación de productos
* Cálculo de:

  * Precio unitario
  * Precio total
* Botón de finalizar compra:

  * Genera archivo JSON con:

    * Producto
    * Cantidad
    * Precio unitario
    * Precio total

---

### 💾 Persistencia

* Uso de `localStorage` para guardar el carrito
* Recuperación automática al recargar la aplicación

---

## 🧠 Decisiones técnicas

### 📌 Manejo de estado

Se utilizó **React Context API** para:

* Centralizar la lógica del carrito
* Evitar prop drilling
* Facilitar la escalabilidad

---

### 📌 Arquitectura

Se implementó una estructura basada en separación por responsabilidades:

```
src/
 ├── components/   → Componentes reutilizables
 ├── context/      → Manejo de estado global (Cart)
 ├── hooks/        → Hooks personalizados
 ├── types/        → Tipos TypeScript
 ├── utils/        → Funciones auxiliares
 ├── styles/       → Estilos globales y módulos CSS
```

---

### 📌 Estilos

* Uso de **CSS Modules**
* Evita colisiones de clases
* Facilita mantenimiento

---

### 📌 Manejo de datos

* Separación de lógica en helpers (`utils`)
* Tipado fuerte con TypeScript

---

## ⚠️ Consideraciones

* Se priorizó claridad y escalabilidad del código
* La UI es responsive y funcional en diferentes dispositivos
* Se optimizó la experiencia de usuario con feedback visual (popups, iconos)

---

## 📈 Posibles mejoras

* Implementar testing (Jest / React Testing Library)
* Manejo de estados con Zustand o Redux Toolkit
* Implementar loading skeletons
* Manejo de errores en API
* Optimización de imágenes con next/image

---

## 👨‍💻 Autor

Desarrollado por **Yilmar Vega**

---

## 📄 Licencia

Este proyecto fue desarrollado como prueba técnica.
