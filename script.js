// script.js

// Datos de productos (puedes modificarlos según sea necesario)
const products = {
    labiales: [
        { id: 1, name: "lip gloss anik Diva", price: 21.000, image: "C:\Users\valery\liva\programas\sitio web\imagenes", available: true },
        { id: 1, name: "lip gloss anik kim", price: 21.000, image: "C:\Users\valery\liva\programas\sitio web\imagenes", available: true },
        { id: 2, name: "lip gloss anik angel", price: 21.000, image: "C:\Users\valery\liva\programas\sitio web\imagenes", available: false }
    ],
    cejas: [
        { id: 3, name: "gel melu", price: 20.000, image: "C:\Users\valery\liva\programas\sitio web\imagenes", available: true }
    ],
    bases: [
        { id: 4, name: "Base Matte", price: 25, image: "base.jpg", available: true }
    ]
};

// Mostrar productos en las pestañas
function loadProducts(category) {
    const container = document.getElementById(category);
    const productList = products[category];
    container.innerHTML = "";
    productList.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="100">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <p>${product.available ? "Disponible" : "No disponible"}</p>
            <button onclick="addToCart(${product.id}, '${category}')">Añadir al Carrito</button>
        `;
        container.appendChild(productDiv);
    });
}

// Cambiar entre pestañas
function changeTab(category) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tab-button").forEach(button => button.classList.remove("active"));
    document.getElementById(category).classList.add("active");
    document.querySelector(`[onclick="changeTab('${category}')"]`).classList.add("active");
    loadProducts(category);
}

// Cargar productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    loadProducts("labiales");
});

// Carrito de compras
let cart = [];

function addToCart(productId, category) {
    const product = products[category].find(p => p.id === productId);
    if (product.available) {
        cart.push(product);
        updateCart();
    } else {
        alert("Este producto no está disponible.");
    }
}

function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price}</p>
        `;
        cartContainer.appendChild(itemDiv);
    });
}

// Finalizar pedido
function checkout() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const paymentMethod = prompt("Seleccione el método de pago (efectivo/transferencia):");
    const address = prompt("Ingrese su dirección de envío:");
    const message = `Pedido: ${cart.map(item => item.name).join(", ")}\nMonto: $${total}\nMétodo de pago: ${paymentMethod}\nDirección: ${address}`;
    window.open(`https://wa.me/+573226432568?text=${encodeURIComponent(message)}`, "_blank");
}