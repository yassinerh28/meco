var navigation_bar = document.getElementById("navigation-bar");

function scrollfunction() {
    if (window.pageYOffset <= 657) {
        navigation_bar.classList.remove("navigation-bar-scroll");
    } else {
        navigation_bar.classList.add("navigation-bar-scroll");
    }
}