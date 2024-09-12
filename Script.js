const townPrices = {
    'town1': 50.00, 
    'town2': 75.00,
    'town3': 100.00
};

const checkoutSummary = document.getElementById('checkout-wrapper');
const itemContainer = document.getElementById('items');

// Running total variable to accumulate total price
let runningTotal = 0;

// Function to update the total amount displayed
function updateTotal() {
    const totalText = document.getElementById('total-amount');
    totalText.textContent = `Total: ₱${runningTotal.toFixed(2)}`;
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

    // Get the town price
    const townPrice = townPrices[town] || 0; // Default to 0 if town is not found

    // Calculate the total price for the item
    const totalItemPrice = (price * quantity) + townPrice;

    // Create a new element that will hold the details
    const itemValues = document.createElement('p');
    itemValues.textContent = `${name} - ₱${(price + townPrice).toFixed(2)} x ${quantity} (Town: ${town}, Payment: ${paymentMethod})`;
    itemValues.style.margin = 0;
    itemValues.classList.add('details');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    // Edit Button functionality
    editBtn.addEventListener('click', () => {
        document.getElementById('name').value = name;
        document.getElementById('price').value = price;
        document.getElementById('quantity').value = quantity;
        document.getElementById('town').value = town;
        document.getElementById('payment-method').value = paymentMethod;

        document.getElementById('items').removeChild(itemWrapper);
        // Subtract this item from total when editing
        runningTotal -= totalItemPrice;
        updateTotal();
    });

    // Delete Button functionality
    deleteBtn.addEventListener('click', () => {
        document.getElementById('items').removeChild(itemWrapper);
        // Subtract this item from total when deleted
        runningTotal -= totalItemPrice;
        updateTotal();
    });

    // Div or container that will hold the two buttons as well as the checkbox
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-wrapper');

    // Append the buttons inside the container
    btnContainer.appendChild(checkbox);
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    // It will contain the Item name, price, and quantity
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('item-wrapper');

    // Update the running total
    runningTotal += totalItemPrice;
    updateTotal();

    // Append elements to the item wrapper
    itemWrapper.appendChild(itemValues);
    itemWrapper.appendChild(btnContainer);
    itemContainer.appendChild(itemWrapper);

    // The form will reset when the add cart button is clicked
    form.reset();
});

// Checkout Button Functionality
const checkoutBtn = document.getElementById('checkoutBtn');
checkoutBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#items input[type="checkbox"]');
    const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    if (!anyChecked) {
        alert('Please select at least one item to checkout.');
    } else {
        alert('Proceeding to checkout.');
        alert('Checked out successfully!');
    }
});
