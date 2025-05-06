document.addEventListener("DOMContentLoaded", () => {
    const cartItemsDiv = document.getElementById("cart-items");
    const checkoutBtn = document.getElementById("checkout-btn");
    const cartCount = document.getElementById("cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    async function fetchCart() {
        const response = await fetch("http://localhost:3000/api/cart");
        const cart = await response.json();
        return cart;
    }

    async function displayCart() {
        const cart = await fetchCart();
        cartItemsDiv.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image_url}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;
            cartItemsDiv.appendChild(cartItem);
        });

        document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;
        updateCartCount(cart);
    }

    function updateCartCount(cart) {
        const count = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCount.textContent = count;
    }

    function removeItem(event) {
        if (event.target.classList.contains("remove-btn")) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
        }
    }


    cartItemsDiv.addEventListener("click", async event => {
        if (event.target.classList.contains("remove-btn")) {
            const productId = event.target.dataset.id;

            await fetch(`http://localhost:3000/api/cart/${productId}`, {
                method: "DELETE",
            });

            displayCart();
        }
    });


    cartItemsDiv.addEventListener("click", removeItem);
    displayCart();
});
