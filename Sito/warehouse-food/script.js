// Sidebar upper buttons and icons
const warehouse_icon = document.querySelector('.warehouse-icon');
const suppliers_icon = document.querySelector('.suppliers-icon');
const invoices_icon = document.querySelector('.invoices-icon');
const warehouse_btn = document.querySelector('.warehouse-btn');
const suppliers_btn = document.querySelector('.suppliers-btn');
const invoices_btn = document.querySelector('.invoices-btn');

// Sidebar bottom buttons and icons
const foods_icon = document.querySelector('.foods-icon');
const drinks_icon = document.querySelector('.drinks-icon');
const beers_icon = document.querySelector('.beers-icon');
const supplies_icon = document.querySelector('.supplies-icon');
const foods_btn = document.querySelector('.foods-btn');
const drinks_btn = document.querySelector('.drinks-btn');
const beers_btn = document.querySelector('.beers-btn');
const supplies_btn = document.querySelector('.supplies-btn');
const itemsList = document.querySelector('.itemsList');

// Add box input fields
const product_input = document.querySelector('.product-input');
const quantity_input = document.querySelector('.quantity-input');
const deliveryDate_input = document.querySelector('.deliveryDate-input');
const expiringDate_input = document.querySelector('.expiringDate-input');
const frozenCheckbox = document.querySelector('.frozenCheckbox');
const frozenDate_input = document.querySelector('.frozenDate-input');
frozenDate_input.disabled = true;

// Edit box input fields
const editNewProduct = document.querySelector('.editNewProduct');
const editNewQuantity = document.querySelector('.editNewQuantity');
const editNewDeliveryDate = document.querySelector('.editNewDeliveryDate');
const editNewExpiringDate = document.querySelector('.editNewExpiringDate');
const editNewFrozenCheckBox = document.querySelector('.editNewFrozenCheckBox');
const editNewFreezingDate = document.querySelector('.editNewFreezingDate');
editNewFrozenCheckBox.disabled = true;

// Main page buttons
const add_btn = document.querySelector('.add-btn');
const delete_btn = document.querySelectorAll('delete-btn');

// Add and edit boxes starters
const addBox = document.querySelector('.addBox');
const editBox = document.querySelector('.editBox');
editBox.style.visibility = "hidden";

// Starters
let modify_id = 0;
let products = [];
fetchFoods();

// Fetches data from the db
async function fetchFoods() {
    // Calls the API and put data into an array
    const apiUrl = 'http://localhost:8080/foods';
    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data;

    // Updates the list
    itemsList.innerHTML = '';
    product_input.value = "";
    quantity_input.value = "";
    deliveryDate_input.value = "";
    expiringDate_input.value = "";
    frozenCheckbox.checked = false;
    frozenDate_input.value = "";
    frozenDate_input.disabled = true;

    editNewProduct.value = "";
    editNewQuantity.value = "";
    editNewDeliveryDate.value = "";
    editNewExpiringDate.value = "";
    editNewFrozenCheckBox.checked = false;
    editNewFreezingDate.value = "";
    editNewFreezingDate.disabled = true;

    

    products.forEach((product) => {
        let dDateToFormat = new Date(product.deliveryDate);
        let dDate = stringToDate(dDateToFormat);
        let eDateToFormat = new Date(product.expirationDate);
        let eDate = stringToDate(eDateToFormat);
        let FDateToFormat = new Date(product.freezingDate);
        let FDate = stringToDate(FDateToFormat);
        const template = buildTemplateHTML(
            product.id,
            product.product,
            product.quantity,
            dDate,
            eDate,
            product.isFrozen,
            FDate
        );
        itemsList.innerHTML += template;
    });
    activateDeleteButtons();
    activateModifyButtons()

}

// Toggle the frozen date checkbox
frozenCheckbox.addEventListener('click', function () {
    if (frozenDate_input.disabled == true) {
        frozenDate_input.disabled = false;
    } else {
        frozenDate_input.disabled = true;
        frozenDate_input.value = null;
    }
});

// Toggle the frozen date checkbox
editNewFrozenCheckBox.addEventListener('click', function () {

    if (editNewFreezingDate.disabled == true) {
        editNewFreezingDate.disabled = false;
        editNewFreezingDate.value = oldDate;
    } else {
        editNewFreezingDate.disabled = true;
        editNewFreezingDate.value = null;
    }
});

function stringToDate(dateToFormat) {
    const yyyy = dateToFormat.getFullYear();
    let mm = dateToFormat.getMonth() + 1;
    let dd = dateToFormat.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDay = dd + '/' + mm + '/' + yyyy;
    return formattedDay;
}

// Add a new item to the list and to the local storage
add_btn.addEventListener('click', function () {

    // gets the parameters from the inputs
    let product = product_input.value.trim();
    let quantity = quantity_input.value;
    let deliveryDate = deliveryDate_input.value;
    let expiringDate = expiringDate_input.value;
    let frozenChecked = frozenCheckbox.checked;
    let frozenDate = frozenDate_input.value;

    // puts the parameters into a new object 
    let itemToAdd = {
        product: product,
        quantity: quantity,
        deliveryDate: deliveryDate,
        expirationDate: expiringDate,
        frozen: frozenChecked,
        freezingDate: frozenDate
    }

    // checks if the frozen date checkbox is active or not
    if (frozenCheckbox.checked == true) {

        // puts a required label on the frozen date input in case
        frozenDate_input.required = true;

        // checks if every field is compiled
        if (product.length == 0 || quantity == 0 || deliveryDate == 0 || expiringDate == 0 || frozenDate == 0) {
            return;
        } else {
            addToDB(itemToAdd);
        }
    } else {
        frozenDate_input.required = false;
        if (product.length == 0 || quantity == 0 || deliveryDate == 0 || expiringDate == 0) {
            return;
        } else {
            addToDB(itemToAdd);
        }
    }
});

async function addToDB(itemToAdd) {
    const response = await fetch('http://localhost:8080/foods', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product: itemToAdd.product,
            quantity: itemToAdd.quantity,
            deliveryDate: itemToAdd.deliveryDate,
            expirationDate: itemToAdd.expirationDate,
            isFrozen: itemToAdd.frozen,
            freezingDate: itemToAdd.freezingDate
        })
    });

    fetchFoods();
}

// Delete the selected items from list
function activateDeleteButtons() {
    const checks = document.querySelectorAll('.delete-btn');

    for (let i = 0; i < checks.length; i++) {
        checks[i].addEventListener('click', function () {
            let id = checks[i].id;
            deleteFood(id);
        });
    };
}

async function deleteFood(id) {
    await fetch(`http://localhost:8080/foods/${id}`, {
        method: 'DELETE'
    });
    fetchFoods();
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
    const response = await fetch(`http://localhost:8080/foods/${id}`);
    const data = await response.json();

    editNewProduct.value = data.product;
    editNewQuantity.value = data.quantity;
    editNewDeliveryDate.value = data.deliveryDate;
    editNewExpiringDate.value = data.expirationDate;
    editNewFrozenCheckBox.disabled = false;
    if (data.isFrozen == true) {
        editNewFrozenCheckBox.value = true;
        editNewFrozenCheckBox.checked = true;
    } else {
        editNewFrozenCheckBox.value = false;
        editNewFrozenCheckBox.checked = false;
    }
    editNewFreezingDate.value = data.freezingDate;
}

async function modifyFood() {
    let itemToModify = {
        product: editNewProduct.value,
        quantity: editNewQuantity.value,
        deliveryDate: editNewDeliveryDate.value,
        expirationDate: editNewExpiringDate.value,
        frozen: editNewFrozenCheckBox.value,
        freezingDate: editNewFreezingDate.value
    }
    editBox.style.visibility = "hidden";
    addBox.style.visibility = "visible";

    await fetch(`http://localhost:8080/foods/${modify_id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product: itemToModify.product,
            quantity: itemToModify.quantity,
            deliveryDate: itemToModify.deliveryDate,
            expirationDate: itemToModify.expirationDate,
            isFrozen: itemToModify.frozen,
            freezingDate: itemToModify.freezingDate
        })
    });

    const checks = document.querySelectorAll('.modify-btn');
    for (let i = 0; i < checks.length; i++) {
        document.getElementsByClassName("modify-btn")[i].style.visibility = "visible";
    };

    fetchFoods();
}

// Creates HTML to add a new item in the list
function buildTemplateHTML(id, product, quantity, deliverDate, expiringDate, isFrozen, frozenDate) {

    if (isFrozen == true) {
        frozenDate_input.required = true;
        return `
                <ul class="newItem">
                    <li class="product-item">${product}</li>
                    <li class="quantity-item">${quantity}</li>
                    <li class="deliveryDate-item">${deliverDate}</li>
                    <li class="expiringDate-item">${expiringDate}</li>
                    <li class="frozen-item"><input type="checkbox" class="frozen-checkbox" checked disabled></li>
                    <li class="frozenDate-item">${frozenDate}</li>
                    <li class="modify-item"><button class="modify-btn" id="${id}"><img src="images/edit.svg"></button><button class="delete-btn" id="${id}"><img src="images/trash.svg"></button></li>
                </ul>
    `
    } else {
        return `
                <ul class="newItem">
                    <li class="product-item">${product}</li>
                    <li class="quantity-item">${quantity}</li>
                    <li class="deliveryDate-item">${deliverDate}</li>
                    <li class="expiringDate-item">${expiringDate}</li>
                    <li class="frozen-item"><input type="checkbox" class="frozen-checkbox" disabled></li>
                    <li class="frozenDate-item" disabled></li>
                    <li class="modify-item"><button class="modify-btn" id="${id}"><img src="images/edit.svg"></button><button class="delete-btn" id="${id}"><img src="images/trash.svg"></button></li>
                </ul>
    `
    }
}
// Fetches data from the db ordered by product
async function orderByProduct() {
    
    // Updates the list
    itemsList.innerHTML = '';

    // Calls the API and put data into an array
    const apiUrl = 'http://localhost:8080/foods/orderbyproduct';
    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data;
    console.log(products);

    products.forEach((product) => {
        let dDateToFormat = new Date(product.deliveryDate);
        let dDate = stringToDate(dDateToFormat);
        let eDateToFormat = new Date(product.expirationDate);
        let eDate = stringToDate(eDateToFormat);
        let FDateToFormat = new Date(product.freezingDate);
        let FDate = stringToDate(FDateToFormat);
        const template = buildTemplateHTML(
            product.id,
            product.product,
            product.quantity,
            dDate,
            eDate,
            product.isFrozen,
            FDate
        );
        itemsList.innerHTML += template;
    });
    activateDeleteButtons();
    activateModifyButtons()
}

// Fetches data from the db ordered by quantity
async function orderByQuantity() {

    // Updates the list
    itemsList.innerHTML = '';
    
    // Calls the API and put data into an array
    const apiUrl = 'http://localhost:8080/foods/orderbyquantity';
    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data;

    products.forEach((product) => {
        let dDateToFormat = new Date(product.deliveryDate);
        let dDate = stringToDate(dDateToFormat);
        let eDateToFormat = new Date(product.expirationDate);
        let eDate = stringToDate(eDateToFormat);
        let FDateToFormat = new Date(product.freezingDate);
        let FDate = stringToDate(FDateToFormat);
        const template = buildTemplateHTML(
            product.id,
            product.product,
            product.quantity,
            dDate,
            eDate,
            product.isFrozen,
            FDate
        );
        itemsList.innerHTML += template;
    });
    activateDeleteButtons();
    activateModifyButtons()
}

// Fetches data from the db ordered by delivery date
async function orderByDeliveryDate() {

    // Updates the list
    itemsList.innerHTML = '';
    
    // Calls the API and put data into an array
    const apiUrl = 'http://localhost:8080/foods/orderbydeliverydate';
    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data;

    products.forEach((product) => {
        let dDateToFormat = new Date(product.deliveryDate);
        let dDate = stringToDate(dDateToFormat);
        let eDateToFormat = new Date(product.expirationDate);
        let eDate = stringToDate(eDateToFormat);
        let FDateToFormat = new Date(product.freezingDate);
        let FDate = stringToDate(FDateToFormat);
        const template = buildTemplateHTML(
            product.id,
            product.product,
            product.quantity,
            dDate,
            eDate,
            product.isFrozen,
            FDate
        );
        itemsList.innerHTML += template;
    });
    activateDeleteButtons();
    activateModifyButtons()
}
// Fetches data from the db ordered by expiring date
async function orderByExpiringDate() {
    
    // Updates the list
    itemsList.innerHTML = '';
    
    // Calls the API and put data into an array
    const apiUrl = 'http://localhost:8080/foods/orderbyexpiringdate';
    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data;

    products.forEach((product) => {
        let dDateToFormat = new Date(product.deliveryDate);
        let dDate = stringToDate(dDateToFormat);
        let eDateToFormat = new Date(product.expirationDate);
        let eDate = stringToDate(eDateToFormat);
        let FDateToFormat = new Date(product.freezingDate);
        let FDate = stringToDate(FDateToFormat);
        const template = buildTemplateHTML(
            product.id,
            product.product,
            product.quantity,
            dDate,
            eDate,
            product.isFrozen,
            FDate
        );
        itemsList.innerHTML += template;
    });
    activateDeleteButtons();
    activateModifyButtons()
}
// Fetches data from the db ordered by freezing date
async function orderByFreezingDate() {
    
    // Updates the list
    itemsList.innerHTML = '';
    
    // Calls the API and put data into an array
    const apiUrl = 'http://localhost:8080/foods/orderbyfreezingdate';
    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data;

    products.forEach((product) => {
        let dDateToFormat = new Date(product.deliveryDate);
        let dDate = stringToDate(dDateToFormat);
        let eDateToFormat = new Date(product.expirationDate);
        let eDate = stringToDate(eDateToFormat);
        let FDateToFormat = new Date(product.freezingDate);
        let FDate = stringToDate(FDateToFormat);
        const template = buildTemplateHTML(
            product.id,
            product.product,
            product.quantity,
            dDate,
            eDate,
            product.isFrozen,
            FDate
        );
        itemsList.innerHTML += template;
    });
    activateDeleteButtons();
    activateModifyButtons()
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
foods_btn.addEventListener('mouseover', function () {
    foods_icon.classList.add("bottom-icons-hover");
});
drinks_btn.addEventListener('mouseover', function () {
    drinks_icon.classList.add("bottom-icons-hover");
});
beers_btn.addEventListener('mouseover', function () {
    beers_icon.classList.add("bottom-icons-hover");
});
supplies_btn.addEventListener('mouseover', function () {
    supplies_icon.classList.add("bottom-icons-hover");
});
foods_btn.addEventListener('mouseout', function () {
    foods_icon.classList.remove("bottom-icons-hover");
});
drinks_btn.addEventListener('mouseout', function () {
    drinks_icon.classList.remove("bottom-icons-hover");
});
beers_btn.addEventListener('mouseout', function () {
    beers_icon.classList.remove("bottom-icons-hover");
});
supplies_btn.addEventListener('mouseout', function () {
    supplies_icon.classList.remove("bottom-icons-hover");
});