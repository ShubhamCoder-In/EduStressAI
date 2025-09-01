// import React from "react";

// Product Card Component
const ProductCard = ({ product}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
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

const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High quality wireless headphones with noise cancellation.",
      price: 99.99,
      image:
        "https://images.unsplash.com/photo-1518444022878-5b3a229e2ad1?w=400",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Track your fitness and stay connected on the go.",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1606813908530-9b4c0a76fd9a?w=400",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Track your fitness and stay connected on the go.",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1606813908530-9b4c0a76fd9a?w=400",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Track your fitness and stay connected on the go.",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1606813908530-9b4c0a76fd9a?w=400",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Track your fitness and stay connected on the go.",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1606813908530-9b4c0a76fd9a?w=400",
    },
    {
      id: 3,
      name: "DSLR Camera",
      description: "Capture stunning photos with this professional camera.",
      price: 499.99,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    },
    {
      id: 3,
      name: "DSLR Camera",
      description: "Capture stunning photos with this professional camera.",
      price: 499.99,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    },
    {
      id: 3,
      name: "DSLR Camera",
      description: "Capture stunning photos with this professional camera.",
      price: 499.99,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    },
    {
      id: 3,
      name: "DSLR Camera",
      description: "Capture stunning photos with this professional camera.",
      price: 499.99,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    },
  ];

// Product List Component
const ProductList = () => {
  

  return (
    <div className="w-screen p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
{products.map((products) => (
<ProductCard key={products.id} product={products} />
))}
</div>
  )
};


export default ProductList;
