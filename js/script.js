function Product(name, quantity) {
    this.name = name;
    this.quantity = quantity;
    this.mark = 0;
}

let products = [];
let localStorageString = localStorage.getItem('products');
let currentList = products.slice();
if (localStorageString !== null) {
    products = JSON.parse(localStorageString);
    getProducts();
    generateList(currentList);
}

function addProduct() {
    const productName = document.getElementById('inputName');
    const name = productName.value;
    const quantityOfProduct = document.getElementById('inputQuantity');
    const quantity = parseInt(quantityOfProduct.value);

    const product = new Product(name, quantity);
    if (name && quantity) {
        products.push(product);
    }
    getProducts();
    generateList(currentList);
}

function removeProduct(index) { ///+
    products.splice(index,1);
    getProducts();
    generateList(products);
}

function searchByName(value) {
    let a = products.indexOf(products.find(item => item.name === value));
    alert("The index of item is: " + a);
    return a;
}

function updateList() { ////////////
    localStorage.setItem('products', JSON.stringify(products));
    getProducts();
}

function generateList(currentList) {
    getProducts();
    const list = document.createElement('ul');
    list.className = "list-group";
    if (currentList) {

        for (let productIndex in currentList) {
            const productEl = document.createElement('li');
            const name = document.createElement('span');
            const quantity = document.createElement('span');
            const status = document.createElement('span');
            const deleteProduct = document.createElement('button');

            if (currentList[productIndex].mark !== 0) {
                status.innerText = "Sold";
                status.className = "statusIcon badge badge-danger col-2";

            } else {
                status.innerText = "Available";
                status.className = "statusIcon badge badge-success badge-pill col-2 ";
            }

            name.className = "product col-5";
            quantity.className = "quantity badge badge-secondary badge-pill col-1";

            deleteProduct.className = "deleteProduct btn btn-outline-warning col-1 sticky-right";
            productEl.className = "list-group-item d-flex justify-content-between align-items-center row border-warning";


            status.id = "statusOfProduct";
            deleteProduct.id = "deleteProduct";
            productEl.id = "productEl";

            name.innerText = currentList[productIndex].name;
            quantity.innerText = JSON.stringify(currentList[productIndex].quantity);
            deleteProduct.innerText = "X";

            productEl.appendChild(name);
            productEl.appendChild(quantity);
            productEl.appendChild(status);
            productEl.appendChild(deleteProduct);

            status.onclick = () => {
                status.className = "statusIcon badge badge-danger col-2";
                changeStatus(productIndex);
                getProducts();
                generateList(currentList);
            };

            deleteProduct.onclick = () => {
                removeProduct(productIndex);
            };

            list.appendChild(productEl);
        }
    }
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';
    productsList.appendChild(list);
    updateList();
}

function changeStatus(index) {
    products[index].mark = 1;
    generateList(products);
    updateList();

}

function getProducts() {
    currentList = products.slice();
}

function sortForm() {
    const dropdownMenu = document.getElementById("dropdown-menu");
    const sortLowToHigh = document.createElement('a');
    const sortHighToLow = document.createElement('a');
    const listByDefault = document.createElement('a');

    sortLowToHigh.innerText = "Low to High";
    sortLowToHigh.className = "dropdown-item";

    sortHighToLow.innerText = "High to Low";
    sortHighToLow.className = "dropdown-item";

    listByDefault.innerText = "Random";
    listByDefault.className = "dropdown-item";

    sortLowToHigh.onclick = () => {
        products.sort((a, b) => a.quantity > b.quantity ? 1 : -1);
        generateList(products);
    };

    sortHighToLow.onclick = () => {
        products.sort((a, b) => a.quantity < b.quantity ? 1 : -1);
        generateList(products);
    };

    listByDefault.onclick = () => {
        products.sort(() => Math.random() - 0.5);
        generateList(products);
    };

    dropdownMenu.appendChild(sortLowToHigh);
    dropdownMenu.appendChild(sortHighToLow);
    dropdownMenu.appendChild(listByDefault);
}

function inputForm() {
    const nameLabel = document.createElement('label');
    nameLabel.innerText = "Name";
    nameLabel.className = "nameLabel mr-2";

    const inputName = document.createElement('input');
    inputName.type = "text";
    inputName.id = "inputName";
    inputName.className = "form-control";

    const quantityLabel = document.createElement('label');
    quantityLabel.innerText = "Quantity";
    quantityLabel.className = "quantityLabel ml-3 pr-2";

    const inputQuantity = document.createElement('input');
    inputQuantity.type = "text";
    inputQuantity.id = "inputQuantity";
    inputQuantity.className = "form-control";

    const addButton = document.getElementById('addButton');
    addButton.onclick = () => {
        addProduct();
        inputName.value = '';
        inputQuantity.value ='';
    };

    const addForm = document.getElementById('addForm');
    addForm.className = "form-group form-inline";

    addForm.appendChild(nameLabel);
    addForm.appendChild(inputName);
    addForm.appendChild(quantityLabel);
    addForm.appendChild(inputQuantity);
}

function searchForm() {
    const searchInput = document.createElement('input');
    searchInput.type = "text";
    searchInput.id = "inputSearch";
    searchInput.placeholder = "Search";
    searchInput.className = "form-control";

    const searchButton = document.createElement('button');
    searchButton.className = "searchButton btn btn-primary ml-1";
    searchButton.innerText = "Find";

    searchButton.onclick = () => {
        searchByName(searchInput.value);
        searchInput.value = '';
    };

    const searchForm = document.getElementById('searchForm');
    searchForm.className = "form-group has-search";
    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);
}
searchForm();
inputForm();
sortForm();
generateList(products);

