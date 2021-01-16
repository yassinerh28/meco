
var question_title = document.getElementById("question-title");
var question_description = document.getElementById("question-description");
var button_left = document.getElementById("button-left");
var button_right = document.getElementById("button-right");
var progress_bar = document.getElementById("progress");

var current_app_page = 1;

function go_to_page(number) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("choices-container").innerHTML = this.responseText;
            var app_page = document.getElementById("app-" + number);
            var choice_images = document.getElementsByClassName("choice-image");
            var choice_images_hover = document.querySelector(".choice-image:hover");
            var number_of_choices = document.getElementsByClassName("choice").length;
            app_page.classList.add("choices-" + number_of_choices);
            question_title.innerHTML = app_page.dataset.title;
            question_description.innerHTML = app_page.dataset.description;
            for (let index = 0; index < choice_images.length; index++) {
                const choice_image = choice_images[index];
                choice_image.style.backgroundImage = "url(../images/app/" + choice_image.dataset.image_src + "-unselected.svg)";
                choice_image.style.backgroundImage += ", url(../images/app/" + choice_image.dataset.image_src + "-hover.svg)";
                choice_image.style.backgroundImage += ", url(../images/app/" + choice_image.dataset.image_src + "-selected.svg)";
                
            }
            button_left.innerHTML = app_page.dataset.button_left;
            button_right.innerHTML = app_page.dataset.button_right;
            button_left.className = "text-clickable button";
            button_right.className = "text-clickable button";
            button_left.classList.add(app_page.dataset.button_left_type);
            button_right.classList.add(app_page.dataset.button_right_type);
            progress_bar.style.width = app_page.dataset.progress + "%";
        }
    };
    xhttp.open("GET", "app-" + number + ".html", true);
    xhttp.send();
}

function update_app(e) {
    
}

go_to_page(current_app_page);