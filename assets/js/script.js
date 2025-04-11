// Login Section Scripts
const sliders = document.querySelectorAll('.slider');
const loginImg = document.querySelector('img.login-img');
const logInPage = document.querySelector('.login-page-container');
const register = document.querySelector('#register');

// Register Section Scripts
const registerPage = document.querySelector('.register-page-container');
const logIn = document.querySelector('#login');
const forgotPassword = document.querySelector('#forgot-password');

// Forgot Password Section Variables
const forgotPasswordPage = document.querySelector('.forgot-password-page');
const resetPasswordBtn = document.querySelector('#reset-password');
const backToLoginPage = document.querySelector('.back-to-login');

const loader = document.querySelector('.overlay-loader');
const loginBtn = document.querySelectorAll('#login-submit');

register.addEventListener('click', () => {
  registerPage.classList.add('active');
  logInPage.classList.remove('active');
});

logIn.addEventListener('click', () => {
  registerPage.classList.remove('active');
  logInPage.classList.add('active');
});

forgotPassword.addEventListener('click', () => {
  logInPage.classList.remove('active');
  forgotPasswordPage.classList.add('active');
});

resetPasswordBtn.addEventListener('click', (event) => {
  event.preventDefault();
  // resetPasswordBtn.setAttribute('disabled');
  let displayText = document.querySelector('.code');
  let inputReset = document.querySelector('#email-reset');
  if (inputReset.value.trim() != '') {
    displayText.classList.add('active');
    resetPasswordBtn.value = 'Reset Link Sent';
  }
});

backToLoginPage.addEventListener('click', () => {
  logInPage.classList.add('active');
  forgotPasswordPage.classList.remove('active');
});

const slideImg = () => {
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener('click', () => {
      sliders.forEach((s) => s.classList.remove('selected'));
      loginImg.src = `assets/img/login-alumni-img-${i + 1}.jpg`;
      sliders[i].classList.add('selected');
    });
  }
};

slideImg();

const images = [
  'assets/img/login-alumni-img-1.jpg',
  'assets/img/login-alumni-img-2.jpg',
  'assets/img/login-alumni-img-3.jpg',
];

let index = 0;

setInterval(() => {
  if (index === 0) {
    sliders[2].classList.remove('selected');
  } else if (index === 1) {
    sliders[0].classList.remove('selected');
  } else if (index === 2) {
    sliders[1].classList.remove('selected');
  }
  loginImg.src = images[index];
  sliders[index].classList.add('selected');
  index = (index + 1) % images.length;
}, 4000);

// Sign Up Section Variables
const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const stateOfOrinInput = document.querySelector('#state-origin');
const passwordInput = document.querySelector('#password-one');
const comfirmPasswordInput = document.querySelector('#comfirm-password');
const dateOfBirthInput = document.querySelector('#dob');
const maleRadioInput = document.querySelector('#male');
const femaleRadioInput = document.querySelector('#female');
const emailInput = document.querySelector('#email-address');
const signUpBtn = document.querySelector('#registerBtn');

// Sign In Variables
const emailInputIn = document.querySelector('#email-signIn');
const passwordIn = document.querySelector('#password-logIn');

function inputClear() {
  emailInput.value = ' ';
  passwordInput.value = ' ';
  stateOfOrinInput.value = ' ';
  firstNameInput.value = ' ';
  lastNameInput.value = ' ';
  comfirmPasswordInput.value = ' ';
  dateOfBirthInput.value = ' ';
  maleRadioInput.value = ' ';
  femaleRadioInput.value = ' ';
}

document.addEventListener('DOMContentLoaded', () => {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  let inputRequiredError = document.querySelector(
    '.account-creation-failure-required'
  );
  signUpBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let firstNameValue = firstNameInput.value.trim();
    let emailValue = emailInput.value.trim();
    let passwordValue = passwordInput.value.trim();
    let stateValue = stateOfOrinInput.value.trim();
    let successRegister = document.querySelector('.account-creation-success');
    let failedRegister = document.querySelector('.account-creation-failure');
    let registerLoginBtn = document.querySelector('.login-register');
    let registerError1 = document.querySelector('.login-register-error1');
    let emailRegistered = document.querySelector('.email-registered');

    if (
      !emailInput.checkValidity() ||
      !passwordInput.checkValidity() ||
      !stateOfOrinInput.checkValidity() ||
      !firstNameInput.checkValidity() ||
      !lastNameInput.checkValidity() ||
      !comfirmPasswordInput.checkValidity() ||
      !dateOfBirthInput.checkValidity() ||
      !maleRadioInput.checkValidity() ||
      !femaleRadioInput.checkValidity()
    ) {
      inputRequiredError.classList.add('active');
      setInterval(() => {
        inputRequiredError.classList.remove('active');
      }, 1500);
    } else {
      let emailExists = Object.values(users).some(
        (user) => user.email === emailValue
      );
      if (!emailExists) {
        if (passwordValue !== comfirmPasswordInput.value) {
          let messageChange = document.querySelector('#message');
          messageChange.textContent = 'Password mismatch';
          inputRequiredError.classList.add('active');
          setInterval(function () {
            inputRequiredError.classList.remove('active');
          }, 1500);
        } else {
          users[emailValue] = {
            email: emailValue,
            password: passwordValue,
            state: stateValue,
          };

          emailRegistered.textContent = `With the email ${users[emailValue].email}`;
          inputClear();
          successRegister.classList.add('active');
          registerLoginBtn.addEventListener('click', () => {
            successRegister.classList.remove('active');
            registerPage.classList.remove('active');
            logInPage.classList.add('active');
          });
        }
      } else {
        inputClear();
        failedRegister.classList.add('active');
        registerError1.addEventListener('click', () => {
          failedRegister.classList.remove('active');
          registerPage.classList.remove('active');
          logInPage.classList.add('active');
        });
      }
      localStorage.setItem('users', JSON.stringify(users));
    }
  });

  for (const login of loginBtn) {
    login.addEventListener('click', (event) => {
      event.preventDefault();
      let emailInValue = emailInputIn.value.trim();
      let passwordInValue = passwordIn.value.trim();
      if (emailInValue !== '' && passwordInValue !== '') {
        if (
          users[emailInValue] &&
          users[emailInValue].password === passwordInValue
        ) {
          let successMessage = document.querySelector('.successfully');
          successMessage.classList.add('active');
          localStorage.setItem('loggedInUser', emailInValue);
          let form = document.querySelector('#login-form');
          setTimeout(function () {
            form.submit();
          }, 1500);
        } else {
          let errorMessage = document.querySelector('.failure');
          errorMessage.classList.add('active');
          setTimeout(function () {
            errorMessage.classList.remove('active');
            emailInputIn.value = ' ';
            passwordIn.value = '';
          }, 1500);
        }
      } else {
        inputRequiredError.classList.add('active');
        setInterval(function () {
          inputRequiredError.classList.remove('active');
        }, 1500);
      }
    });
  }
});
