function toggle_menu() {
    var burger = document.getElementById("burger");
    var navigation_bar_list = document.getElementById("navigation-bar-list");
    burger.classList.toggle("burger-clicked");
    navigation_bar_list.classList.remove("services-shown");
}

function show_services() {
    var navigation_bar_list = document.getElementById("navigation-bar-list");
    navigation_bar_list.classList.toggle("services-shown");
}