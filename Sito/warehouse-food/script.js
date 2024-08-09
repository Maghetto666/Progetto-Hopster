const warehouse_icon = document.querySelector('.warehouse-icon');
const suppliers_icon = document.querySelector('.suppliers-icon');
const invoices_icon = document.querySelector('.invoices-icon');
const warehouse_btn = document.querySelector('.warehouse-btn');
const suppliers_btn = document.querySelector('.suppliers-btn');
const invoices_btn = document.querySelector('.invoices-btn');
const foods_icon = document.querySelector('.foods-icon');
const drinks_icon = document.querySelector('.drinks-icon');
const beers_icon = document.querySelector('.beers-icon');
const supplies_icon = document.querySelector('.supplies-icon');
const foods_btn = document.querySelector('.foods-btn');
const drinks_btn = document.querySelector('.drinks-btn');
const beers_btn = document.querySelector('.beers-btn');
const supplies_btn = document.querySelector('.supplies-btn');
const itemsList = document.querySelector('.itemsList');

const product_input = document.querySelector('.product-input');
const quantity_input = document.querySelector('.quantity-input');
const deliveryDate_input = document.querySelector('.deliveryDate-input');
const expiringDate_input = document.querySelector('.expiringDate-input');
const frozenCheckbox = document.querySelector('.frozenCheckbox');
const frozenDate_input = document.querySelector('.frozenDate-input');
const add_btn = document.querySelector('.add-btn');
const delete_btn = document.querySelector('.delete-btn');

const newItems = document.querySelectorAll('.newItem');

var items = [];

frozenDate_input.disabled = true;

// Recupera dai dal local storage
const STORAGE_KEY = 'foods-key';
let products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let index = products.length;
console.log(index);
// Mostra il contenuto della lista
showContent();

frozenCheckbox.addEventListener('click', function () {
    if (frozenDate_input.disabled == true) {
        frozenDate_input.disabled = false;
    } else {
        frozenDate_input.disabled = true;
    }
});

add_btn.addEventListener('click', function () {
    let product = product_input.value.trim();
    let quantity = quantity_input.value;
    let deliveryDate = deliveryDate_input.value;
    let expiringDate = expiringDate_input.value;
    let frozenDate = frozenDate_input.value;
    const id = index;

    itemToAdd = {
        product: product,
        quantity: quantity,
        deliverDate: deliveryDate,
        checked: frozenCheckbox.checked,
        frozenDate: frozenDate,
        expiringDate: expiringDate,
        itemID: id
    }

    if (frozenCheckbox.checked == true) {
        frozenDate_input.required = true;
        if (product.length == 0 || quantity == 0 || deliveryDate == 0 || expiringDate == 0 || frozenDate == 0) {
            return;
        } else {
            const template = buildTemplateHTML(product, quantity, deliveryDate, expiringDate, frozenDate, id);
            itemsList.innerHTML += template;
            index++;
            items.push(itemToAdd);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            
        }
    } else {
        frozenDate_input.required = false;
        if (product.length == 0 || quantity == 0 || deliveryDate == 0 || expiringDate == 0) {
            return;
        } else {
            const template = buildTemplateHTML(product, quantity, deliveryDate, expiringDate, frozenDate, id);
            itemsList.innerHTML += template;
            index++;
            items.push(itemToAdd);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
           
        }
    }
    showContent();
});

delete_btn.addEventListener('click', function () {

    newItems.forEach((item) => {
        const checkBox = item.querySelector('.checkbox');
        let checked = checkBox.checked;
        if (checked == true) {
            console.log("true");
            item.innerHTML = "";
        } else {
            console.log("false");
            return;
        }
    })
})

// Funzione che aggiorna il contenuto della lista
function showContent() {
   
    itemsList.innerHTML = '';
           
        products.forEach((product) => {
            const template = buildTemplateHTML(product.product,
                product.quantity,
                product.deliverDate,
                product.checked,
                product.expiringDate,
                product.frozenDate,
                product.itemID
            );

            itemsList.innerHTML += template;
        })
    
}

// Funzione che genera l'HTML per attività
function buildTemplateHTML(typedProduct, typedQuantity, typedDeliveryDate, checked, typedExpiringDate, typedFrozenDate, id) {



    if (checked == true) {
        frozenDate_input.required = true;

        return `
                <ul class="newItem" id="${id}">
                    <li class="checkbox-item"><input type="checkbox" class="checkbox"></li>
                    <li class="product-item">${typedProduct}</li>
                    <li class="quantity-item">${typedQuantity}</li>
                    <li class="deliveryDate-item">${typedDeliveryDate}</li>
                    <li class="expiringDate-item">${typedExpiringDate}</li>
                    <li class="frozen-item"><input type="checkbox" checked disabled></li>
                    <li class="frozenDate-item">${typedFrozenDate}</li>
                    <li class="modify-item"><button class="modify-btn">Modifica</button></li>
                </ul>
    `
    } else {

        return `
                <ul class="newItem" id="${id}">
                    <li class="checkbox-item"><input type="checkbox" class="checkbox"></li>
                    <li class="product-item">${typedProduct}</li>
                    <li class="quantity-item">${typedQuantity}</li>
                    <li class="deliveryDate-item">${typedDeliveryDate}</li>
                    <li class="expiringDate-item">${typedExpiringDate}</li>
                    <li class="frozen-item"><input type="checkbox" disabled></li>
                    <li class="frozenDate-item" disabled></li>
                    <li class="modify-item"><button class="modify-btn">Modifica</button></li>
                </ul>
    `
    }


}

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