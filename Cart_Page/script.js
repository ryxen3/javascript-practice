// Customer information fetch function
document.getElementById('submitBtn').addEventListener('click', (event) => {

    // get customer info
    const invoiceNo = document.getElementById('invoiceNo').value;
    const customerName = document.getElementById('customerName').value;
    const phoneNo = document.getElementById('phoneNo').value;
    const address = document.getElementById('addressName').value;

    // make inputs mandatory
    if (!invoiceNo || !customerName || !phoneNo || !address) {
        alert('Fill all the information');
        return;
    }

    // html display block
    const displayContainer = document.getElementById('customerDisplayContainer');
    const customerInfo = document.getElementById('customerInformation');

    displayContainer.style.display = 'block';

    customerInfo.innerHTML =
       `<div class="fs-3 fw-semibold mb-4 text-center">
            Customer Information Details
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 fw-semibold">Invoice No:</label>
            <div class="col-sm-9">${invoiceNo}</div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 fw-semibold">Customer Name:</label>
            <div class="col-sm-9">${customerName}</div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 fw-semibold">Phone No:</label>
            <div class="col-sm-9">${phoneNo}</div>
        </div>
        <div class="row mb-3">
            <label class="col-sm-3 fw-semibold">Address:</label>
            <div class="col-sm-9">${address}</div>
        </div>`;
});