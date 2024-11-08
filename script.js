let users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user', password: 'user123', role: 'user' }
];
let loggedInUser = null;

function register() {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;
  const role = document.getElementById('registerRole').value;

  // Agregar el usuario nuevo a la lista de usuarios
  users.push({ username, password, role });
  document.getElementById('registerSuccess').style.display = 'block';
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    loggedInUser = user;
    document.getElementById('usernameDisplay').textContent = user.username;
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('profileSection').style.display = 'block';
    document.getElementById('salesSection').style.display = 'block'; // Muestra la sección de ventas
    document.getElementById('loginSuccess').style.display = 'block';

    // Mostrar controles de administrador solo si el usuario tiene rol de "admin"
    if (user.role === 'admin') {
      document.getElementById('adminSection').style.display = 'block';
      document.querySelectorAll('.admin-controls').forEach(control => control.style.display = 'block');
    } else {
      document.getElementById('adminSection').style.display = 'none';
      document.querySelectorAll('.admin-controls').forEach(control => control.style.display = 'none');
    }
  } else {
    alert('Credenciales incorrectas');
  }
}

function logout() {
  loggedInUser = null;
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('profileSection').style.display = 'none';
  document.getElementById('loginSuccess').style.display = 'none';
  document.getElementById('salesSection').style.display = 'none';
  alert('Sesión cerrada');
}

function updateProfile() {
  const newUsername = document.getElementById('updateUsername').value;

  if (newUsername && loggedInUser) {
    // Actualizar el nombre de usuario del usuario logueado
    loggedInUser.username = newUsername;
    document.getElementById('usernameDisplay').textContent = newUsername;
    document.getElementById('profileUpdated').style.display = 'block';
  } else {
    alert('Por favor, ingresa un nombre de usuario válido');
  }
}

function addToCart(productName, price) {
  const cartList = document.getElementById('cart');
  const listItem = document.createElement('li');
  listItem.textContent = `${productName} - $${price}`;
  cartList.appendChild(listItem);

  updateTotal(price);
}

function updateTotal(price) {
  const totalElement = document.getElementById('total');
  let currentTotal = parseFloat(totalElement.textContent.replace('Total: $', ''));
  currentTotal += price;
  totalElement.textContent = `Total: $${currentTotal.toFixed(2)}`;
}

function updateInventory(productName) {
  const productElement = document.querySelector(`.product[data-name="${productName}"]`);
  const newPrice = productElement.querySelector('.new-price').value;
  const newQuantity = productElement.querySelector('.new-quantity').value;

  if (newPrice) {
    productElement.querySelector('.price').textContent = newPrice;
    productElement.setAttribute('data-price', newPrice);
  }

  if (newQuantity) {
    productElement.querySelector('.quantity').textContent = newQuantity;
    productElement.setAttribute('data-quantity', newQuantity);
  }

  alert(`Inventario actualizado para ${productName}`);
}
function completePurchase() {
  const totalElement = document.getElementById('total');
  const cartList = document.getElementById('cart');

  // Obtener el total de la compra
  const totalAmount = parseFloat(totalElement.textContent.replace('Total: $', ''));

  if (totalAmount > 0) {
    // Mensaje de confirmación
    alert(`Compra completada. Total pagado: $${totalAmount.toFixed(2)}`);

    // Vaciar el carrito y resetear el total
    cartList.innerHTML = '';
    totalElement.textContent = 'Total: $0';
  } else {
    alert('El carrito está vacío.');
  }
}
