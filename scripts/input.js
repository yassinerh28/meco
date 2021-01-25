
/* validation */

function post_validation_style(e, type) {
    if (validate(e.value, type)) {
        e.classList.add("input-box-valid");
        e.classList.remove("input-box-invalid");
    } else {
        e.classList.add("input-box-invalid");
        e.classList.remove("input-box-valid");
    }
}

function validate(value, type) {
    if (type == "email") {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    } else if (type == "number") {
        const re = /^[1-9]\d*$/;
        return re.test(value);
    } else if (type == "increment") {
        const re = /^[0-9]\d*$/;
        return re.test(value);
    } else if (type == "drop-down") {
        return (value != 0) ? true: false;
    }
}

function input_validation_email(e) {
    post_validation_style(e, "email");
    return validate(e.value, "email");
}

function input_validation_number(e) {
    post_validation_style(e, "number");
    return validate(e.value, "number");
}

function input_validation_increment(e) {
    post_validation_style(e, "increment");
    return validate(e.value, "increment");
}

function input_validation_drop_down(e) {
    post_validation_style(e, "drop-down");
    return validate(e.value, "drop-down");
}

function input_validation(e) {
    if (e.classList.contains("input-email")) {
        return input_validation_email(e);
    } else if (e.classList.contains("input-number")) {
        return input_validation_number(e);
    } else if (e.classList.contains("input-increment")) {
        return input_validation_increment(e);
    } else if (e.classList.contains("input-drop-down")) {
        return input_validation_drop_down(e);
    }
}

/* increment arrows */

function increment_value(sign) {
    var input = document.getElementsByClassName("input-increment")[0];
    if ((sign == -1 && input.value > 0) || sign == 1) {
        input.value = parseInt(input.value) + sign;
        if (input.value == "0" || input.value == "1") {
            document.getElementsByClassName("input-increment-arrow-left")[0].classList.remove("input-increment-arrow-active");
        }
        if (input.value == "1") {
            document.getElementsByClassName("input-increment-arrow-left")[0].classList.add("input-increment-arrow-active");
        }
    }
}

function update_arrows(e) {
    if (parseInt(e.value) <= 0) {
        document.getElementsByClassName("input-increment-arrow-left")[0].classList.remove("input-increment-arrow-active");
    }
    else {
        document.getElementsByClassName("input-increment-arrow-left")[0].classList.add("input-increment-arrow-active");
    }
}

/* default value */

