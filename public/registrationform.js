function validateRegistrationForm() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const phone = document.getElementById('phone').value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, 1 uppercase, 1 number, 1 special char
    const phonePattern = /^\d{10}$/; // Exactly 10 digits

    let isValid = true;

    // Clear all error messages
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('confirmPasswordError').style.display = 'none';
    document.getElementById('phoneError').style.display = 'none';

    // Username Validation
    if (!username) {
        alert("Username is required.");
        isValid = false;
    }

    // Email Validation
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        isValid = false;
    }

    // Password Validation
    if (!passwordPattern.test(password)) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    // Confirm Password Validation
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').style.display = 'block';
        isValid = false;
    }

    // Phone Number Validation
    if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }

    return isValid;
}