document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector(".grid");

    // Fetch products from the back end
    async function fetchProducts() {
        const response = await fetch("http://localhost:3000/api/Products");
        const products = await response.json();
        return products;
    }

    // Render products dynamically
    async function renderProducts() {
        const products = await fetchProducts();
        productGrid.innerHTML = ""; // Clear existing products

        products.forEach(product => {
            const productHTML = `
                <div class="product" data-id="${product.id}">
                    <img src="${product.image_url}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>$${product.price}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            productGrid.innerHTML += productHTML;
        });

        attachAddToCartListeners();
    }

    // Add item to cart
    async function addToCart(event) {
        const productElement = event.target.closest(".product");
        const productId = productElement.dataset.id;
    
        await fetch("http://localhost:3000/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId }),
        });
    
        alert("Item added to cart!");
    }

    // Initialize
    renderProducts();
});