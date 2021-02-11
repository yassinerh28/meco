var navigation_bar = document.getElementById("navigation-bar");
var pattern = document.getElementById("pattern");
var values_intro_circle = document.getElementById("values-intro-circle");
var page_heading = document.getElementById("page-heading");
var cta_nav_link = document.getElementById("cta-nav-link");
var page = document.getElementsByClassName("page")[0];
var logo_nav_link = document.getElementById("logo-nav-link");
var cta_href = cta_nav_link.getAttribute("href");

function scrollfunction() {
    if (window.pageYOffset == 0) {
        if (window.innerWidth <= 830) {
            navigation_bar.classList.add("navigation-bar-scroll");
        } else {
            navigation_bar.classList.remove("navigation-bar-scroll");
            cta_nav_link.removeAttribute("href");
        }
        logo_nav_link.classList.remove("logo-nav-link-after-scroll");
    } else {
        cta_nav_link.classList.add("cta-nav-link-after-scroll");
        cta_nav_link.setAttribute("href", cta_href);
        navigation_bar.classList.add("navigation-bar-scroll");
        logo_nav_link.classList.add("logo-nav-link-after-scroll");
    }
    if (pattern) {pattern.style.transform = "translateY(-"+(window.pageYOffset/4)+"px)";}
    if (values_intro_circle) {values_intro_circle.style.transform = "rotateZ("+(window.pageYOffset/4)+"deg)";}
    if (page_heading) {page_heading.style.backgroundSize = (window.innerWidth/8 - 0.3*window.pageYOffset) + "px"}
}

scrollfunction();