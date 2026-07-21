// html display block elements for customer & invoice information
const DisplayContainer = document.getElementById('DisplayContainer');
const customerInformation = document.getElementById('customerInformation');
const invoiceInformation = document.getElementById('invoiceInformation');

// product element handling
const addBtn = document.getElementById("addItemBtn");
const productContainer = document.getElementById("productContainer");

//invoice element handling
const invoiceSubTotalInput = document.querySelector('.invoice-sub-total');
const discountInput = document.getElementById('discountPercentage');
const invoiceTotalInput = document.querySelector('.invoice-total');
const productTableBody = document.getElementById('productTableBody');

// submit button element
const submitBtn = document.getElementById('submitBtn');

// calculate sub-total price of every product
const calculateSubTotal = () => {

    // Get total prices of all products
    const totals = productContainer.querySelectorAll('.product-total');

    let subTotal = 0;

    // add all total prices into sub-total
    totals.forEach((input) => {
        subTotal += parseFloat(input.value) || 0;
    });

    // display sub-total value
    invoiceSubTotalInput.value = subTotal.toFixed(2);

    // calculate invoice total value as soon as sub total calculation is finished
    calculateTotal();
};

// calculate total price of every product
const calculateTotal = () => {

    // get subtotal and discounts
    const subTotal = parseFloat(invoiceSubTotalInput.value) || 0;
    const discount = parseFloat(discountInput.value) || 0;

    // Calculate invoice total value
    let total = subTotal - (subTotal * discount / 100);

    // display invoice total value
    invoiceTotalInput.value = total.toFixed(2);
};

const hideDisplay = () => {
    DisplayContainer.style.display = 'none';
};

// add items in the product cart
addBtn.addEventListener("click", () => {

    // keep adding products in the last child
    productContainer.insertAdjacentHTML('beforeend',
                        `<div class="product-item m-3" style="border: 1px solid #000;">
                            <div class="d-flex p-2">
                                <div class="ms-auto">
                                    <button class="btn btn-danger remove-item-btn">
                                        <i class="bi bi-x fs-6"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="row mb-3 px-3">
                                <label class="col-sm-3">
                                    Name:
                                </label>
                                <input type="Text" class="col-sm-8 product-name">
                            </div>
                            <div class="row mb-3 px-3">
                                <label class="col-sm-3">
                                    Rate:
                                </label>
                                <input type="number" class="col-sm-8 product-rate">
                            </div>
                            <div class="row mb-3 px-3">
                                <label class="col-sm-3">
                                    Quantity:
                                </label>
                                <input type="number" class="col-sm-8 product-quantity">
                            </div>
                            <div class="row mb-3 px-3">
                                <label class="col-sm-3">
                                    Total:
                                </label>
                                <input readonly class="col-sm-8 product-total">
                            </div>
                        </div>`
    );

    //hides HTML display if any item is added
    hideDisplay();
    
});

// Total price of product calculation display
productContainer.addEventListener('input', (event) => {

    // find out which input the user just typed in
    const isRateInput = event.target.classList.contains('product-rate');
    const isQuantityInput = event.target.classList.contains('product-quantity');
    const isNameInput = event.target.classList.contains('product-name');

    // any of the user input has been turned on
    if (isRateInput || isQuantityInput || isNameInput) {

        // find the parent product box that this input belongs to
        const productItem = event.target.closest('.product-item');

        // get all four inputs inside that product box
        const nameInput = productItem.querySelector('.product-name');
        const rateInput = productItem.querySelector('.product-rate');
        const quantityInput = productItem.querySelector('.product-quantity');
        const totalInput = productItem.querySelector('.product-total');

        // Make rate and quality float values
        let rate = parseFloat(rateInput.value);
        let quantity = parseFloat(quantityInput.value);

        if (!rate) {
            rate = 0;
        }
        if (!quantity) {
            quantity = 0;
        }

        // only calculate a total if a product name has been typed in
        const nameIsEmpty = nameInput.value === '';

        if (nameIsEmpty) {
            totalInput.value = '';
        } else {
            const total = rate * quantity;
            totalInput.value = total.toFixed(2);
        }
    }

    // recalculate the invoice sub-total every time something changes
    calculateSubTotal();

});

// remove a product item from cart
productContainer.addEventListener('click', (event) => {

    // remove button to remove products
    const removeBtn = event.target.closest('.remove-item-btn');
    if(!removeBtn) return;
    const row = removeBtn.closest('.product-item');
    row.remove();

    // update sub total values when a product gets removed
    calculateSubTotal();

    // hides HTML display if any row is removed
    hideDisplay();

});

// make discount input restricted between 0 to 100
discountInput.addEventListener('input', (event) => {
    
    const value = parseFloat(event.target.value);

    if (value > 100) event.target.value = 100;
    if (value < 0) event.target.value = 0;
});

// listen to discount percentage input
discountInput.addEventListener('input', calculateTotal);

// Customer information & invoice display function
submitBtn.addEventListener('click', (event) => {

    // get customer info
    const invoiceNo = document.getElementById('invoiceNo').value;
    const customerName = document.getElementById('customerName').value;
    const phoneNo = document.getElementById('phoneNo').value;
    const address = document.getElementById('addressName').value;
    const radioIsChecked = document.querySelector('input[name="paymentCheck"]:checked');
    const paymentMethod = radioIsChecked ? radioIsChecked.value : 'Blank';
    const countryLocation = document.getElementById('selectLocation').value || 'Blank';

    // invoice info
    const invoiceSubTotal = invoiceSubTotalInput.value; 
    const discountPercentage = discountInput.value;
    const invoiceTotal = invoiceTotalInput.value;

    // make customer inputs mandatory
    if (!invoiceNo || !customerName || !phoneNo || !address) {
        alert('Fill all the information');
        return;
    }
    
    if (invoiceNo < 1) {
        alert('Fill with valid Invoice Number');
        return;
    }

    const phoneInput = document.getElementById('phoneNo');
    if(!phoneInput.validity.valid) {
        alert("Please enter a valid Phone number");
        return;
    }

    //HTML display
    DisplayContainer.style.display = 'block';

    //customer information HTML display
    customerInformation.innerHTML =
       `<div class="fs-3 fw-semibold mb-4 text-center">
            Customer Information Details
        </div>
        <div class="row mb-3">
            <label class="col-sm-6 fw-semibold">
                Invoice No:
            </label>
            <div class="col-sm-6">
                ${invoiceNo}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-6 fw-semibold">
                Customer Name:
            </label>
            <div class="col-sm-6">
                ${customerName}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-6 fw-semibold">
                Phone No:
            </label>
            <div class="col-sm-6">
                ${phoneNo}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-6 fw-semibold">
                Address:
            </label>
            <div class="col-sm-6">
                ${address}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-6 fw-semibold">
                Payment Method:
            </label>
            <div class="col-sm-6">
                ${paymentMethod}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-6 fw-semibold">
                Location:
            </label>
            <div class="col-sm-6">
                ${countryLocation}
            </div>
        </div>`;

    //invoice information HTML display
    invoiceInformation.innerHTML =
        `<div class="fs-3 fw-semibold mb-4 text-center">
            Invoice Details
        </div>
        <div class="row mb-3">
            <label class="col-sm-6 fw-semibold">
                Sub total:
            </label>
            <div class="col-sm-6">
                ${invoiceSubTotal}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-6 fw-semibold">
                Discount (%):
            </label>
            <div class="col-sm-6">
                ${discountPercentage}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-6 fw-semibold">
                Total:
            </label>
            <div class="col-sm-6">
                ${invoiceTotal}
            </div>
        </div>`;

    // clear old product rows
    productTableBody.innerHTML = '';

    // display product information 
    productContainer.querySelectorAll('.product-item').forEach((item) => {

        const name = item.querySelector('.product-name').value;
        const rate = item.querySelector('.product-rate').value;
        const quantity = item.querySelector('.product-quantity').value;
        const total = item.querySelector('.product-total').value;

        // skip completely empty rows
        if (!name || !rate || !quantity) return;

        // add one row per product into the table
        productTableBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${name}</td>
                <td>${rate}</td>
                <td>${quantity}</td>
                <td>${total}</td>
            </tr>
        `);
    });

});

// hides HTML display if any input is added in the DOM
document.addEventListener('input', hideDisplay);