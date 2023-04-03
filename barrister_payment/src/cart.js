// Calculates total price of items in cart on load
document.addEventListener("DOMContentLoaded", function() {
    updateTotalAmount();
});

// Retrieve quantity of items and calls changeQuantity() when user updates quantity
var quantities = document.getElementsByClassName('item-quantity')
for (var i = 0; i < quantities.length; i++) {
    var input = quantities[i]
    input.addEventListener('change', changeQuantity)
}

// Checks if quantity is a number and greater than 0, if not, sets quantity to 1
// Then calculates the new price for the updated quantities via updateTotalAmount()
function changeQuantity(event) {
    var input = event.target
    if (input.value <= 0) {
        input.value = 1
    }
    updateTotalAmount()
}

// Calls removeCartItem() from cart when user clicks on remove button
var removeItemButtons = document.getElementsByClassName('btn-danger')
for (var i = 0; i < removeItemButtons.length; i++) {
    var button = removeItemButtons[i]
    button.addEventListener('click', removeCartItem)
}

// Removes the item from the cart
function removeCartItem(event) {
    var buttonClick = event.target
    buttonClick.parentElement.parentElement.remove()
    updateTotalAmount()
}

// Calculates the total price of the items in the cart
function updateTotalAmount() {
    var cartItems = document.getElementsByClassName('all-items')[0]
    var cartRows = cartItems.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('item-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total-price')[0].innerHTML = '$' + total
}