document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Show a confirmation dialog on form submission
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            const confirmed = confirm("Are you sure you want to proceed with this payment?");
            if (!confirmed) {
                e.preventDefault();
            }
        });
    });

    // Dynamically update Total Price
    const ticketCategory = document.getElementById('ticketCategory');
    const quantityInput = document.getElementById('quantity'); // Assuming you have a quantity input
    const totalPrice = document.getElementById('totalPrice'); // Span or input to display total
    const ticketPriceInput = document.getElementById('ticketPrice');

    function updateTotalPrice() {
        if (!ticketCategory || !quantityInput || !totalPrice || !ticketPriceInput) return;
        const selectedOption = ticketCategory.options[ticketCategory.selectedIndex];
        const price = parseInt(selectedOption.getAttribute('data-price')) || 0;
        const quantity = parseInt(quantityInput.value) || 1;
        const total = price * quantity;
        totalPrice.textContent = total.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
        localStorage.setItem("ticketCategoryValue", ticketCategory.value);
        localStorage.setItem("ticketQuantity", String(quantity));
        ticketPriceInput.value = total;
    }

    if (ticketCategory) {
        ticketCategory.addEventListener('change', updateTotalPrice);
    }
    if (quantityInput) {
        quantityInput.addEventListener('input', updateTotalPrice);
    }

    // Restore saved selections
    const savedCategory = localStorage.getItem("ticketCategoryValue");
    const savedQuantity = localStorage.getItem("ticketQuantity");
    if (savedCategory && ticketCategory) {
        ticketCategory.value = savedCategory;
    }
    if (savedQuantity && quantityInput) {
        quantityInput.value = savedQuantity;
    }
    updateTotalPrice();

    // Back-to-top button logic
    const backToTopButton = document.querySelector('#back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});