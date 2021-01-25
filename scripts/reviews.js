var reviews_list = document.getElementsByClassName("reviews-list-item");
var top_stars_list = document.getElementsByClassName("top-stars");
var top_date_list = document.getElementsByClassName("top-date");
var body_author_list = document.getElementsByClassName("review-author");

function update_reviews() {
    for (let index = 0; index < reviews_list.length; index++) {
        const reviews_list_item = reviews_list[index];
        const review_mark = top_stars_list[index].dataset.review_mark;
        const review_date = top_date_list[index].dataset.review_date;
        const review_author = body_author_list[index].dataset.review_author;
        top_stars_list[index].innerHTML = review_mark;
        top_date_list[index].innerHTML = review_date;
        body_author_list[index].innerHTML = review_author;
        const top_stars_selector = ".top-stars[data-review_mark='" + review_mark + "']";
        const top_stars_item = document.querySelector(top_stars_selector);
        function background_image_value(mark) {
            var whole_stars_number = Math.floor(mark);
            var half_stars_number = (mark - Math.floor(mark) >= 0.5) ? 1 : 0;
            var empty_stars_number = 5 - (whole_stars_number + half_stars_number);
            var value = "";
            value += (whole_stars_number > 0) ? ", url(images/graphic-elements/star-whole.svg)".repeat(whole_stars_number) : "";
            value += (half_stars_number > 0) ? ", url(images/graphic-elements/star-half.svg)".repeat(half_stars_number) : "";
            value += (empty_stars_number > 0) ? ", url(images/graphic-elements/star-empty.svg)".repeat(empty_stars_number) : "";
            return value.slice(1, value.length);
        }
        top_stars_item.style.backgroundImage = background_image_value(review_mark);
    }
}

update_reviews();

var  actual_review_index = 1;
function reviews_slide(increment) {
    if (!(actual_review_index == 1 && increment == -1) && !(actual_review_index == reviews_list.length && increment == 1)) {
        actual_review_index += increment;
        var arrow_left = document.getElementById("reviews-slider-arrow-left");
        var arrow_right = document.getElementById("reviews-slider-arrow-right");
        if (actual_review_index == 1) {
            arrow_left.classList.add("reviews-slider-arrow-not-active");
        }
        if (actual_review_index == reviews_list.length) {
            arrow_right.classList.add("reviews-slider-arrow-not-active");
        }
        if (actual_review_index == 2) {
            arrow_left.classList.remove("reviews-slider-arrow-not-active");
        }
        if (actual_review_index == reviews_list.length-1) {
            arrow_right.classList.remove("reviews-slider-arrow-not-active");
        }
        for (let index = 0; index < reviews_list.length; index++) {
            const reviews_list_item = reviews_list[index];
            var width = document.getElementsByClassName("reviews-list-item-body")[0].offsetWidth;
            reviews_list_item.style.transform = "translateX(" + (width+20) * (1 - actual_review_index) + "px)";
        }
    }
}