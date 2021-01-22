
var question_title = document.getElementById("question-title");
var question_description = document.getElementById("question-description");
var button_left = document.getElementById("button-left");
var button_right = document.getElementById("button-right");
var progress_bar = document.getElementById("progress");

var current_app_page = 1;
var next_page = current_app_page + 1;
var previous_page = current_app_page - 1;

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
            current_app_page = number;
            next_page = current_app_page + 1;
            previous_page = current_app_page - 1;
        }
    };
    xhttp.open("GET", "app-" + number + ".html", true);
    xhttp.send();
}

var selected_choices_values = [];

function update_app(e) {
    if (e.classList.contains("radio-choice")) {
        var choices = document.getElementsByClassName("choice");
        for (let index = 0; index < choices.length; index++) {
            const choice = choices[index];
            choice.classList.remove("choice-selected")
        }
        if (!e.classList.contains("choice-selected")) {
            localStorage.setItem("app-" + current_app_page, e.dataset.order);
            e.classList.add("choice-selected")
        } else {
            localStorage.removeItem("app-" + current_app_page);
        }
    } else if (e.classList.contains("multiple-choice")) {
        var choices = document.getElementsByClassName("choice");
        e.classList.toggle("choice-selected");
        if (e.classList.contains("choice-selected")) {
            selected_choices_values.push(e.dataset.order);
        } else {
            for (let index = 0; index < selected_choices_values.length; index++) {
                const choice = selected_choices_values[index];
                if (choice == e.dataset.order) {
                    const index = selected_choices_values.indexOf(choice);
                    selected_choices_values.splice(index, 1);
                }
            }
        }
        localStorage.setItem("app-" + current_app_page, selected_choices_values);
    } else if (e.classList.contains("input")) {
        localStorage.setItem("app-" + current_app_page, e.value);
    }
}

go_to_page(1);