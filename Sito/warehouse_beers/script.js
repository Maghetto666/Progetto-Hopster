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
const brewery_input = document.querySelector('.brewery-input');
const beerName_input = document.querySelector('.beerName-input');
const quantity_input = document.querySelector('.quantity-input');
const beerStyle_input = document.querySelector('.beerStyle-input');
const barrelTypeAndTap_input = document.querySelector('.barrelTypeAndTap-input');
const deliveryDate_input = document.querySelector('.deliveryDate-input');
const fullBarrelDate_input = document.querySelector('.fullBarrelDate-input');
const emptyBarrelDate_input = document.querySelector('.emptyBarrelDate-input');

// Edit box input fields
const editNewBrewery = document.querySelector('.editNewBrewery');
const editNewBeerName = document.querySelector('.editNewBeerName');
const editNewQuantity = document.querySelector('.editNewQuantity');
const editNewBeerStyle = document.querySelector('.editNewBeerStyle');
const editNewBarrelTypeAndTap = document.querySelector('.editNewBarrelTypeAndTap');
const editNewDeliveryDate = document.querySelector('.editNewDeliveryDate');
const editNewFullBarrelDate = document.querySelector('.editNewFullBarrelDate');
const editNewEmptyBarrelDate = document.querySelector('.editNewEmptyBarrelDate');

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
fetchBeers();

// Fetches data from the db
async function fetchBeers() {
    // Calls the API and put data into an array
    const apiUrl = 'http://localhost:8080/beers';
    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data;


    // Updates the list
    itemsList.innerHTML = '';
    brewery_input.value = '';
    beerName_input.value = '';
    quantity_input.value = "";
    beerStyle_input.value = '';
    barrelTypeAndTap_input.value = '';
    deliveryDate_input.value = "";
    fullBarrelDate_input.value = '';
    emptyBarrelDate_input.value = '';

    editNewBrewery.value = '';
    editNewBeerName.value = '';
    editNewQuantity.value = "";
    editNewBeerStyle.value = '';
    editNewBarrelTypeAndTap.value = '';
    editNewDeliveryDate.value = "";
    editNewFullBarrelDate.value = '';
    editNewEmptyBarrelDate.value = '';

    products.forEach((product) => {
        let dDateToFormat = new Date(product.deliveryDate);
        let dDate = stringToDate(dDateToFormat);

        let fDateToFormat = new Date(product.fullBarrelDate);
        let fDate = "da attaccare";
        if (product.fullBarrelDate != null) {
            fDate = stringToDate(fDateToFormat);
        }
        let eDateToFormat = new Date(product.emptyBarrelDate);
        let eDate = "da finire";
        if (product.emptyBarrelDate != null) {
            eDate = stringToDate(eDateToFormat);
        }

        const template = buildTemplateHTML(
            product.id,
            product.brewery,
            product.beerName,
            product.quantity,
            product.beerStyle,
            product.barrelTypeAndTap,
            dDate,
            fDate,
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

    // Shows alarm if the barrel has been open for more then 20 days
    products.forEach(item => {
        if (item.fullBarrelDate != null) {
            date = new Date(item.fullBarrelDate);
            if (today - date > limit) {
                const element = document.getElementById(item.id).querySelector('.toExpire');
                element.style.color = 'red';
            }
        }
    })

    // Shows alarm if quantity is 0
    products.forEach(item => {
        if (item.quantity == 0) {
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
    let brewery = brewery_input.value.trim();
    let beerName = beerName_input.value.trim();
    let quantity = quantity_input.value;
    let beerStyle = beerStyle_input.value;
    let barrelTypeAndTap = barrelTypeAndTap_input.value;
    let deliveryDate = deliveryDate_input.value;
    let fullBarrelDate = fullBarrelDate_input.value;
    let emptyBarrelDate = emptyBarrelDate_input.value;

    // puts the parameters into a new object 
    let itemToAdd = {
        brewery: brewery,
        beerName: beerName,
        quantity: quantity,
        beerStyle: beerStyle,
        barrelTypeAndTap: barrelTypeAndTap,
        deliveryDate: deliveryDate,
        fullBarrelDate: fullBarrelDate,
        emptyBarrelDate: emptyBarrelDate
    }

    // checks if every field is compiled
    if (brewery.length == 0 || beerName.length == 0 || quantity == 0 || beerStyle == 0 || deliveryDate == 0) {
        return;
    } else {
        addToDB(itemToAdd);
    }
});

async function addToDB(itemToAdd) {
    const response = await fetch('http://localhost:8080/beers', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            brewery: itemToAdd.brewery,
            beerName: itemToAdd.beerName,
            quantity: itemToAdd.quantity,
            beerStyle: itemToAdd.beerStyle,
            barrelTypeAndTap: itemToAdd.barrelTypeAndTap,
            deliveryDate: itemToAdd.deliveryDate,
            fullBarrelDate: itemToAdd.fullBarrelDate,
            emptyBarrelDate: itemToAdd.emptyBarrelDate
        })
    });

    fetchBeers();
}

// Delete the selected items from list
function activateDeleteButtons() {
    const checks = document.querySelectorAll('.delete-btn');

    for (let i = 0; i < checks.length; i++) {
        checks[i].addEventListener('click', function () {
            let id = checks[i].id;
            deleteBeer(id);
        });
    };
}

async function deleteBeer(id) {

    await fetch(`http://localhost:8080/beers/${id}`, {
        method: 'DELETE'
    });
    fetchBeers();
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
    const response = await fetch(`http://localhost:8080/beers/${id}`);
    const data = await response.json();


    editNewBrewery.value = data.brewery;
    editNewBeerName.value = data.beerName;
    editNewQuantity.value = data.quantity;
    editNewBeerStyle.value = data.beerStyle;
    editNewBarrelTypeAndTap.value = data.barrelTypeAndTap;
    editNewDeliveryDate.value = data.deliveryDate;
    editNewFullBarrelDate.value = data.fullBarrelDate;
    editNewEmptyBarrelDate.value = data.emptyBarrelDate;

    console.log(editNewBrewery.value);
}

async function modifyBeer() {

    let itemToModify = {
        id: modify_id,
        brewery: editNewBrewery.value.trim(),
        beerName: editNewBeerName.value.trim(),
        quantity: editNewQuantity.value,
        beerStyle: editNewBeerStyle.value.trim(),
        barrelTypeAndTap: editNewBarrelTypeAndTap.value.trim(),
        deliveryDate: editNewDeliveryDate.value,
        fullBarrelDate: editNewFullBarrelDate.value,
        emptyBarrelDate: editNewEmptyBarrelDate.value
    }

    editBox.style.visibility = "hidden";
    addBox.style.visibility = "visible";

    await fetch(`http://localhost:8080/beers/${modify_id}`, {
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

    fetchBeers();
}

// Creates HTML to add a new item in the list
function buildTemplateHTML(id, brewery, beerName, quantity, beerStyle, barrelTypeAndTap, deliveryDate, fullBarrelDate, emptyBarrelDate) {

    return `
                <ul class="newItem" id=${id}>
                    <li class="brewery-item">${brewery}</li>
                    <li class="beerName-item">${beerName}</li>
                    <li class="quantity-item toFinish">${quantity}</li>
                    <li class="beerStyle-item">${beerStyle}</li>
                    <li class="barrelTypeAndTap-item">${barrelTypeAndTap}</li>
                    <li class="deliveryDate-item">${deliveryDate}</li>
                    <li class="fullBarrelDate-item toExpire">${fullBarrelDate}</li>
                    <li class="emptyBarrelDate-item">${emptyBarrelDate}</li>
                    <li class="modify-item"><button class="modify-btn" id="${id}"><img src="images/edit.svg"></button><button class="delete-btn" id="${id}"><img src="images/trash.svg"></button></li>
                </ul>
    `
}

let index = false;

// Fetches data from the db ordered by product
async function orderBy(order) {
    let apiUrl = "";
    if (index == false) {
        apiUrl = `http://localhost:8080/beers?orderBy=${order}`;
    } else {
        apiUrl = `http://localhost:8080/beers?orderByDesc=${order}`;
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

        let fDateToFormat = new Date(product.fullBarrelDate);
        let fDate = "da attaccare";
        if (product.fullBarrelDate != null) {
            fDate = stringToDate(fDateToFormat);
        }
        let eDateToFormat = new Date(product.emptyBarrelDate);
        let eDate = "da finire";
        if (product.emptyBarrelDate != null) {
            eDate = stringToDate(eDateToFormat);
        }

        const template = buildTemplateHTML(
            product.id,
            product.brewery,
            product.beerName,
            product.quantity,
            product.beerStyle,
            product.barrelTypeAndTap,
            dDate,
            fDate,
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