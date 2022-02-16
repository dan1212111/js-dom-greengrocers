const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "veg",
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "veg",
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "veg",
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "veg",
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "veg",
    },
  ],
  cart: [],
}

// getting id for renderShopItem
const storeList = document.getElementById("store")
document.getElementsByTagName("ul")[0].setAttribute("id", "ulShopList")
const ulStoreList = document.getElementById("ulShopList")
console.log(ulStoreList)

// creating store inventory
const createShopItem = (shopList) => {
  console.log(shopList)
  renderShopItems(shopList)
}

function renderShopItems(shopList) {
  for (let i = 0; i < shopList.length; i++) {
    const li = document.createElement("li")
    const div = document.createElement("div")
    div.classList = ".store--item-icon"
    const img = document.createElement("img")
    img.setAttribute("src", `assets/icons/${shopList[i].id}.svg`)
    img.setAttribute("alt", shopList[i].name)
    div.append(img)
    const button = document.createElement("button")
    const buttonText = document.createTextNode("Add to cart")
    button.append(buttonText)
    const div2 = document.createElement("div")
    div2.classList = ".filterFruit"
    const buttonFilterFruit = document.createElement("button")
    const buttonFilterFruitText = document.createTextNode("FRUIT")
    buttonFilterFruit.append(buttonFilterFruitText)
    div2.append(buttonFilterFruit)
    const div3 = document.createElement("div")
    div3.classList = ".filterVeg"
    div3.append(buttonFilterFruit)
    const buttonFilterVeg = document.createElement("button")
    const buttonFilterVegText = document.createTextNode("Veg")
    buttonFilterVeg.append(buttonFilterVegText)
    div3.append(buttonFilterVeg)
    const div4 = document.createElement("div")
    div4.classList = ".filterBoth"
    div4.append(buttonFilterFruit)
    const buttonFilterBoth = document.createElement("button")
    const buttonFilterBothText = document.createTextNode("Both")
    buttonFilterBoth.append(buttonFilterBothText)
    div4.append(buttonFilterBoth)

    li.append(div, button, div2, div3, div4)
    ulStoreList.append(li)

    // adding event listener add item to basket
    button.addEventListener("click", () => {
      addCartItemToState(shopList[i])
    })

    buttonFilterFruit.addEventListener("click", () => {
      filterFruit(state.items)
    })
    buttonFilterVeg.addEventListener("click", () => {
      filterVeg(state.items)
    })
    buttonFilterBoth.addEventListener("click", () => {
      filterBoth(state.items)
    })

    function filterFruit(fruit) {
      ulStoreList.innerHTML = ""
      let fruitType = fruit.filter((item) => item.type === "fruit")
      console.log(fruitType)
      renderShopItems(fruitType)
    }
    function filterVeg(veg) {
      ulStoreList.innerHTML = ""
      let vegType = veg.filter((item) => item.type === "veg")
      console.log(vegType)
      renderShopItems(vegType)
    }
    function filterBoth(both) {
      ulStoreList.innerHTML = ""
      renderShopItems(both)
    }
  }
}

createShopItem(state.items)

/************** Your Cart Section  ******************/

// getting id for renderCartItem
const cartItem = document.getElementById("cart--item-list")
const carListItems = document.getElementById("cart--item-list-container")

// Top-level render function - clears UI and then re-renders the page based on state
function render() {
  clear()
  renderItemsList()
}

function clear() {
  cartItem.innerHTML = ""
}

function renderItemsList() {
  for (const item of state.cart) {
    renderCart(item)
  }
}

const addCartItemToState = (selectedItem) => {
  const quantity = 1

  const stateItem = {
    id: selectedItem.id,
    name: selectedItem.name,
    price: selectedItem.price,
    quantity: quantity,
  }

  addQuantity(stateItem)
  addSumTotal()
  render()
  console.log(state.cart)

  return
}

function addQuantity(selectedItem) {
  for (const cartItem of state.cart) {
    if (cartItem.id === selectedItem.id) {
      cartItem.quantity = cartItem.quantity + 1
      addSumTotal()
      render()
      return
    }
  }
  state.cart.push(selectedItem)
  render()
}

function decreaseQuantity(selectedItem) {
  for (const cartItem of state.cart) {
    if (cartItem.id === selectedItem.id) {
      if (cartItem.quantity < 2) {
        remove(selectedItem)
      }
      cartItem.quantity = cartItem.quantity - 1
      addSumTotal()
      render()
      return
    }
  }
  state.cart.push(selectedItem)
  render()
}

function remove(selectedItem) {
  for (let i = 0; i < state.cart.length; i++) {
    if (state.cart[i] === selectedItem) {
      state.cart.splice(i, 1)
    }
  }
  render()
}

function renderCart(selectedItem) {
  const li = document.createElement("li")
  const img = document.createElement("img")
  img.classList = "cart--item-icon"
  img.setAttribute("src", `assets/icons/${selectedItem.id}.svg`)
  img.setAttribute("alt", selectedItem.name)
  const P = document.createElement("P")
  const name = document.createTextNode(selectedItem.name)
  P.append(name)
  const button = document.createElement("button")
  button.classList = "quantity-btn remove-btn center"
  const buttonText = document.createTextNode("-")
  button.append(buttonText)
  const span = document.createElement("span")
  span.classList = "quantity-text center"
  const spanText = document.createTextNode(selectedItem.quantity)
  span.append(spanText)
  const button2 = document.createElement("button")
  button2.classList = "quantity-btn add-btn center"
  const button2Text = document.createTextNode("+")
  button2.append(button2Text)

  button.addEventListener("click", () => {
    decreaseQuantity(selectedItem)
  })
  button2.addEventListener("click", () => {
    addQuantity(selectedItem)
  })

  li.append(img, P, button, span, button2)
  cartItem.append(li)
}

function addSumTotal() {
  let totalPrice = 0
  let itemQuantity = 0
  for (const itemSum of state.cart) {
    itemQuantity = itemSum.quantity + itemQuantity
    totalPrice = itemSum.price * itemQuantity + totalPrice
  }
  renderSumTotal(totalPrice.toFixed(2))
}

function renderSumTotal(totalPrice) {
  const totalSum = document.querySelector("#Total-number-sum")
  totalSum.innerHTML = ""
  const spanText = document.createTextNode(`£${totalPrice}`)
  totalSum.append(spanText)
}
