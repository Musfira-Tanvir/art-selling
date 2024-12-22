function validateForm() {

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const postalCode = document.getElementById('postalCode').value.trim();

    const phonePattern = /^(\d{10})$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    document.getElementById('phoneError').style.display = 'none';

    if (!name) {
        alert("Full Name is required.");
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        return false;
    } 

    if (!postalCode) {
        alert("Postal Code is required.");
        return false;
    }

    return true; 
}