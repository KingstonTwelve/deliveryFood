'use strict';
document.addEventListener('DOMContentLoaded', () => {

    const cartButton = document.querySelector("#cart-button");
    const modal = document.querySelector(".modal");
    const closeModal = document.querySelector(".close");

    cartButton.addEventListener("click", toggleModal);
    closeModal.addEventListener("click", toggleModal);

    function toggleModal() {
        modal.classList.toggle("is-open");
    }


    //DAY 1

    const buttonAuth = document.querySelector('.button-auth'),
        modalAuth = document.querySelector('.modal-auth'),
        closeAuth = document.querySelector('.close-auth'),
        logInForm = document.querySelector('#logInForm'),
        loginInput = document.querySelector('#login'),
        userName = document.querySelector('.user-name'),
        buttonOut = document.querySelector('.button-out'),
        cardsRestaurants = document.querySelector('.cards-restaurants'),
        containerPromo = document.querySelector('.container-promo'),
        restaurants = document.querySelector('.restaurants'),
        menu = document.querySelector('.menu'),
        logo = document.querySelector('.logo'),
        cardsMenu = document.querySelector('.cards-menu'),
        restaurantInfo = document.querySelector('.restaurant-info');


    let login = localStorage.getItem('gloDelivery');

    const getData = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error on address ${url},
            status error ${response.status}`);
        }
        
        return await response.json();
    };

    const toggleModalAuth = () => {
        modalAuth.classList.toggle("is-open");
    };

    const autorized = () => {
        console.log('autorized');

        userName.textContent = login;

        buttonAuth.style.display = 'none';
        userName.style.display = 'inline';
        buttonOut.style.display = 'block';

        buttonOut.addEventListener('click', logOut);
    };

    const notAutorized = () => {
        console.log('notAutorized');
        buttonAuth.addEventListener('click', toggleModalAuth);
        closeAuth.addEventListener('click', toggleModalAuth);
        logInForm.addEventListener('submit', logIn);
    };

    const logIn = (event) => {
        event.preventDefault();

        if (loginInput.value) {
            login = loginInput.value;

            localStorage.setItem('gloDelivery', login);

            toggleModalAuth();
            buttonAuth.removeEventListener('click', toggleModalAuth);
            closeAuth.removeEventListener('click', toggleModalAuth);
            logInForm.removeEventListener('submit', logIn);
            logInForm.reset();
            checkAuth();
        } else {
            loginInput.style.borderColor = 'red';
        }
    };

    const logOut = (event) => {
        login = '';
        localStorage.removeItem('gloDelivery', login);

        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';

        buttonOut.removeEventListener('click', logOut);

        checkAuth();
    };

    const checkAuth = () => {
        if (login) {
            autorized();
        } else {
            notAutorized();
        }
    };

    const createCardRestaurant = (restaurant) => {
        const { name, time_of_delivery: timeOfDelivery, stars, price, kitchen, image, products } = restaurant;

        const card = `
            <a class="card card-restaurant" data-products="${products}" data-info="${[name, stars, price, kitchen]}">
                <img src="${image}" alt="image" class="card-image"/>
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">${name}</h3>
                        <span class="card-tag tag">${timeOfDelivery}</span>
                    </div>
                    <div class="card-info">
                        <div class="rating">
                            ${stars}
                        </div>
                        <div class="price">От ${price} ₽</div>
                        <div class="category">${kitchen}</div>
                    </div>
                </div>
            </a>
        `;

        cardsRestaurants.insertAdjacentHTML('beforeend', card);

    };

    const createCardGood = (goods) => {
        const { id, name, description, price, image } = goods;

        const card = document.createElement('div');
        card.className = 'card';
        card.insertAdjacentHTML('beforeend', `
            <img src="${image}" alt="image" class="card-image"/>
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">
                        ${description}
                    </div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">${price} ₽</strong>
                </div>
            </div>
        `);

        cardsMenu.insertAdjacentElement('beforeend', card);
    };

    const createShopInfo = (info) => {
        const [ name, stars, price, kitchen ] = info;

        const desc = `
            <h2 class="section-title restaurant-title">${name}</h2>
            <div class="card-info">
                <div class="rating">
                    ${stars}
                </div>
                <div class="price">От ${price} ₽</div>
                <div class="category">${kitchen}</div>
            </div>
        `;

        restaurantInfo.insertAdjacentHTML('beforeend', desc);
    };

    const openGoods = (event) => {
        const target = event.target;
        const restaurant = target.closest('.card-restaurant');

        if (restaurant && login) {
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');
            cardsMenu.textContent = '';
            restaurantInfo.textContent = '';
            
            createShopInfo(restaurant.dataset.info.split(','));
            getData(`./db/${restaurant.dataset.products}`).then((data) => {
                data.forEach(createCardGood);
            });
        } else {
            toggleModalAuth();
        }
    };

    const init = () => {
        getData('./db/partners.json').then((data) => {
            data.forEach(createCardRestaurant);
        });
    
        cardsRestaurants.addEventListener('click', openGoods);
    
        logo.addEventListener('click', () => {
            containerPromo.classList.remove('hide');
            restaurants.classList.remove('hide');
            menu.classList.add('hide');
        });
        checkAuth();
    };

    init();

});