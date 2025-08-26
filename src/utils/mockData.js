export const generateMockProducts = (count = 1000) => {
  const categories = ["Electronics", "Clothing", "Books", "Home", "Sports"];
  const products = [];

  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    products.push({
      id: i,
      name: `Product ${i}`,
      category,
      price: (Math.random() * 500).toFixed(2),
      stock: Math.floor(Math.random() * 100),
      status: Math.random() > 0.5 ? "Active" : "Inactive",
      image: `https://picsum.photos/seed/${i}/100/100`,
    });
  }

  return products;
};
