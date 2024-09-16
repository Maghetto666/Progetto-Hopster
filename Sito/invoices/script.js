// Sidebar upper buttons and icons
const warehouse_icon = document.querySelector('.warehouse-icon');
const suppliers_icon = document.querySelector('.suppliers-icon');
const invoices_icon = document.querySelector('.invoices-icon');
const warehouse_btn = document.querySelector('.warehouse-btn');
const suppliers_btn = document.querySelector('.suppliers-btn');
const invoices_btn = document.querySelector('.invoices-btn');

// Add box input fields
const invoiceNumber_input = document.querySelector('.invoiceNumber-input');
const deliveryDate_input = document.querySelector('.deliveryDate-input');
const suppliesType_input = document.querySelector('.suppliesType-input');
const supplier_input = document.querySelector('.supplier-input');

// Edit box input fields
const editNewInvoiceNumber = document.querySelector('.editNewInvoiceNumber');
const editNewDeliveryDate = document.querySelector('.editNewDeliveryDate');
const editNewSuppliesType = document.querySelector('.editNewSuppliesType');
const editNewSupplier = document.querySelector('.editNewSupplier');

// Main page buttons
const itemsList = document.querySelector('.itemsList');
const add_btn = document.querySelector('.add-btn');
const delete_btn = document.querySelectorAll('delete-btn');

// Add and edit boxes starters
const addBox = document.querySelector('.addBox');
const editBox = document.querySelector('.editBox');
editBox.style.visibility = "hidden";

// Starters
let modify_id = 0;
let products = [];
fetchInvoices();
fetchSuppliers()

// Fetches data from the db
async function fetchInvoices() {
    // Calls the API and put data into an array
    const apiUrl = 'http://localhost:8080/invoices';
    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data;

    // Updates the list
    itemsList.innerHTML = '';
    invoiceNumber_input.value = "";
    deliveryDate_input.value = "";
    suppliesType_input.value = "";
    supplier_input.value = "";


    editNewInvoiceNumber.value = "";
    editNewDeliveryDate.value = "";
    editNewSuppliesType.value = "";
    editNewSupplier.value = "";


    products.forEach((product) => {

        let dDateToFormat = new Date(product.deliveryDate);
        let dDate = stringToDate(dDateToFormat);

        let supplier = product.supplier;

        const template = buildTemplateHTML(
            product.id,
            product.invoiceNumber,
            dDate,
            product.suppliesType,
            supplier.supplierName
        );
        itemsList.innerHTML += template;
    });
    activateDeleteButtons();
    activateModifyButtons();
}

function stringToDate(dateToFormat) {
    const yyyy = dateToFormat.getFullYear();
    let mm = dateToFormat.getMonth() + 1;
    let dd = dateToFormat.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDay = dd + '/' + mm + '/' + yyyy;
    return formattedDay;
}

async function fetchSuppliers() {
    const apiUrl = 'http://localhost:8080/suppliers';
    const response = await fetch(apiUrl);
    const data = await response.json();
    suppliers = data;
    for (let i = 0; i < suppliers.length; i++) {
        const template = buildCategoriesHTML(suppliers[i]);
        supplier_input.innerHTML += template;
        editNewSupplier.innerHTML += template;
    }
}

function buildCategoriesHTML(supplier) {
    return `<option value="${supplier.id}">${supplier.supplierName}</option>`
}

// Add a new item to the list and to the local storage
add_btn.addEventListener('click', function () {

    // gets the parameters from the inputs
    let invoiceNumber = invoiceNumber_input.value.trim();
    let deliveryDate = deliveryDate_input.value;
    let suppliesType = suppliesType_input.value.trim();
    let supplier = supplier_input.value;


    // puts the parameters into a new object 
    let itemToAdd = {
        invoiceNumber: invoiceNumber,
        deliveryDate: deliveryDate,
        suppliesType: suppliesType,
        supplier_id: supplier
    }

    // checks if every field is compiled
    if (invoiceNumber.length == 0 || deliveryDate.length == 0 || suppliesType == 0 || supplier == 0) {
        return;
    } else {
        addToDB(itemToAdd);
    }
});

async function addToDB(itemToAdd) {
    const response = await fetch('http://localhost:8080/invoices', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemToAdd)
    });

    fetchInvoices();
}

// Delete the selected items from list
function activateDeleteButtons() {
    const checks = document.querySelectorAll('.delete-btn');

    for (let i = 0; i < checks.length; i++) {
        checks[i].addEventListener('click', function () {
            let id = checks[i].id;
            deleteSupplier(id);
        });
    };
}

async function deleteSupplier(id) {

    await fetch(`http://localhost:8080/invoices/${id}`, {
        method: 'DELETE'
    });
    fetchInvoices();
}

function activateModifyButtons() {
    const checks = document.querySelectorAll('.modify-btn');
    for (let i = 0; i < checks.length; i++) {
        checks[i].addEventListener('click', function () {
            let id = checks[i].id;

            editBox.style.visibility = "visible";
            addBox.style.visibility = "hidden";
            checks.forEach((check) => check.style.visibility = "hidden");
            checks[i].style.visibility = "visible";

            fillEditFields(id);
            modify_id = id;
        });
    };
}

async function fillEditFields(id) {
    const response = await fetch(`http://localhost:8080/invoices/${id}`);
    const data = await response.json();

    let supplier = data.supplier

    editNewInvoiceNumber.value = data.invoiceNumber;
    editNewDeliveryDate.value = data.deliveryDate;
    editNewSuppliesType.value = data.suppliesType;
    editNewSupplier = data.supplier;
}

async function modifyInvoices() {

    let itemToModify = {
        id: modify_id,
        invoiceNumber: editNewInvoiceNumber.value,
        deliveryDate: editNewDeliveryDate.value,
        suppliesType: editNewSuppliesType.value,
        supplier_id: editNewSupplier.value
    }

    console.log(itemToModify.supplier_id);

    editBox.style.visibility = "hidden";
    addBox.style.visibility = "visible";

    await fetch(`http://localhost:8080/invoices/${modify_id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemToModify)
    });

    const checks = document.querySelectorAll('.modify-btn');
    for (let i = 0; i < checks.length; i++) {
        document.getElementsByClassName("modify-btn")[i].style.visibility = "visible";
    };

    fetchInvoices();
}

// Creates HTML to add a new item in the list
function buildTemplateHTML(id, invoiceNumber, deliveryDate, suppliesType, supplier) {

    return `
                <ul class="newItem" id=${id}>
                    <li class="invoiceNumber-item">${invoiceNumber}</li>
                    <li class="deliveryDate-item">${deliveryDate}</li>
                    <li class="suppliesType-item">${suppliesType}</li>
                    <li class="supplier-item">${supplier}</li>
                    <li class="modify-item"><button class="modify-btn" id="${id}"><img src="images/edit.svg"></button><button class="delete-btn" id="${id}"><img src="images/trash.svg"></button></li>
                </ul>
    `
}

let index = false;

// Fetches data from the db ordered by "order"
async function orderBy(order) {
    let apiUrl = "";
    if (index == false) {
        apiUrl = `http://localhost:8080/invoices?orderBy=${order}`;
    } else {
        apiUrl = `http://localhost:8080/invoices?orderByDesc=${order}`;
    }
    index = !index;
    // Updates the list
    itemsList.innerHTML = '';

    // Calls the API and put data into an array

    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data;

    products.forEach((product) => {

        let dDateToFormat = new Date(product.deliveryDate);
        let dDate = stringToDate(dDateToFormat);

        let supplier = product.supplier;

        const template = buildTemplateHTML(
            product.id,
            product.invoiceNumber,
            dDate,
            product.suppliesType,
            supplier.supplierName
        );
        itemsList.innerHTML += template;
    });
    activateDeleteButtons();
    activateModifyButtons();
}

async function goTo(section) {
    let url = `${section}.html`
    window.location = url;
}

// Mouseover and mouseout functions
warehouse_btn.addEventListener('mouseover', function () {
    warehouse_icon.classList.add("upper-icons-hover");
});
suppliers_btn.addEventListener('mouseover', function () {
    suppliers_icon.classList.add("upper-icons-hover");
});
invoices_btn.addEventListener('mouseover', function () {
    invoices_icon.classList.add("upper-icons-hover");
});
warehouse_btn.addEventListener('mouseout', function () {
    warehouse_icon.classList.remove("upper-icons-hover");
});
suppliers_btn.addEventListener('mouseout', function () {
    suppliers_icon.classList.remove("upper-icons-hover");
});
invoices_btn.addEventListener('mouseout', function () {
    invoices_icon.classList.remove("upper-icons-hover");
});