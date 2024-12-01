document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const pagination = document.getElementById('pagination');
    const cartCount = document.getElementById('cart-count');
    let products = [];
    let currentPage = 1;
    const itemsPerPage = 12;
    let cart = [];

    // Fetch products from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts();
            renderPagination();
        });
// Render products
function renderProducts() {
    productGrid.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {
        const productCard = `
            <div class="bg-white p-4 rounded shadow-md">
                <a href="product-details.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-32 object-cover">
                    <h3 class="text-lg font-bold mt-2">${product.name}</h3>
                    <p class="text-gray-600">$${product.price}</p>
                    <p class="text-yellow-500">⭐ ${product.rating}</p>
                </a>
                <button class="bg-blue-500 text-white mt-2 px-4 py-2 rounded" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforeend', productCard);
    });
}


    // Render pagination
    function renderPagination() {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = `
                <button class="px-4 py-2 border rounded ${i === currentPage ? 'bg-blue-500 text-white' : ''}" onclick="goToPage(${i})">${i}</button>
            `;
            pagination.insertAdjacentHTML('beforeend', pageButton);
        }
    }

    // Go to a specific page
    window.goToPage = (page) => {
        currentPage = page;
        renderProducts();
        renderPagination();
    };

    // Add to cart
    window.addToCart = (id) => {
        cart.push(id);
        cartCount.textContent = cart.length;
    };

    // Apply filters
    document.getElementById('apply-filters').addEventListener('click', () => {
        const category = document.getElementById('category-filter').value;
        const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
        const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

        products = products.filter(product => {
            return (
                (category ? product.category === category : true) &&
                product.price >= minPrice &&
                product.price <= maxPrice
            );
        });
        currentPage = 1;
        renderProducts();
        renderPagination();
    });
});
const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    priceRange.addEventListener('input', () => {
      priceValue.textContent = priceRange.value;
    });