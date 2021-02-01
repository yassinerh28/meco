var navigation_bar = document.getElementById("navigation-bar");
var pattern = document.getElementById("pattern");
var values_intro_circle = document.getElementById("values-intro-circle");
var page_heading = document.getElementById("page-heading");
var cta_nav_link = document.getElementById("cta-nav-link");
var page = document.getElementById("page");

function scrollfunction() {
    if (window.pageYOffset == 0 && !page.classList.contains("page-mobile")) {
        navigation_bar.classList.remove("navigation-bar-scroll");
    } else if (!page.classList.contains("page-mobile")) {
        navigation_bar.classList.add("navigation-bar-scroll");
        cta_nav_link.classList.add("cta-nav-link-after-scroll");
    } else {
        navigation_bar.classList.add("navigation-bar-scroll");
    }
    if (pattern) {pattern.style.transform = "translateY(-"+(window.pageYOffset/4)+"px)";}
    if (values_intro_circle) {values_intro_circle.style.transform = "rotateZ("+(window.pageYOffset/4)+"deg)";}
    if (page_heading) {page_heading.style.backgroundSize = (window.innerWidth/8 - 0.3*window.pageYOffset) + "px"}
}