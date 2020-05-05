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
  buttonOut = document.querySelector('.button-out');

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