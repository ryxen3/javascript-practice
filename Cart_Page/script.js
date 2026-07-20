// html display block elements for customer & invoice information
const DisplayContainer = document.getElementById('DisplayContainer');
const customerInformation = document.getElementById('customerInformation');
const invoiceInformation = document.getElementById('invoiceInformation');

// product element handling
const addBtn = document.getElementById("addItemBtn");
const productContainer = document.getElementById("productContainer");

// calculate total price of every product
const calculateSubTotal = () => {

    const totals = productContainer.querySelectorAll('.product-total');

    let subTotal = 0;

    totals.forEach((input) => {
        subTotal += parseFloat(input.value) || 0;
    });

    document.querySelector('.invoice-sub-total').value = subTotal;
};

// add items in the product cart
addBtn.addEventListener("click", () => {

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

    calculateSubTotal();
    
});

// Total price of product calculation display
productContainer.addEventListener('input', (event) => {
    
    if(event.target.classList.contains('product-rate') || event.target.classList.contains('product-quantity')) {
        const row = event.target.closest('.product-item');
        const rateInput = row.querySelector('.product-rate');
        const quantityInput = row.querySelector('.product-quantity');
        const totalInput = row.querySelector('.product-total');

        const rate = parseFloat(rateInput.value) || 0;
        const quantity = parseFloat(quantityInput.value) || 0;

        totalInput.value = parseFloat(rate * quantity).toFixed(2);
    }

    calculateSubTotal();

});

// remove a product item from cart
productContainer.addEventListener('click', (event) => {

    const removeBtn = event.target.closest('.remove-item-btn');
    if(!removeBtn) return;
    const row = removeBtn.closest('.product-item');
    row.remove();

    calculateSubTotal();

});

// Customer information & invoice display function
document.getElementById('submitBtn').addEventListener('click', (event) => {

    // get customer info
    const invoiceNo = document.getElementById('invoiceNo').value;
    const customerName = document.getElementById('customerName').value;
    const phoneNo = document.getElementById('phoneNo').value;
    const address = document.getElementById('addressName').value;
    const radioIsChecked = document.querySelector('input[name="paymentCheck"]:checked');
    const paymentMethod = radioIsChecked?radioIsChecked.value:'None';
    const countryLocation = document.getElementById('selectLocation').value;

    // invoice info
    const invoiceSubTotal = document.querySelector('.invoice-sub-total').value; 
    const discountPercentage = document.getElementById('discountPercentage').value;
    const invoiceTotal = parseFloat(invoiceSubTotal -((invoiceSubTotal * discountPercentage)/100));
    
    // make inputs mandatory
    if (!invoiceNo || !customerName || !phoneNo || !address) {
        alert('Fill all the information');
        return;
    }

    //customer information display
    DisplayContainer.style.display = 'block';

    customerInformation.innerHTML =
       `<div class="fs-3 fw-semibold mb-4 text-center">
            Customer Information Details
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 fw-semibold">
                Invoice No:
            </label>
            <div class="col-sm-9">
                ${invoiceNo}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 fw-semibold">
                Customer Name:
            </label>
            <div class="col-sm-9">
                ${customerName}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 fw-semibold">
                Phone No:
            </label>
            <div class="col-sm-9">
                ${phoneNo}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 fw-semibold">
                Address:
            </label>
            <div class="col-sm-9">
                ${address}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 fw-semibold">
                Payment Method:
            </label>
            <div class="col-sm-9">
                ${paymentMethod}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 fw-semibold">
                Location:
            </label>
            <div class="col-sm-9">
                ${countryLocation}
            </div>
        </div>`;

    invoiceInformation.innerHTML =
        `<div class="fs-3 fw-semibold mb-4 text-center">
            Invoice Details
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 fw-semibold">
                Sub total:
            </label>
            <div class="col-sm-9">
                ${invoiceSubTotal}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 fw-semibold">
                Discount (%):
            </label>
            <div class="col-sm-9">
                ${discountPercentage}
            </div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 fw-semibold">
                Total:
            </label>
            <div class="col-sm-9">
                ${invoiceTotal}
            </div>
        </div>`;

});
