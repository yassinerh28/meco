function email_input_validation() {
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    if (validateEmail(document.getElementById("newsletter-email-input").value)) {
        document.getElementById("email-input-box").classList.add("email-input-box-valid");
        document.getElementById("email-input-box").classList.remove("email-input-box-invalid");
    } else {
        document.getElementById("email-input-box").classList.add("email-input-box-invalid");
        document.getElementById("email-input-box").classList.remove("email-input-box-valid");
    }
}