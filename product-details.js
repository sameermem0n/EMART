document.addEventListener('DOMContentLoaded', () => {
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);

    // Fetch product data from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            // Find the product by ID
            const product = products.find(p => p.id === productId);

            if (product) {
                // Populate product details
                document.getElementById('product-image').src = product.image;
                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-price').textContent = `$${product.price}`;
                document.getElementById('product-category').textContent = `Category: ${product.category}`;
                document.getElementById('Specifications').textContent = product.Specifications;
                document.getElementById('product-rating').textContent = `⭐ ${product.rating}`;
                

                // Add to cart functionality
                document.getElementById('add-to-cart').addEventListener('click', () => {
                    alert(`${product.name} has been added to your cart!`);
                });
            } else {
                // If product not found
                alert('Product not found!');
            }
        })
        .catch(error => console.error('Error loading product data:', error));
});
