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
        const selectedOption = ticketCategory.options[ticketCategory.selectedIndex];
        const price = parseInt(selectedOption.getAttribute('data-price')) || 0;
        const quantity = parseInt(quantityInput.value) || 1;
        const total = price * quantity;
        totalPrice.textContent = total.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
        let selectedAmount = price;
        let selectedQuantity = quantity;
        
        localStorage.setItem("ticketAmount", selectedAmount);
        localStorage.setItem("ticketQuantity", selectedQuantity);

        // Set hidden input value to the price for backend processing
        ticketPriceInput.value = total;
    }

    ticketCategory.addEventListener('change', updateTotalPrice);
    quantityInput.addEventListener('input', updateTotalPrice);

    updateTotalPrice();


window.onload = function() {
    let savedAmount = localStorage.getItem("ticketAmount");
    let savedQuantity = localStorage.getItem("ticketQuantity");
    
    if (savedAmount && savedQuantity) {
        document.querySelector("select[name='ticket_category']").value = savedAmount;
        document.querySelector("input[name='quantity']").value = savedQuantity;
        updateTotalPrice();
    }
};

    // Back-to-top button logic
    const backToTopButton = document.querySelector('#back-to-top');
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
});