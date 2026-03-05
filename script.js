// Fetch products from Fake Store API
const container = document.getElementById("product-container");
const modal = document.getElementById("product-modal");
const closeModal = document.getElementById("close-modal");

const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title.substring(0, 30)}...</h3>
        <p>$${product.price}</p>
      `;

      // Show product details on click
      card.addEventListener("click", () => {
        modalImage.src = product.image;
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;
        modalPrice.textContent = `Price: $${product.price}`;
        modal.style.display = "block";
      });

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

fetchProducts();