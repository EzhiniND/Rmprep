function showNavbar() {
    const sideNavbar = document.querySelector('.side-navbar');
    sideNavbar.style.width = '250px'; // Adjust the width as needed
}

function closeNavbar() {
    const sideNavbar = document.querySelector('.side-navbar');
    sideNavbar.style.width = '0';
}


let cartamount = 0;

function showCartProducts() {
    // Reset cart amount
    cartamount = 0;

    const productContainers = document.querySelectorAll('.products-container');
    const cartProductsContainer = document.querySelector('.cart-products');
    const cartAmountElement = document.querySelector('.cart-amount');

    // Clear the cart products
    cartProductsContainer.innerHTML = '';

    productContainers.forEach((container) => {
        const quantityInput = container.querySelector('.cart-quantity');
        const productName = container.querySelector('h3').innerText;
        const productPriceElement = container.querySelector('h5');
        const productPriceText = productPriceElement.innerText.trim();
        const productPrice = parseFloat(productPriceText.replace('Rs.', ''));
        const quantity = parseInt(quantityInput.value);

        if (quantity > 0) {
            const totalAmount = quantity * productPrice;

            const cartProduct = document.createElement('div');
            cartProduct.innerHTML = `<p>${productName} - Quantity: ${quantity} - Total: Rs.${totalAmount.toFixed(2)}</p>`;
            cartProductsContainer.appendChild(cartProduct);

            cartamount += totalAmount;
        }
    });

    // Update the cart amount element
    cartAmountElement.innerHTML = `<p>Total Cart Amount: Rs.${cartamount.toFixed(2)}</p>`;
}

// Add event listener to the "Add Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach((button) => {
    button.addEventListener('click', showCartProducts);
});
