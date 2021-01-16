function email_input_validation(e) {
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    if (validateEmail(e.value)) {
        e.classList.add("email-input-box-valid");
        e.classList.remove("email-input-box-invalid");
    } else {
        e.classList.add("email-input-box-invalid");
        e.classList.remove("email-input-box-valid");
    }
}