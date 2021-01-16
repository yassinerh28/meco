var navigation_bar = document.getElementById("navigation-bar");
var pattern = document.getElementById("pattern");

function scrollfunction() {
    if (window.pageYOffset == 0) {
        navigation_bar.classList.remove("navigation-bar-scroll");
    } else {
        navigation_bar.classList.add("navigation-bar-scroll");
    }
    pattern.style.transform = "translateY(-"+(window.pageYOffset/4)+"px)";
}