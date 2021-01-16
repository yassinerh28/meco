function input_validation_email(e) {
    function validate(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    if (validate(e.value)) {
        e.classList.add("input-box-valid");
        e.classList.remove("input-box-invalid");
    } else {
        e.classList.add("input-box-invalid");
        e.classList.remove("input-box-valid");
    }
}

function input_validation_number(e) {
    function validate(number) {
        const re = /^[1-9]\d*$/;
        return re.test(number);
    }
    if (validate(e.value)) {
        e.classList.add("input-box-valid");
        e.classList.remove("input-box-invalid");
    } else {
        e.classList.add("input-box-invalid");
        e.classList.remove("input-box-valid");
    }
}

function input_validation(e) {
    if (e.classList.contains("input-email")) {
        input_validation_email(e);
    } else if (e.classList.contains("input-number")) {
        input_validation_number(e);
    }
}