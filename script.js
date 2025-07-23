console.log("JS loaded");

// Input references
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const mobile = document.getElementById('mobile');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const day = document.querySelector('select[name="birth-day"]');
const month = document.getElementById('birth-month');
const year = document.getElementById('birth-year');
const checkboxes = document.querySelectorAll('input[type="checkbox"][name="interest"]');
const radiobutton = document.querySelectorAll('input[type="radio"][name="gender"]');
const signupBtn = document.querySelector('#signup-btn');
const togglePassword = document.getElementById('togglePassword');

// Validation utilities
function isValidName(name) {
    return /^[A-Za-z]{2,}$/.test(name);
}

function isValidMobile(number) {
    return /^\+?\d{10,15}$/.test(number);
}

function isValidEmail(emailValue) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
}

//Message that shows under the input boxes
function updateValidationMessage(input, message, color='red') {
    let msgElem = input.nextElementSibling;
    msgElem.className = 'validation-msg';
    if (!msgElem|| !msgElem.classList.contains('validation-msg')) {
        msgElem = document.createElement('div');
        input.insertAdjacentElement('afterend', msgElem);
    }
    msgElem.textContent = message;
    msgElem.style.color = color;
}

// Eye button toggle
togglePassword.addEventListener('click', () => {
    password.type = password.type === 'password' ? 'text' : 'password';
    togglePassword.textContent = password.type === 'text' ? '🙈' : '👁️';
});

//validating the inputs(text)

[firstName, lastName, mobile,email].forEach(input => {
    input.addEventListener('input', () => {
        if (input.id === 'firstName' || input.id === 'lastName') {
            if (isValidName(input.value)) {
                updateValidationMessage(input, 'Success!', 'green');
            } else {
                updateValidationMessage(input, 'Must be at least 2 letters, alphabets only.', 'red');
            }
        } else if (input.id === 'mobile') {
            if (isValidMobile(input.value)) {
                updateValidationMessage(input, 'Success!', 'green');
            } else {
                updateValidationMessage(input, 'Invalid mobile number.', 'red');
            }
        }
          else if (input.id==='email'){
            if(isValidEmail(input.value)){
                 updateValidationMessage(input, 'Success!', 'green');
             } else {
                updateValidationMessage(input, 'Invalid email', 'red');}
    
        }
    });
});


// Password validation
password.addEventListener('input', () => {
    const pwd = password.value;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*]/.test(pwd);
    const isLongEnough = pwd.length >= 6;

    if (hasUpper && hasLower && hasNumber && hasSpecial && isLongEnough) {
        updateValidationMessage(password, 'Strong Password', 'green');
    } else {
        updateValidationMessage(password, 'Password must be 6+ chars, include upper, lower, number, special char.', 'red');
    }
});

// Confirm password validation
confirmPassword.addEventListener('input', () => {
    if (confirmPassword.value === password.value) {
        updateValidationMessage(confirmPassword, 'Passwords match', 'green');
    } else {
        updateValidationMessage(confirmPassword, 'Passwords do not match', 'red');
    }
});

// Limit checkbox selection to 2
checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('input[name="interest"]:checked').length;
        if (checkedCount > 2) {
            cb.checked = false;
            alert("You can select a maximum of 2 fields of interest.");
        }
    });
});


signupBtn.addEventListener('click', (e) => {
    e.preventDefault();  // Prevent form reload

    const errors = [];

    // Name validations
    if (!isValidName(firstName.value)) errors.push("First name invalid.");
    if (!isValidName(lastName.value)) errors.push("Last name invalid.");
    if (!isValidMobile(mobile.value)) errors.push("Invalid mobile number.");
    if (!isValidEmail(email.value)) errors.push("Invalid email.");
    

    // Password validations
    if (password.value.length < 6) {
        errors.push("Password too short (min 6 characters).");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
        errors.push("Password must contain at least one special character.");
    }

    if (confirmPassword.value !== password.value) {
        errors.push("Confirm password does not match.");
    }

    const genderSelectedNow = Array.from(radiobutton).some(r => r.checked);
    if (!genderSelectedNow) {
    errors.push("Please select your gender.");
}


    // Checkbox validation
    if (document.querySelectorAll('input[name="interest"]:checked').length !== 2) {
        errors.push("Please select exactly 2 fields of interest.");
    }

    // Display errors or success
    if (errors.length > 0) {
        alert("Please fix the following:\n" + errors.join("\n"));
    } else {
        console.log("Form submitted successfully:");
        console.log("First Name:", firstName.value);
        console.log("Last Name:", lastName.value);
        console.log("Mobile:", mobile.value);
        console.log("Email:", email.value);
        console.log("Password: ..........");
        console.log("DOB:", `${day.value}-${month.value}-${year.value}`);
        console.log("Interests:", Array.from(document.querySelectorAll('input[name="interest"]:checked')).map(cb => cb.value));
        alert("form submitted sucessfully")
    }
});
