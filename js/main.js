// =======================================
//                AÑO FOOTER
// =======================================
document.getElementById("year").textContent = new Date().getFullYear();


// =======================================
//                CARRITO
// =======================================

// 1. Cargar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cartCount");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");


// 2. Guardar carrito en localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


// 3. Agregar desde tarjetas
document.querySelectorAll(".addToCart").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    cart.push({ name, price });
    updateCart();
    saveCart(); // <-- Guardar
  });
});


// 4. Actualizar carrito visual
function updateCart() {
  cartCount.textContent = cart.length;
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${item.name} - S/ ${item.price}
      <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">X</button>
    `;
    cartList.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}


// 5. Eliminar un producto
function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
  saveCart(); // <-- Guardar
}


// 6. Vaciar carrito
document.getElementById("clearCart").onclick = () => {
  cart = [];
  updateCart();
  saveCart(); // <-- Guardar
};


// 7. Abrir modal carrito
document.getElementById("openCart").onclick = () => {
  const modal = new bootstrap.Modal(document.getElementById("cartModal"));
  modal.show();
};


// 8. Al iniciar la página: actualizar numerito y carrito visible
updateCart();



// =======================================
//     MODAL “VER PRODUCTO” AVANZADO
// =======================================

const viewTitle = document.getElementById("viewTitle");
const viewDesc = document.getElementById("viewDesc");
const viewPrice = document.getElementById("viewPrice");
const viewAddCart = document.getElementById("viewAddCart");
const carouselContent = document.getElementById("carouselContent");

let tempProduct = null;


// Activar modal con carrusel dinámico
document.querySelectorAll(".verProducto").forEach(btn => {
  btn.addEventListener("click", () => {

    const name = btn.dataset.name;
    const desc = btn.dataset.desc;
    const price = btn.dataset.price;

    const img1 = btn.dataset.img1 || null;
    const img2 = btn.dataset.img2 || null;
    const img3 = btn.dataset.img3 || null;
    const video = btn.dataset.video || null;

    // llenar modal
    viewTitle.textContent = name;
    viewDesc.textContent = desc;
    viewPrice.textContent = price;

    tempProduct = { name, price: parseFloat(price) };

    // limpiar carrusel
    carouselContent.innerHTML = "";
    let first = true;

    // IMÁGENES
    [img1, img2, img3].forEach(img => {
      if (img) {
        carouselContent.innerHTML += `
          <div class="carousel-item ${first ? 'active' : ''}">
            <img src="${img}" class="d-block w-100 rounded">
          </div>
        `;
        first = false;
      }
    });

    if (video) {
      carouselContent.innerHTML += `
        <div class="carousel-item ${first ? 'active' : ''}">
          <video class="d-block w-100 rounded" controls>
            <source src="${video}" type="video/mp4">
          </video>
        </div>
      `;
    }

    const modal = new bootstrap.Modal(document.getElementById("viewModal"));
    modal.show();
  });
});


viewAddCart.addEventListener("click", () => {
  if (tempProduct) {
    cart.push(tempProduct);
    updateCart();
    saveCart();
  }
});

document.getElementById("openCheckout").addEventListener("click", function () {
  let cartModalEl = document.getElementById('cartModal');
  let cartModal = bootstrap.Modal.getInstance(cartModalEl);
  cartModal.hide();

  let checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
  checkoutModal.show();
});

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let checkoutModalEl = document.getElementById('checkoutModal');
    let checkoutModal = bootstrap.Modal.getInstance(checkoutModalEl);
    checkoutModal.hide();

    let successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
});

document.getElementById("cardNumber").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 16);
    let formatted = value.replace(/(.{4})/g, "$1 ").trim();
    e.target.value = formatted;
});

document.getElementById("phoneNumber").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 9);

    let formatted = value.replace(/(\d{3})(?=\d)/g, "$1 ").trim();

    e.target.value = formatted;
});