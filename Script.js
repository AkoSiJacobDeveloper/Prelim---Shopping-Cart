const checkoutSummary = document.getElementById('checkout-wrapper');
const itemContainer = document.getElementById('items');

// Running total variable to accumulate total price
let runningTotal = 0;

// Get the input from user
const form = document.getElementById('user-form');

// Check if the input name have numbers
function containsNumber(str) {
    return /\d/.test(str);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve input values by using IDs
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value); 
    const quantity = parseInt(document.getElementById('quantity').value); 

    // Name validation
    if(containsNumber(name)) {
        alert('Name cannot contains numbers.');
        return;
    }

    // A new element that will hold the details
    const itemValues = document.createElement('p');
    itemValues.textContent = `${name} - ₱${price.toFixed(2)} x ${quantity}`;
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

        document.getElementById('items').removeChild(itemWrapper);
        // Subtract this item from total when editing
        runningTotal -= price * quantity;
        updateTotal();
    });

    // Delete Button functionality
    deleteBtn.addEventListener('click', () => {
        document.getElementById('items').removeChild(itemWrapper);
        // Subtract this item from total when deleted
        runningTotal -= price * quantity;
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

    // Calculate the total for the current item and add to running total
    const total = price * quantity;
    runningTotal += total;

    // Update the total displayed
    updateTotal();

    // Append elements to the item wrapper
    itemWrapper.appendChild(itemValues);
    itemWrapper.appendChild(btnContainer);
    itemContainer.appendChild(itemWrapper);

    // The form will reset when the add cart button is clicked
    form.reset();
});

// Function to update the total amount displayed
function updateTotal() {
    const totalText = document.getElementById('total-amount');
    totalText.textContent = `Total: ₱${runningTotal.toFixed(2)}`;
}

// Functionality where you cant checkout if the item hasnt been checked
checkoutBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#items input[type="checkbox"]');
    const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    if (!anyChecked) {
        alert('Please select at least one item to checkout.');
    } else {
        alert('Proceeding to checkout.');
        alert('Checked out successfully!')
    }
});


// const checkoutBtn = document.getElementById('checkoutBtn');
// const itemContainer = document.getElementById('items');
// let runningTotal = 0;

// // Function to update the total amount displayed
// function updateTotal() {
//     const totalText = document.getElementById('total-amount');
//     totalText.textContent = `Total: ₱${runningTotal.toFixed(2)}`;
// }

// // Add event listener for the form submit
// document.getElementById('user-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const name = document.getElementById('name').value;
//     const price = parseFloat(document.getElementById('price').value);
//     const quantity = parseInt(document.getElementById('quantity').value);

//     // Create item elements
//     const itemValues = document.createElement('p');
//     itemValues.textContent = `${name} - ₱${price.toFixed(2)} x ${quantity}`;
//     itemValues.style.margin = 0;
//     itemValues.classList.add('details');

//     const checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';

//     const editBtn = document.createElement('button');
//     editBtn.textContent = 'Edit';
//     editBtn.classList.add('edit-btn');

//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.classList.add('delete-btn');

//     editBtn.addEventListener('click', () => {
//         document.getElementById('name').value = name;
//         document.getElementById('price').value = price;
//         document.getElementById('quantity').value = quantity;

//         itemContainer.removeChild(itemWrapper);
//         runningTotal -= price * quantity;
//         updateTotal();
//     });

//     deleteBtn.addEventListener('click', () => {
//         itemContainer.removeChild(itemWrapper);
//         runningTotal -= price * quantity;
//         updateTotal();
//     });

//     const btnContainer = document.createElement('div');
//     btnContainer.classList.add('btn-wrapper');
//     btnContainer.appendChild(checkbox);
//     btnContainer.appendChild(editBtn);
//     btnContainer.appendChild(deleteBtn);

//     const itemWrapper = document.createElement('div');
//     itemWrapper.classList.add('item-wrapper');

//     const total = price * quantity;
//     runningTotal += total;
//     updateTotal();

//     itemWrapper.appendChild(itemValues);
//     itemWrapper.appendChild(btnContainer);
//     itemContainer.appendChild(itemWrapper);

//     document.getElementById('user-form').reset();
// });

// // Add event listener for the checkout button
// checkoutBtn.addEventListener('click', () => {
//     const checkboxes = itemContainer.querySelectorAll('input[type="checkbox"]');
//     let checkedItems = false;

//     checkboxes.forEach(checkbox => {
//         if (checkbox.checked) {
//             checkedItems = true;
//         }
//     });

//     if (checkedItems) {
//         if (confirm('Do you want to proceed with checkout?')) {
//             // Remove checked items
//             checkboxes.forEach(checkbox => {
//                 if (checkbox.checked) {
//                     const itemWrapper = checkbox.closest('.item-wrapper');
//                     const price = parseFloat(itemWrapper.querySelector('.details').textContent.split('₱')[1].split(' x')[0]);
//                     const quantity = parseInt(itemWrapper.querySelector('.details').textContent.split(' x ')[1]);

//                     runningTotal -= price * quantity;
//                     itemContainer.removeChild(itemWrapper);
//                 }
//             });
//             updateTotal();
//         }
//     } else {
//         alert('Please select at least one item to checkout.');
//     }
// });


