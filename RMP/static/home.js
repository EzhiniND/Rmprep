const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const productContainer = button.closest('.products-container');
        const productName = productContainer.querySelector('h3').innerText;
        const productPriceElement = productContainer.querySelector('h5');
        const productPriceText = productPriceElement.innerText.trim();
        const productPrice = parseFloat(productPriceText.replace('Rs.', ''));
        const quantity = parseInt(productContainer.querySelector('.cart-quantity').value);

        if (quantity > 0) {
            const totalAmount = quantity * productPrice;

            // Retrieve the existing cart or initialize a new one
            let cartProducts = JSON.parse(sessionStorage.getItem('cartProducts') || '[]');

            // Check if the product is already in the cart
            const existingProductIndex = cartProducts.findIndex(product => product.name === productName);

            if (existingProductIndex !== -1) {
                // If the product is already in the cart, update its quantity
                cartProducts[existingProductIndex].quantity += quantity;
                cartProducts[existingProductIndex].totalAmount += totalAmount;
            } else {
                // If the product is not in the cart, add it
                const productDetails = {
                    name: productName,
                    quantity: quantity,
                    totalAmount: totalAmount,
                };
                cartProducts.push(productDetails);
            }

            // Update the total cart value
            let totalCartValue = 0;
            cartProducts.forEach(product => {
                totalCartValue += product.totalAmount;
            });

            // Store the updated cartProducts array and total cart value in sessionStorage
            sessionStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            sessionStorage.setItem('cartTotal', totalCartValue.toFixed(2));

            // Retrieve the cart total from session storage
            const retrievedCartTotal = parseFloat(sessionStorage.getItem('cartTotal')) || 0;
            console.log(retrievedCartTotal);  // Do something with the cart total
        }
    });
});
