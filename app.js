
//url = 'https://fakestoreapi.com/products/'
let cart = [];

async function fetchData() {
  try {
    const response = await fetch('https://fakestoreapi.com/products/');
    const data = await response.json();
    console.log(data);

    displayData(data);

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error.message);
  }
}

function displayData(data) {
  let resultElement = document.getElementById('result');
  resultElement.innerHTML = '';

  data.forEach(product => {
    let container = document.createElement('div');
    container.classList.add('productList');

    // Pictures
    let imgElement = document.createElement('img');
    imgElement.src = product.image;
    imgElement.alt = product.title;
    container.appendChild(imgElement);

    // Button
    let buyButton = document.createElement('button');
    buyButton.textContent = 'Buy';
    buyButton.addEventListener('click', () => addToCart(product));
    container.appendChild(buyButton);

    // Product list
    let paragraph = document.createElement('p');
    paragraph.innerHTML = `${product.title}<br><strong><br>Price:</strong> ${product.price}$<br>`;
    container.appendChild(paragraph);
    resultElement.appendChild(container);
  });
}

// Cart

let cartCount = document.getElementById('cartCount')

// add to the cart
function addToCart(product) {
  cart.push(product);
  updateCart();
  alert(`You have added ${product.title} to the Cart`);

}
// added products to the cart
function updateCart() {
  let cartProductCount = document.getElementById('cartContent');
  cartProductCount.innerHTML = ''

  cart.forEach((product, index) => {
    let orderedProduct = document.createElement('div')
    orderedProduct.innerHTML = `${index + 1}.${product.title} - ${product.price}$`
    cartProductCount.appendChild(orderedProduct)
  })

  let totalElement = document.getElementById('total')
  let totalPrice = cart.reduce((acc, product) => acc + product.price, 0)
  totalElement.textContent = `Total: ${totalPrice}$`
}

// remove product
let buttonMinus = document.createElement('button')
buttonMinus.innerHTML = 'Delete'
buttonMinus.setAttribute('id', 'minus')
buttonMinus.setAttribute('value', '+')
cartCount.appendChild(buttonMinus)

buttonMinus.addEventListener('click', () => {
  cart.pop()
  updateCart()
})

//order button
let orderButton = document.createElement('button')
orderButton.innerHTML = 'Order'
orderButton.setAttribute('id', 'order')
cartCount.appendChild(orderButton)

orderButton.addEventListener('click',() => {
  if (cart.length === 0) {
    alert(`Your cart is empty, please add items to your cart`)
  } else {
    let totalPrice = cart.reduce((acc, product) => acc + product.price, 0)
    alert(`Your order amounting ${totalPrice}$ will be delivered soon. Please check your email for confirmation letter and order tracking number. Thank you for shopping with us!`)
    cart = []
    updateCart()
  }
})

fetchData();














  //background-color: #182CD4;
