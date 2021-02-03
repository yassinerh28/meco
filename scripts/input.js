
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
        e.setAttribute("value", "acceptee");
    } else {
        e.setCustomValidity("Invalid field.");
        e.setAttribute("value", "refusee");
    }
}

/* increment arrows */

function increment_value(sign) {
    var input = document.getElementsByClassName("input-increment")[0];
    var min_value = parseInt(input.getAttribute("min"));
    if ((sign == -1 && parseInt(input.value) > min_value) || sign == 1) {
        input.value = (input.value != "") ? parseInt(input.value) + sign: min_value;
        if (parseInt(input.value) <= min_value) {
            document.getElementsByClassName("input-increment-arrow-left")[0].classList.remove("input-increment-arrow-active");
        } else {
            document.getElementsByClassName("input-increment-arrow-left")[0].classList.add("input-increment-arrow-active");
        }
    }
}

function update_arrows(e) {
    var input = document.getElementsByClassName("input-increment")[0];
    var min_value = parseInt(input.getAttribute("min"));
    if (parseInt(e.value) <= min_value || e.value == "") {
        document.getElementsByClassName("input-increment-arrow-left")[0].classList.remove("input-increment-arrow-active");
    }
    else {
        document.getElementsByClassName("input-increment-arrow-left")[0].classList.add("input-increment-arrow-active");
    }
}

/* default value */

