const apiUrl = "https://fakestoreapi.com/products";
const productList = document.getElementById("productList");
const filterButtons = document.getElementById("filterButtons");
let produtos = [];

async function loadProducts() {
    const response = await fetch(apiUrl);
    produtos = await response.json();
    
    createFilterButtons();
    showProducts(produtos);
}

function showProducts(lista) {
    productList.innerHTML = "";

    lista.forEach(produto => {
        productList.innerHTML += `
            <div class="card">
                <img src="${produto.image}" alt="${produto.title}">
                <h3>${produto.title}</h3>
                <p class="price">R$ ${produto.price.toFixed(2)}</p>
            </div>
        `;
    });
}

function createFilterButtons() {
    const categorias = [...new Set(produtos.map(p => p.category))];

    filterButtons.innerHTML = `
        <button data-cat="all">Todos</button>
    `;

    categorias.forEach(cat => {
        filterButtons.innerHTML += `
            <button data-cat="${cat}">${cat}</button>
        `;
    });

    const buttons = filterButtons.querySelectorAll("button");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const categoria = btn.getAttribute("data-cat");

            if (categoria === "all") {
                showProducts(produtos);
            } else {
                const filtrados = produtos.filter(p => p.category === categoria);
                showProducts(filtrados);
            }
        });
    });
}

loadProducts();