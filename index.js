// Select all product cards inside the list-products container
const cartItems = document.querySelectorAll('.list-products .card');
const totalPriceElement = document.querySelector('.total');

// Function to update the total price
function updateTotalPrice() {
    let totalPrice = 0;
    cartItems.forEach(item => {
        const quantityElement = item.querySelector('.quantity');
        const priceElement = item.querySelector('.unit-price');
        if (quantityElement && priceElement) {
            // Remove $ and spaces, then parse
            const quantity = parseInt(quantityElement.textContent);
            const price = parseFloat(priceElement.textContent.replace('$', '').trim());
            totalPrice += quantity * price;
        }
    });
    totalPriceElement.textContent = `${totalPrice} $`;
}

// Add event listeners to each cart item
cartItems.forEach(item => {
    const plusButton = item.querySelector('.fa-plus-circle');
    const minusButton = item.querySelector('.fa-minus-circle');
    const deleteButton = item.querySelector('.fa-trash-alt');
    const likeButton = item.querySelector('.fa-heart');
    const quantityElement = item.querySelector('.quantity');

    // Increase quantity
    plusButton.addEventListener('click', () => {
        let quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = quantity + 1;
        updateTotalPrice();
    });

    // Decrease quantity
    minusButton.addEventListener('click', () => {
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 0) {
            quantityElement.textContent = quantity - 1;
            updateTotalPrice();
        }
    });

    // Delete item
    deleteButton.addEventListener('click', () => {
        item.parentElement.parentElement.remove(); // Remove the whole card
        updateTotalPrice();
    });

    // Like item
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('liked');
    });
});

// Initial total price calculation
updateTotalPrice();