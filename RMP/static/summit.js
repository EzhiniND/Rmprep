document.addEventListener('DOMContentLoaded', function () {
    const cartProducts = getCartProductsFromStorage();
    const cartTotal = getCartTotalFromStorage();

    // Check if there are items in the cart
    if (cartProducts.length > 0) {
        // Build the email message
        const subject = 'New Order';
        let message = `New Order\n\nPersonal Details:\nName: ${name}\nAddress: ${address}\nPhone Number: ${phone_number}\n\nCart Details:`;

        cartProducts.forEach(product => {
            message += `\nProduct: ${product.name} - Quantity: ${product.quantity} - Total: Rs.${product.totalAmount}`;
        });

        message += `\n\nTotal: Rs.${cartTotal}`;

        // Send the email and get the result
        sendMail(subject, message, cartProducts, cartTotal);
    }
});

function sendMail(subject, message, cartProducts, cartTotal) {
    // Use fetch() to make an AJAX request to the Django view
    fetch('/send_order_email/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),  // Include CSRF token if you're using it
        },
        body: JSON.stringify({
            subject: subject,
            message: message,
            cartProducts: cartProducts,
            cartTotal: cartTotal,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Email sent successfully');
        } else {
            console.error('Email sending failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getCSRFToken() {
    // Function to retrieve the CSRF token from cookies
    const csrfCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
}
