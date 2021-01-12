var services = document.getElementById("services");

function drop_down_services() {
    if (!services.classList.contains("services-active")) {
        services.classList.add("services-active");
    } else {
        services.classList.remove("services-active");
    }
}