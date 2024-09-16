// Sidebar upper buttons and icons
const warehouse_icon = document.querySelector('.warehouse-icon');
const suppliers_icon = document.querySelector('.suppliers-icon');
const invoices_icon = document.querySelector('.invoices-icon');
const warehouse_btn = document.querySelector('.warehouse-btn');
const suppliers_btn = document.querySelector('.suppliers-btn');
const invoices_btn = document.querySelector('.invoices-btn');

// Add box input fields
const supplierName_input = document.querySelector('.supplierName-input');
const IVANumber_input = document.querySelector('.IVANumber-input');
const registeredOffice_input = document.querySelector('.registeredOffice-input');
const suppliesType_input = document.querySelector('.suppliesType-input');

// Edit box input fields
const editNewSupplierName = document.querySelector('.editNewSupplierName');
const editNewIVANumber = document.querySelector('.editNewIVANumber');
const editNewRegisteredOffice = document.querySelector('.editNewRegisteredOffice');
const editNewSuppliesType = document.querySelector('.editNewSuppliesType');

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
fetchSuppliers();

// Fetches data from the db
async function fetchSuppliers() {
    // Calls the API and put data into an array
    const apiUrl = 'http://localhost:8080/suppliers';
    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data;

    // Updates the list
    itemsList.innerHTML = '';
    supplierName_input.value = "";
    IVANumber_input.value = "";
    registeredOffice_input.value = "";
    suppliesType_input.value = "";

    editNewSupplierName.value = "";
    editNewIVANumber.value = "";
    editNewRegisteredOffice.value = "";
    editNewSuppliesType.value = "";

    products.forEach((product) => {
        const template = buildTemplateHTML(
            product.id,
            product.supplierName,
            product.ivanumber,
            product.registeredOffice,
            product.suppliesType
        );
        itemsList.innerHTML += template;
    });
    activateDeleteButtons();
    activateModifyButtons();
}

// Add a new item to the list and to the local storage
add_btn.addEventListener('click', function () {

    // gets the parameters from the inputs
    let supplierName = supplierName_input.value.trim();
    let ivanumber = IVANumber_input.value.trim();
    let registeredOffice = registeredOffice_input.value.trim();
    let suppliesType = suppliesType_input.value.trim();

    // puts the parameters into a new object 
    let itemToAdd = {
        supplierName: supplierName,
        ivanumber: ivanumber,
        registeredOffice: registeredOffice,
        suppliesType: suppliesType
    }

    // checks if every field is compiled
    if (supplierName.length == 0 || ivanumber.length == 0 || registeredOffice == 0 || suppliesType == 0) {
        return;
    } else {
        addToDB(itemToAdd);
    }
});

async function addToDB(itemToAdd) {

    console.log(itemToAdd);
    const response = await fetch('http://localhost:8080/suppliers', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemToAdd)
    });

    fetchSuppliers();
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

    await fetch(`http://localhost:8080/suppliers/${id}`, {
        method: 'DELETE'
    });
    fetchSuppliers();
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
    const response = await fetch(`http://localhost:8080/suppliers/${id}`);
    const data = await response.json();

    editNewSupplierName.value = data.supplierName;
    editNewIVANumber.value = data.ivanumber;
    editNewRegisteredOffice.value = data.registeredOffice;
    editNewSuppliesType.value = data.suppliesType;
}

async function modifySuppliers() {

    let itemToModify = {
        id: modify_id,
        supplierName: editNewSupplierName.value,
        ivanumber: editNewIVANumber.value,
        registeredOffice: editNewRegisteredOffice.value,
        suppliesType: editNewSuppliesType.value
    }

    editBox.style.visibility = "hidden";
    addBox.style.visibility = "visible";

    await fetch(`http://localhost:8080/suppliers/${modify_id}`, {
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

    fetchSuppliers();
}

// Creates HTML to add a new item in the list
function buildTemplateHTML(id, supplierName, ivanumber, registeredOffice, suppliesType) {

    return `
                <ul class="newItem" id=${id}>
                    <li class="supplierName-item">${supplierName}</li>
                    <li class="ivanumber-item">${ivanumber}</li>
                    <li class="registeredOffice-item toFinish">${registeredOffice}</li>
                    <li class="suppliesType-item">${suppliesType}</li>
                    <li class="modify-item"><button class="modify-btn" id="${id}"><img src="images/edit.svg"></button><button class="delete-btn" id="${id}"><img src="images/trash.svg"></button></li>
                </ul>
    `
}

let index = false;

// Fetches data from the db ordered by "order"
async function orderBy(order) {
    let apiUrl = "";
    if (index == false) {
        apiUrl = `http://localhost:8080/suppliers?orderBy=${order}`;
    } else {
        apiUrl = `http://localhost:8080/suppliers?orderByDesc=${order}`;
    }
    index = !index;
    // Updates the list
    itemsList.innerHTML = '';

    // Calls the API and put data into an array

    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data;

    products.forEach((product) => {
        const template = buildTemplateHTML(
            product.id,
            product.supplierName,
            product.ivanumber,
            product.registeredOffice,
            product.suppliesType
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