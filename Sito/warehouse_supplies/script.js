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
const brand_input = document.querySelector('.brand-input');
const quantity_input = document.querySelector('.quantity-input');
const deliveryDate_input = document.querySelector('.deliveryDate-input');
const expiringDate_input = document.querySelector('.expiringDate-input');

// Edit box input fields
const editNewProduct = document.querySelector('.editNewProduct');
const editNewBrand = document.querySelector('.editNewBrand');
const editNewQuantity = document.querySelector('.editNewQuantity');
const editNewDeliveryDate = document.querySelector('.editNewDeliveryDate');
const editNewExpiringDate = document.querySelector('.editNewExpiringDate');

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
fetchDrinks();

// Fetches data from the db
async function fetchDrinks() {
    // Calls the API and put data into an array
    const apiUrl = 'http://localhost:8080/drinks';
    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data;

    // Updates the list
    itemsList.innerHTML = '';
    product_input.value = "";
    brand_input.value = "";
    quantity_input.value = "";
    deliveryDate_input.value = "";
    expiringDate_input.value = "";

    editNewProduct.value = "";
    editNewBrand.value = "";
    editNewQuantity.value = "";
    editNewDeliveryDate.value = "";
    editNewExpiringDate.value = "";

    products.forEach((product) => {
        let dDateToFormat = new Date(product.deliveryDate);
        let dDate = stringToDate(dDateToFormat);
        let eDateToFormat = new Date(product.expirationDate);
        let eDate = stringToDate(eDateToFormat);

        const template = buildTemplateHTML(
            product.id,
            product.product,
            product.brand,
            product.quantity,
            dDate,
            eDate
        );
        itemsList.innerHTML += template;
    });
    activateDeleteButtons();
    activateModifyButtons()
    showAlarms()
}

function showAlarms() {
    let today = new Date();
    let limit = 2 * 24 * 60 * 60 * 1000;

    // Shows alarm if the expiration time is close to 2 days
    products.forEach(item => {
        date = new Date(item.expirationDate);
        if (date - today < limit) {
            const element = document.getElementById(item.id).querySelector('.toExpire');
            element.style.color = 'red';
        }
    })

    // Shows alarm if quantity is 5 or less
    products.forEach(item => {
        if (item.quantity <= 5) {
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

// Add a new item to the list and to the local storage
add_btn.addEventListener('click', function () {

    // gets the parameters from the inputs
    let product = product_input.value.trim();
    let brand = brand_input.value.trim();
    let quantity = quantity_input.value;
    let deliveryDate = deliveryDate_input.value;
    let expiringDate = expiringDate_input.value;

    // puts the parameters into a new object 
    let itemToAdd = {
        product: product,
        brand: brand,
        quantity: quantity,
        deliveryDate: deliveryDate,
        expirationDate: expiringDate
    }

    // checks if every field is compiled
    if (product.length == 0 || brand.length == 0 || quantity == 0 || deliveryDate == 0) {
        return;
    } else {
        addToDB(itemToAdd);
    }
});

async function addToDB(itemToAdd) {
    const response = await fetch('http://localhost:8080/drinks', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product: itemToAdd.product,
            brand: itemToAdd.brand,
            quantity: itemToAdd.quantity,
            deliveryDate: itemToAdd.deliveryDate,
            expirationDate: itemToAdd.expirationDate
        })
    });

    fetchDrinks();
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

    await fetch(`http://localhost:8080/drinks/${id}`, {
        method: 'DELETE'
    });
    fetchDrinks();
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
    const response = await fetch(`http://localhost:8080/drinks/${id}`);
    const data = await response.json();
    
    editNewProduct.value = data.product;
    editNewBrand.value = data.brand;
    editNewQuantity.value = data.quantity;
    editNewDeliveryDate.value = data.deliveryDate;
    editNewExpiringDate.value = data.expirationDate;
}

async function modifyFood() {

    let itemToModify = {
        id: modify_id,
        product: editNewProduct.value,
        brand: editNewBrand.value,
        quantity: editNewQuantity.value,
        deliveryDate: editNewDeliveryDate.value,
        expirationDate: editNewExpiringDate.value
    }

    editBox.style.visibility = "hidden";
    addBox.style.visibility = "visible";

    await fetch(`http://localhost:8080/drinks/${modify_id}`, {
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

    fetchDrinks();
}

// Creates HTML to add a new item in the list
function buildTemplateHTML(id, product, brand, quantity, deliveryDate, expiringDate) {

    return `
                <ul class="newItem" id=${id}>
                    <li class="product-item">${product}</li>
                    <li class="brand-item">${brand}</li>
                    <li class="quantity-item toFinish">${quantity}</li>
                    <li class="deliveryDate-item">${deliveryDate}</li>
                    <li class="expiringDate-item toExpire">${expiringDate}</li>
                    <li class="modify-item"><button class="modify-btn" id="${id}"><img src="images/edit.svg"></button><button class="delete-btn" id="${id}"><img src="images/trash.svg"></button></li>
                </ul>
    `
}

let index = false;

// Fetches data from the db ordered by product
async function orderBy(order) {
    let apiUrl = "";
    if (index == false) {
        apiUrl = `http://localhost:8080/drinks?orderBy=${order}`;
    } else {
        apiUrl = `http://localhost:8080/drinks?orderByDesc=${order}`;
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
        let eDateToFormat = new Date(product.expirationDate);
        let eDate = stringToDate(eDateToFormat);

        const template = buildTemplateHTML(
            product.id,
            product.product,
            product.brand,
            product.quantity,
            dDate,
            eDate
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