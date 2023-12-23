let forMenButton = document.getElementById('forMen');
let forWomenButton = document.getElementById('forWomen');
let forKidsButton = document.getElementById('forKids');

let clothes = document.getElementById('clothes');
let clothesCards = document.getElementById('clothesCards');
let loader = document.getElementById('loader');

forMenButton.setAttribute('class', 'clothes-categories-active-button');
forWomenButton.setAttribute('class', 'clothes-categories-hide-button');
forKidsButton.setAttribute('class', 'clothes-categories-hide-button');

function displayProduct(product) {
    let card = document.createElement('div');
    card.setAttribute('class', 'card');
    clothesCards.appendChild(card);

    let imageContainer = document.createElement('div');
    imageContainer.setAttribute('class', 'image-container');
    card.appendChild(imageContainer);

    let firstImage = document.createElement('img');
    firstImage.setAttribute('class', 'image-1');
    firstImage.setAttribute('src', `${product.image}`);
    firstImage.setAttribute('alt', `${product.title}`);
    imageContainer.appendChild(firstImage);

    let secondImage = document.createElement('img');
    if (product.second_image !== 'empty') {
        secondImage.setAttribute('class', 'image-1');
        secondImage.setAttribute('src', `${product.second_image}`);
        secondImage.setAttribute('alt', `${product.title}`);
        imageContainer.appendChild(secondImage);
    };

    let tag = document.createElement('span');
    tag.setAttribute('class', 'tag');
    if (product.badge_text) {
        tag.textContent = `${product.badge_text}`
        imageContainer.appendChild(tag);
    };

    let title = document.createElement('p');
    title.setAttribute('class', 'title');
    title.innerHTML = `${product.title}<span class="vendor">&nbsp; • &nbsp;${product.vendor}</span>`
    card.appendChild(title);

    let productPrice = parseFloat(product.price).toFixed(2);
    let compareAtPrice = parseFloat(product.compare_at_price).toFixed(2);
    let discountCalculation = Math.round(((compareAtPrice - productPrice) / compareAtPrice) * 100);

    let discount = ""
    if (discountCalculation > 0) {
        discount = `&nbsp;${discountCalculation}% Off`
    }

    let priceContainer = document.createElement('div');
    priceContainer.setAttribute('class', 'price-container');
    priceContainer.innerHTML = `
        <span class="price">Rs ${productPrice}&nbsp;</span>&nbsp;
        <span class="compare-price">${compareAtPrice}</span>&nbsp;
        <span class="discount">&nbsp;${discount}</span>
    `;
    card.appendChild(priceContainer);

    let cartButton = document.createElement('button');
    cartButton.setAttribute('class', 'cart-button');
    cartButton.setAttribute('type', 'button');
    cartButton.textContent = "Add to Cart";
    card.appendChild(cartButton);
}

function categoryProductsResult(categoryProducts) {
    for (let product of categoryProducts) {
        displayProduct(product);
    }
};

function getResults(categories) {
    clothes.removeChild(loader);

    categoryProductsResult(categories[0].category_products);

    forMenButton.addEventListener('click', () => {
        forMenButton.setAttribute('class', 'clothes-categories-active-button');
        forMenButton.textContent = "👱‍♂️ Men";
        forWomenButton.setAttribute('class', 'clothes-categories-hide-button');
        forWomenButton.textContent = "Women";
        forKidsButton.setAttribute('class', 'clothes-categories-hide-button');
        forKidsButton.textContent = "Kids";

        clothesCards.textContent = "";
        categoryProductsResult(categories[0].category_products);
    });

    forWomenButton.addEventListener('click', () => {
        forMenButton.setAttribute('class', 'clothes-categories-hide-button');
        forMenButton.textContent = "Men";
        forWomenButton.setAttribute('class', 'clothes-categories-active-button');
        forWomenButton.textContent = "👱‍♀️ Women";
        forKidsButton.setAttribute('class', 'clothes-categories-hide-button');
        forKidsButton.textContent = "Kids";

        clothesCards.textContent = "";
        categoryProductsResult(categories[1].category_products);
    });

    forKidsButton.addEventListener('click', () => {
        forMenButton.setAttribute('class', 'clothes-categories-hide-button');
        forMenButton.textContent = "Men";
        forWomenButton.setAttribute('class', 'clothes-categories-hide-button');
        forWomenButton.textContent = "Women";
        forKidsButton.setAttribute('class', 'clothes-categories-active-button');
        forKidsButton.textContent = "👶 Kids";

        clothesCards.textContent = "";
        categoryProductsResult(categories[2].category_products);
    });
};

let url = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
let options = {
    method: 'GET'
};

fetch(url, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        let {
            categories
        } = jsonData;
        getResults(categories);
    });
