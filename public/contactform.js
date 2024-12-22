function validateForm() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    document.getElementById('contactNameError').style.display = 'none';
    document.getElementById('contactEmailError').style.display = 'none';
    document.getElementById('contactSubjectError').style.display = 'none';
    document.getElementById('contactMessageError').style.display = 'none';

    if (!name) {
        alert("Name is required.");
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("Invalid email format.");
        return false;
    }

    if (!subject) {
        alert("Subject is required.");
        return false;
    }

    if (!message) {
        alert("Message is required.");
        return false;
    }

    return true;
    
}
