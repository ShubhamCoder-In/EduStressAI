# 🛍️ Product Card List (React + Tailwind CSS v4 + Vite)

This mini project demonstrates how to build a **component-based Product Card List** using **React.js**, **Vite**, and the latest **Tailwind CSS v4**.

---

## 📌 Features

* Reusable **ProductCard** component
* Responsive grid layout
* Tailwind CSS v4 for styling
* Hover effects and smooth transitions
* Example product data with images, descriptions, and prices

---

## 🚀 Getting Started

### 1. Create project with Vite

```bash
npm create vite@latest product-card-list
cd product-card-list
npm install
```

Select **React** or **React + TypeScript** when prompted.

### 2. Install Tailwind CSS v4

```bash
npm install -D tailwindcss@latest postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configure Tailwind

Update **tailwind.config.js**:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. Add Tailwind to CSS

In **src/index.css**:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Run the project

```bash
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

---

## 🧩 Components

### ProductCard.jsx

```jsx
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl mb-4" />
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 text-sm flex-grow">{product.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-green-600">${product.price}</span>
        <button className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
```

### ProductList.jsx

```jsx
const ProductList = () => {
  const products = [
    { id: 1, name: "Wireless Headphones", description: "High quality wireless headphones with noise cancellation.", price: 99.99, image: "https://images.unsplash.com/photo-1518444022878-5b3a229e2ad1?w=400" },
    { id: 2, name: "Smart Watch", description: "Track your fitness and stay connected on the go.", price: 149.99, image: "https://images.unsplash.com/photo-1606813908530-9b4c0a76fd9a?w=400" },
    { id: 3, name: "DSLR Camera", description: "Capture stunning photos with this professional camera.", price: 499.99, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400" }
  ];

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

### App.jsx

```jsx
import ProductList from "./ProductList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ProductList />
    </div>
  );
}

export default App;
```

---

## 🎨 Preview

The app will display a grid of product cards with images, descriptions, prices, and an **Add to Cart** button.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
