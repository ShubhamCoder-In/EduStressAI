// create-structure.js
import fs from "fs";
import path from "path";
import os from "os";

const projectRoot = path.join(process.cwd(), "ecommerce-store");

// Define the structure
const structure = {
  backend: {
    "package.json": "",
    "server.js": "",
    ".env.example": "",
    models: {
      "Product.js": "",
      "Order.js": "",
    },
    routes: {
      "productRoutes.js": "",
      "orderRoutes.js": "",
      "paymentRoutes.js": "",
    },
    "seed.js": "",
  },
  frontend: {
    "package.json": "",
    "index.html": "",
    "vite.config.js": "",
    src: {
      "main.jsx": "",
      "App.jsx": "",
      api: {
        "axios.js": "",
      },
      context: {
        "CartContext.jsx": "",
      },
      pages: {
        "Home.jsx": "",
        "ProductPage.jsx": "",
        "CartPage.jsx": "",
        "Checkout.jsx": "",
      },
      components: {
        "ProductCard.jsx": "",
      },
    },
  },
};

// Recursive function to create folders and files
function createStructure(base, obj) {
  for (const key in obj) {
    const targetPath = path.join(base, key);

    if (typeof obj[key] === "string") {
      // Create file
      fs.writeFileSync(targetPath, obj[key] + os.EOL, { flag: "w" });
      console.log(`Created file: ${targetPath}`);
    } else {
      // Create folder
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
        console.log(`Created folder: ${targetPath}`);
      }
      createStructure(targetPath, obj[key]);
    }
  }
}

// Run
if (!fs.existsSync(projectRoot)) {
  fs.mkdirSync(projectRoot);
}
createStructure(projectRoot, structure);

console.log("✅ Project structure created successfully!");
