const townPrices = {
    'town1': 50.00,
    'town2': 75.00,
    'town3': 100.00
};

const itemContainer = document.getElementById('items');

// Variables to store total amounts
let totalAmount = 0;
let shippingFee = 0;
let overallTotal = 0;

// Function to update the displayed totals
function updateTotals() {
    document.getElementById('total-amount').textContent = `Total: ₱${totalAmount.toFixed(2)}`;
    document.getElementById('shipping-fee').textContent = `Shipping Fee: ₱${shippingFee.toFixed(2)}`;
    document.getElementById('overall-total').textContent = `Overall Total: ₱${overallTotal.toFixed(2)}`;
}

// Get the input from user
const form = document.getElementById('user-form');

// Check if the input name has numbers
function containsNumber(str) {
    return /\d/.test(str);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve input values by using IDs
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const town = document.getElementById('town').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Validate name
    if (containsNumber(name)) {
        alert('Name cannot contain numbers.');
        return;
    }

    // Get the town price (shipping fee)
    const townPrice = townPrices[town] || 0;

    // Calculate the total price for the item (price * quantity)
    const totalItemPrice = (price * quantity);
    const totalWithShipping = totalItemPrice + townPrice;

    // Create a new element that will hold the item details
    const itemValues = document.createElement('p');
    itemValues.textContent = `${name} - Price: ₱${price.toFixed(2)} x ${quantity} = ₱${totalItemPrice.toFixed(2)} + Shipping: ₱${townPrice.toFixed(2)} (Total: ₱${totalWithShipping.toFixed(2)}) - Town: ${town}, Payment: ${paymentMethod}`;
    itemValues.style.margin = 0;
    itemValues.classList.add('details');

    // Create buttons and checkbox for the item
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    // Flag to track if item was previously checked
    let wasChecked = false;

    // Edit Button functionality
    editBtn.addEventListener('click', () => {
        document.getElementById('name').value = name;
        document.getElementById('price').value = price;
        document.getElementById('quantity').value = quantity;
        document.getElementById('town').value = town;
        document.getElementById('payment-method').value = paymentMethod;

        document.getElementById('items').removeChild(itemWrapper);

        // Adjust totals when editing
        if (wasChecked) {
            totalAmount -= totalItemPrice;
            shippingFee -= townPrice;
            overallTotal = totalAmount + shippingFee;
            updateTotals();
        }
    });

    // Delete Button functionality
    deleteBtn.addEventListener('click', () => {
        document.getElementById('items').removeChild(itemWrapper);

        // Adjust totals when deleting
        if (wasChecked) {
            totalAmount -= totalItemPrice;
            shippingFee -= townPrice;
            overallTotal = totalAmount + shippingFee;
            updateTotals();
        }
    });

    // Checkbox functionality to adjust totals when selected
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            if (!wasChecked) {
                totalAmount += totalItemPrice;
                shippingFee += townPrice;
                overallTotal += totalItemPrice + townPrice; // Add this item's total
                wasChecked = true;
            }
        } else {
            if (wasChecked) {
                totalAmount -= totalItemPrice;
                shippingFee -= townPrice;
                overallTotal -= totalItemPrice + townPrice; // Subtract this item's total
                wasChecked = false;
            }
        }
        updateTotals();
    });

    // Create div that will hold the buttons and checkbox
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-wrapper');

    btnContainer.appendChild(checkbox);
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    // Create wrapper for the item and append to items container
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('item-wrapper');
    itemWrapper.appendChild(itemValues);
    itemWrapper.appendChild(btnContainer);

    itemContainer.appendChild(itemWrapper);

    // Mark as not checked initially
    wasChecked = checkbox.checked;

    // Clear inputs
    form.reset();
});

// Checkout button functionality
const checkoutBtn = document.getElementById('checkoutBtn');
checkoutBtn.addEventListener('click', () => {
    alert(`Your overall total is: ₱${overallTotal.toFixed(2)}`);
    alert('Proceeding to Checkout!');
    alert('Checkout successfully!');

    // Remove checked items from the DOM
    const checkedItems = document.querySelectorAll('#items .item-wrapper input[type="checkbox"]:checked');
    checkedItems.forEach(checkbox => {
        const itemWrapper = checkbox.closest('.item-wrapper');
        itemContainer.removeChild(itemWrapper);
    });

    // Update totals after removing checked items
    totalAmount = 0;
    shippingFee = 0;
    overallTotal = 0;
    updateTotals();
});
