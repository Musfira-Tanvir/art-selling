function validateForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const phonePattern = /^\d{10}$/; // Validates exactly 10 digits
    const size = document.getElementById('size').value.trim();
    const description = document.getElementById('description').value.trim();

    // Resetting error messages
    document.getElementById('nameError').style.display = 'none';
    document.getElementById('phoneError').style.display = 'none';
    document.getElementById('sizeError').style.display = 'none';
    document.getElementById('descriptionError').style.display = 'none';

    let isValid = true; // Initialize isValid at the start of the function

    // Name validation
    if (!name) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }

    // Phone number validation
    if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
        console.log("Phone validation failed."); // Debugging validation failure
    }

    // Size validation
    if (size === '' || isNaN(size) || size <= 0) {
        document.getElementById('sizeError').style.display = 'block';
        isValid = false;
    }

    // Description validation
    if (description === '') {
        document.getElementById('descriptionError').style.display = 'block';
        isValid = false;
    }

    // If any validation failed, prevent form submission
    if (!isValid) {
        return false;
    }

    alert("Form submitted successfully!");
    return true; // Allow form submission
}
