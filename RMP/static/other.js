window.onload = function () {
    showCartProducts();
    const orderForm = document.getElementById('orderForm');

    if (orderForm) {
        orderForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get personal details from the form
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const phoneNumber = document.getElementById('phoneNumber').value;

            // Get cart details from session storage
            const cartProducts = JSON.parse(sessionStorage.getItem('cartProducts')) || [];
            const cartTotal = parseFloat(sessionStorage.getItem('cartTotal')) || 0;

            // Update the hidden input in the form with cart details
            const cartDetailsInput = document.getElementById('cartDetails');
            cartDetailsInput.value = JSON.stringify({ products: cartProducts, total: cartTotal });

            // Clear the cart container
            clearCartContainer();

            // Submit the form
            orderForm.submit();
        });
    }

    const closeCartButton = document.querySelector('.close-cart-btn');
    if (closeCartButton) {
        closeCartButton.addEventListener('click', function () {
            clearCartContainer();
        });
    }
};

function clearCartContainer() {
    const cartProductsContainer = document.querySelector('.cart-products');
    const cartTotalContainer = document.querySelector('.cart-total');

    // Clear the content of the cart container
    cartProductsContainer.innerHTML = '';
    cartTotalContainer.innerHTML = '';

    // Clear session storage
    sessionStorage.removeItem('cartProducts');
    sessionStorage.removeItem('cartTotal');
}

function showCartProducts() {
    let cartProducts = sessionStorage.getItem('cartProducts');

    if (cartProducts) {
        cartProducts = JSON.parse(cartProducts);

        const cartProductsContainer = document.querySelector('.cart-products');
        const cartTotalContainer = document.querySelector('.cart-total');

        // Clear the existing content in the cart container
        cartProductsContainer.innerHTML = '';
        cartTotalContainer.innerHTML = '';

        let totalAmount = 0;

        // Display each product in the cart
        cartProducts.forEach((cartProduct) => {
            const cartProductElement = document.createElement('div');
            cartProductElement.innerHTML = `<p>${cartProduct.name} - Quantity: ${cartProduct.quantity} - Total: Rs.${cartProduct.totalAmount.toFixed(2)}</p>`;
            cartProductsContainer.appendChild(cartProductElement);

            totalAmount += cartProduct.totalAmount;
        });

        // Display overall cart amount
        const cartTotalElement = document.createElement('div');
        cartTotalElement.innerHTML = `Cart Total: Rs.${totalAmount.toFixed(2)}`;
        cartTotalContainer.appendChild(cartTotalElement);
    }
}
