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
const exhaustionDate_input = document.querySelector('.exhaustionDate-input');

// Edit box input fields
const editNewProduct = document.querySelector('.editNewProduct');
const editNewQuantity = document.querySelector('.editNewQuantity');
const editNewDeliveryDate = document.querySelector('.editNewDeliveryDate');
const editNewExhaustionDate = document.querySelector('.editNewExhaustionDate');

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
fetchSupplies();

// Fetches data from the db
async function fetchSupplies() {
    // Calls the API and put data into an array
    const apiUrl = 'http://localhost:8080/supplies';
    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data;

    // Updates the list
    itemsList.innerHTML = '';
    product_input.value = "";
    quantity_input.value = "";
    deliveryDate_input.value = "";
    exhaustionDate_input.value = "";

    editNewProduct.value = "";
    editNewQuantity.value = "";
    editNewDeliveryDate.value = "";
    editNewExhaustionDate.value = "";

    products.forEach((product) => {
        let dDateToFormat = new Date(product.deliveryDate);
        let dDate = stringToDate(dDateToFormat);
        let eDateToFormat = new Date(product.exhaustionDate);
        let eDate = "da finire";
        let duration = null;
        if (product.exhaustionDate != null) {
            duration = diffOfDates(dDateToFormat, eDateToFormat);
        }

        const template = buildTemplateHTML(
            product.id,
            product.product,
            product.quantity,
            dDate,
            eDate,
            duration
        );
        itemsList.innerHTML += template;
    });
    activateDeleteButtons();
    activateModifyButtons()
    showAlarms()
}

function showAlarms() {

    // Shows alarm if quantity is 0
    products.forEach(item => {
        if (item.quantity <= 0) {
            const element = document.getElementById(`${item.id}`).querySelector('.toFinish');
            element.style.color = 'red';
        }
    })
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

function diffOfDates(deliveryDate, exhaustionDate) {
    const diffTime = exhaustionDate - deliveryDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));    
    return diffDays;
}

// Add a new item to the list and to the local storage
add_btn.addEventListener('click', function () {

    // gets the parameters from the inputs
    let product = product_input.value.trim();
    let quantity = quantity_input.value;
    let deliveryDate = deliveryDate_input.value;
    let exhaustionDate = exhaustionDate_input.value;
    let duration = "da finire";

    if (exhaustionDate != null || exhaustionDate != "") {
        let dDateToFormat = new Date(deliveryDate);
        let dDate = stringToDate(dDateToFormat);
        let eDateToFormat = new Date(exhaustionDate);
        let eDate = stringToDate(eDateToFormat);

        duration = diffOfDates(dDate, eDate);
    }

    // puts the parameters into a new object 
    let itemToAdd = {
        product: product,
        quantity: quantity,
        deliveryDate: deliveryDate,
        exhaustionDate: exhaustionDate,
        duration: duration
    }

    // checks if every field is compiled
    if (product.length == 0 || quantity == 0 || deliveryDate == 0) {
        return;
    } else {
        addToDB(itemToAdd);
    }
});

async function addToDB(itemToAdd) {
    const response = await fetch('http://localhost:8080/supplies', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemToAdd)
    });

    fetchSupplies();
}

// Delete the selected items from list
function activateDeleteButtons() {
    const checks = document.querySelectorAll('.delete-btn');

    for (let i = 0; i < checks.length; i++) {
        checks[i].addEventListener('click', function () {
            let id = checks[i].id;
            deleteSupply(id);
        });
    };
}

async function deleteSupply(id) {

    await fetch(`http://localhost:8080/supplies/${id}`, {
        method: 'DELETE'
    });
    fetchSupplies();
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
    const response = await fetch(`http://localhost:8080/supplies/${id}`);
    const data = await response.json();

    editNewProduct.value = data.product;
    editNewQuantity.value = data.quantity;
    editNewDeliveryDate.value = data.deliveryDate;
    editNewExhaustionDate.value = data.exhaustionDate;
}

async function modifySupply() {

    let duration = null;

    if (editNewExhaustionDate.value != null) {
        let dDate = stringToDate(editNewDeliveryDate);
        let eDate = stringToDate(editNewExhaustionDate);
        duration = diffOfDates(dDate, eDate);
    }

    let itemToModify = {
        id: modify_id,
        product: editNewProduct.value,
        quantity: editNewQuantity.value,
        deliveryDate: editNewDeliveryDate.value,
        exhaustionDate: editNewExhaustionDate.value,
        duration: duration
    }

    editBox.style.visibility = "hidden";
    addBox.style.visibility = "visible";

    await fetch(`http://localhost:8080/supplies/${modify_id}`, {
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

    fetchSupplies();
}

// Creates HTML to add a new item in the list
function buildTemplateHTML(id, product, quantity, deliveryDate, exhaustionDate, duration) {

    return `
                <ul class="newItem" id=${id}>
                    <li class="product-item">${product}</li>
                    <li class="quantity-item toFinish">${quantity}</li>
                    <li class="deliveryDate-item">${deliveryDate}</li>
                    <li class="exhaustionDate-item">${exhaustionDate}</li>
                    <li class="duration-item">${duration} giorni</li>
                    <li class="modify-item"><button class="modify-btn" id="${id}"><img src="images/edit.svg"></button><button class="delete-btn" id="${id}"><img src="images/trash.svg"></button></li>
                </ul>
    `
}

let index = false;

// Fetches data from the db ordered by product
async function orderBy(order) {
    let apiUrl = "";
    if (index == false) {
        apiUrl = `http://localhost:8080/supplies?orderBy=${order}`;
    } else {
        apiUrl = `http://localhost:8080/supplies?orderByDesc=${order}`;
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
        let eDateToFormat = new Date(product.exhaustionDate);
        let eDate = stringToDate(eDateToFormat);

        const template = buildTemplateHTML(
            product.id,
            product.product,
            product.quantity,
            dDate,
            eDate,
            duration
        );
        itemsList.innerHTML += template;
    });
    activateDeleteButtons();
    activateModifyButtons();
    showAlarms();
}

async function goTo(section) {
    console.log(section);
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