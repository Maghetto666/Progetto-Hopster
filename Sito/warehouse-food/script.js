// Upper buttons and icons
const warehouse_icon = document.querySelector('.warehouse-icon');
const suppliers_icon = document.querySelector('.suppliers-icon');
const invoices_icon = document.querySelector('.invoices-icon');
const warehouse_btn = document.querySelector('.warehouse-btn');
const suppliers_btn = document.querySelector('.suppliers-btn');
const invoices_btn = document.querySelector('.invoices-btn');

// Bottom buttons and icons
const foods_icon = document.querySelector('.foods-icon');
const drinks_icon = document.querySelector('.drinks-icon');
const beers_icon = document.querySelector('.beers-icon');
const supplies_icon = document.querySelector('.supplies-icon');
const foods_btn = document.querySelector('.foods-btn');
const drinks_btn = document.querySelector('.drinks-btn');
const beers_btn = document.querySelector('.beers-btn');
const supplies_btn = document.querySelector('.supplies-btn');
const itemsList = document.querySelector('.itemsList');

// Input fields
const product_input = document.querySelector('.product-input');
const quantity_input = document.querySelector('.quantity-input');
const deliveryDate_input = document.querySelector('.deliveryDate-input');
const expiringDate_input = document.querySelector('.expiringDate-input');
const frozenCheckbox = document.querySelector('.frozenCheckbox');
const frozenDate_input = document.querySelector('.frozenDate-input');
frozenDate_input.disabled = true;

// Main page buttons
const add_btn = document.querySelector('.add-btn');
const delete_btn = document.querySelector('.delete-btn');

// Starters
const STORAGE_KEY = 'foods-key';
let products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
showContent();

// Toggle the frozen date checkbox
frozenCheckbox.addEventListener('click', function () {
    if (frozenDate_input.disabled == true) {
        frozenDate_input.disabled = false;
    } else {
        frozenDate_input.disabled = true;
    }
});

// Add a new item to the list and to the local storage
add_btn.addEventListener('click', function () {

    // gets the parameters from the inputs
    let product = product_input.value.trim();
    let quantity = quantity_input.value;
    let deliveryDate = deliveryDate_input.value;
    let expiringDate = expiringDate_input.value;
    let checked = frozenCheckbox.checked;
    let frozenDate = frozenDate_input.value;
    let itemID = products.length;

    // puts the parameters into a new object 
    itemToAdd = {
        product: product,
        quantity: quantity,
        deliverDate: deliveryDate,
        expiringDate: expiringDate,
        checked: checked,
        frozenDate: frozenDate,
        itemID: itemID
    }

    // checks if the frozen date checkbox is active or not
    if (frozenCheckbox.checked == true) {

        // puts a required label on the frozen date input in case
        frozenDate_input.required = true;

        // checks if every fields is compiled
        if (product.length == 0 || quantity == 0 || deliveryDate == 0 || expiringDate == 0 || frozenDate == 0) {
            return;
        } else {
            // adds the new item to the list and to the local storage
            const template = buildTemplateHTML(product, quantity, deliveryDate, expiringDate, checked, frozenDate, itemID);
            itemsList.innerHTML += template;
            products.push(itemToAdd);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        }
    } else {
        frozenDate_input.required = false;
        if (product.length == 0 || quantity == 0 || deliveryDate == 0 || expiringDate == 0) {
            return;
        } else {
            const template = buildTemplateHTML(product, quantity, deliveryDate, expiringDate, checked, frozenDate, itemID);
            itemsList.innerHTML += template;
            products.push(itemToAdd);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        }
    }

    // updates the list
    showContent;
});

// TODO - Delete the selected items from list and local storage
delete_btn.addEventListener('click', function () {
    const newItems = document.querySelectorAll('.newItem');
    newItems.forEach((item) => {
        let checkBox = item.querySelector('.checkbox');
        let checkactive = checkBox.checked;
        if (checkactive === true) {
            let i = item.id;            
            if (i > -1) {
                products.splice(i, 1);
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        } else {
            return;
        };
        showContent();
    })
})

// Updates the list content
function showContent() {

    itemsList.innerHTML = '';

    products.forEach((product, index) => {
        const template = buildTemplateHTML(product.product,
            product.quantity,
            product.deliverDate,
            product.expiringDate,
            product.checked,
            product.frozenDate,
            index
        );
        itemsList.innerHTML += template;
    })

}

// Creates HTML to add a new item in the list
function buildTemplateHTML(typedProduct, typedQuantity, typedDeliveryDate, typedExpiringDate, checked, typedFrozenDate, id) {

    if (checked == true) {
        frozenDate_input.required = true;
        return `
                <ul class="newItem" id="${id}">
                    <li class="checkbox-item" id="${id}"><input type="checkbox" class="checkbox"></li>
                    <li class="product-item" id="${id}">${typedProduct}</li>
                    <li class="quantity-item" id="${id}">${typedQuantity}</li>
                    <li class="deliveryDate-item" id="${id}">${typedDeliveryDate}</li>
                    <li class="expiringDate-item" id="${id}">${typedExpiringDate}</li>
                    <li class="frozen-item" id="${id}"><input type="checkbox" checked disabled></li>
                    <li class="frozenDate-item" id="${id}">${typedFrozenDate}</li>
                    <li class="modify-item" id="${id}"><button class="modify-btn">Modifica</button></li>
                </ul>
    `
    } else {
        return `
                <ul class="newItem" id="${id}">
                    <li class="checkbox-item" id="${id}"><input type="checkbox" class="checkbox"></li>
                    <li class="product-item" id="${id}">${typedProduct}</li>
                    <li class="quantity-item" id="${id}">${typedQuantity}</li>
                    <li class="deliveryDate-item" id="${id}">${typedDeliveryDate}</li>
                    <li class="expiringDate-item" id="${id}">${typedExpiringDate}</li>
                    <li class="frozen-item" id="${id}"><input type="checkbox" disabled></li>
                    <li class="frozenDate-item" id="${id}" disabled></li>
                    <li class="modify-item" id="${id}"><button class="modify-btn">Modifica</button></li>
                </ul>
    `
    }


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