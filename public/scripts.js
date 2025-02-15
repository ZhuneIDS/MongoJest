// public/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const productSection = document.getElementById('product-section');
    const productList = document.getElementById('product-list');

    // Manejar el envío del formulario de inicio de sesión
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
                // guardar token en localStorage
                localStorage.setItem('token', data.token);

                // esconder el formulario de inicio de sesión y mostrar la sección de productos
                loginForm.style.display = 'none';
                productSection.style.display = 'block';

                // fetch y mostrar productos
                fetchProducts();
            } else {
                loginMessage.textContent = data.message || 'Login failed';
            }
        } catch (error) {
            loginMessage.textContent = 'An error occurred. Please try again.';
        }
    });

    // fetch y mostrar productos
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
                // display productos
                productList.innerHTML = products
                //funcion flecha que recibe un producto y retorna un string
                //mapea los productos y los une con join
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