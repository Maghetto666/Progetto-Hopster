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