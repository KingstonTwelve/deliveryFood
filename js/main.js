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
        cardsMenu = document.querySelector('.cards-menu');

    let login = localStorage.getItem('gloDelivery');

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

    checkAuth();

    //DAY 2

    const createCardRestaurant = () => {
        const card = `
            <a class="card card-restaurant">
                <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">Пицца плюс</h3>
                        <span class="card-tag tag">50 мин</span>
                    </div>
                    <div class="card-info">
                        <div class="rating">
                            4.5
                        </div>
                        <div class="price">От 900 ₽</div>
                        <div class="category">Пицца</div>
                    </div>
                </div>
            </a>
        `;

        cardsRestaurants.insertAdjacentHTML('beforeend', card);

    };

    createCardRestaurant();

    const createCardGood = () => {
        const card = document.createElement('div');
        card.className = 'card';
        card.insertAdjacentHTML('beforeend', `
            <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">Пицца Везувий</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
                        «Халапенье», соус «Тобаско», томаты.
                    </div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">545 ₽</strong>
                </div>
            </div>
        `);
        
        cardsMenu.insertAdjacentElement('beforeend', card);
    };

    const openGoods = (event) => {
        const target = event.target;
        const restaurant = target.closest('.card-restaurant');

        if (restaurant && login) {
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');
            cardsMenu.textContent = '';
            createCardGood();
        } else {
            toggleModalAuth();
        }
    };



    cardsRestaurants.addEventListener('click', openGoods);

    logo.addEventListener('click', () => {
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
    });

});