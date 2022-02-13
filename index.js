const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
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
const renderShopItem = (shopList) => {
  for (let i = 0; i < shopList.length; i++) {
    console.log(shopList[i])
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

    li.append(div, button)
    ulStoreList.append(li)

    // adding event listener add item to basket
    button.addEventListener("click", () => {
      renderCartItem(shopList[i])
    })
  }
}

renderShopItem(state.items)

// getting id for renderCartItem
const carItem = document.getElementById("cart--item-list")
console.log(carItem)
const carListItems = document.getElementById("cart--item-list-container")

// rendering an item selected in the cart (UI)
const renderCartItem = (selectedItem) => {
  const li = document.createElement("li")
  const img = document.createElement("img")
  const quantity = 1


  img.classList = "cart--item-icon"
  img.setAttribute("src", `assets/icons/${selectedItem.id}.svg`)
  img.setAttribute("alt", selectedItem.name)
  const P = document.createElement("P")
  P.classList = "theItemsName"
  const name = document.createTextNode(selectedItem.name)
  P.append(name)

  const button = document.createElement("button")
  button.classList = "quantity-btn remove-btn center"
  const buttonText = document.createTextNode("-")
  button.append(buttonText)
  const span = document.createElement("span")
  span.classList = "quantity-text center"
  findItem(state.cart)
  const spanText = document.createTextNode(quantity)
  span.append(spanText)
  const button2 = document.createElement("button")
  button2.classList = "quantity-btn add-btn center"
  const button2Text = document.createTextNode("+")
  button2.append(button2Text)

  li.append(img, P, button, span, button2)
  carItem.append(li)

  // adding selectedItem in cart array (state) + updating quantity

  const stateItem = {
    id: selectedItem.id,
    name: selectedItem.name,
    price: selectedItem.price,
    quantity: quantity,
  }

  addQuantity(state.cart)


  //Updation quantity function (state)
  function addQuantity (array) {
    for (const cartItem of array) {
      if (cartItem.id === selectedItem.id) {
        cartItem.quantity = cartItem.quantity + 1
        return cartItem.quantity
      } 
    }
    array.push(stateItem)
  }



// Find item within the UI
function findItem () {
  const myElement = document.querySelector("#cart--item-list")

  for(let i=0; i<myElement.children.length; i++) {
    const item = document.querySelector(".theItemsName").innerHTML
    
    console.log(item)
  }
}







  // for(const shoppingItems of uiItems) {
  //   if (uiItems.name === selectedItem.name) {
  //     console.log("YOOOOOO")
  //   }
  // }
}