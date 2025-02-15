// public/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const productSection = document.getElementById('product-section');
    const productList = document.getElementById('product-list');

    // Handle login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save the JWT token in localStorage
                localStorage.setItem('token', data.token);

                // Hide login form and show product section
                loginForm.style.display = 'none';
                productSection.style.display = 'block';

                // Fetch and display products
                fetchProducts();
            } else {
                loginMessage.textContent = data.message || 'Login failed';
            }
        } catch (error) {
            loginMessage.textContent = 'An error occurred. Please try again.';
        }
    });

    // Fetch products from the backend
    async function fetchProducts() {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('/api/products', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const products = await response.json();

            if (response.ok) {
                // Display products
                productList.innerHTML = products
                    .map(product => `<li>${product.name} - $${product.price}</li>`)
                    .join('');
            } else {
                productList.innerHTML = '<li>Failed to load products.</li>';
            }
        } catch (error) {
            productList.innerHTML = '<li>An error occurred. Please try again.</li>';
        }
    }
});