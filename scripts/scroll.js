var navigation_bar = document.getElementById("navigation-bar");
var pattern = document.getElementById("pattern");
var values_intro_circle = document.getElementById("values-intro-circle");

function scrollfunction() {
    if (window.pageYOffset == 0) {
        navigation_bar.classList.remove("navigation-bar-scroll");
    } else {
        navigation_bar.classList.add("navigation-bar-scroll");
    }
    if (pattern) {pattern.style.transform = "translateY(-"+(window.pageYOffset/4)+"px)";}
    if (values_intro_circle) {values_intro_circle.style.transform = "rotateZ("+(window.pageYOffset/16)+"deg)";}
}