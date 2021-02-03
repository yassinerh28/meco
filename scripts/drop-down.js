var services = document.getElementById("services");
var page = document.getElementsByClassName("page")[0];

function drop_down_services_over() {
    if (page.classList.contains("page-mobile")) {
        return false;
    }
    services.classList.add("services-active");
}

function drop_down_services_out() {
    if (page.classList.contains("page-mobile")) {
        return false;
    }
    services.classList.remove("services-active");
}