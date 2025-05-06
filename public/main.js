document.addEventListener("DOMContentLoaded", () => {
    initializeCart();
    updateCartCount();

    document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            const productId = event.target.dataset.id;

            if (productId) {
                await addToCart(productId);
            }
        }
    });
});

function initializeCart() {
    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
}

function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCountElement.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

async function addToCart(productId) {
    try {
        console.log("Sending productId:", productId);

        const response = await fetch("http://localhost:3000/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId }),
        });

        if (response.ok) {
            alert("Item added to cart!");
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add item to cart. Please try again.");
    }
}