
/* validation */

function input_validation_drop_down(e) {
    var isValid = (e.value != "0") ? true: false;
    if (isValid) {
        e.setCustomValidity("");
    } else {
        e.setCustomValidity("Invalid field.");
    }
}

function input_validation_check_box(e) {
    if (e.checked == true){
        e.setCustomValidity("");
    } else {
        e.setCustomValidity("Invalid field.");
    }
}

/* increment arrows */

function increment_value(sign) {
    var input = document.getElementsByClassName("input-increment")[0];
    if ((sign == -1 && input.value > 0) || sign == 1) {
        input.value = (input.value != "") ? parseInt(input.value) + sign: 0;
        if (input.value == "0" || input.value == "1") {
            document.getElementsByClassName("input-increment-arrow-left")[0].classList.remove("input-increment-arrow-active");
        }
        if (input.value == "1") {
            document.getElementsByClassName("input-increment-arrow-left")[0].classList.add("input-increment-arrow-active");
        }
    }
}

function update_arrows(e) {
    if (parseInt(e.value) <= 0 || e.value == "") {
        document.getElementsByClassName("input-increment-arrow-left")[0].classList.remove("input-increment-arrow-active");
    }
    else {
        document.getElementsByClassName("input-increment-arrow-left")[0].classList.add("input-increment-arrow-active");
    }
}

/* default value */

