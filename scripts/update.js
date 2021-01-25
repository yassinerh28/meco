
var question_title = document.getElementById("question-title");
var question_description = document.getElementById("question-description");
var button_left = document.getElementById("button-left");
var button_right = document.getElementById("button-right");
var progress_bar = document.getElementById("progress");

var current_app_page = 1;
var pending_pages = [];
var visited_pages = [1];
var next_page = 1;
var previous_page = 0;

var selected_choices_values = [];

function array_min(array) {
    var array_min_return = array[0];
    if (array.length > 1) {
        for (let index = 1; index < array.length; index++) {
            array_min_return = (array[index] - array_min_return < 0) ? array[index] : array_min_return;
        }
    }
    return (array_min_return != undefined) ? array_min_return : 19;
}

function array_max(array) {
    var array_min_return = array[0];
    if (array.length > 1) {
        for (let index = 1; index < array.length; index++) {
            array_min_return = (array[index] - array_min_return > 0) ? array[index] : array_min_return;
        }
    }
    return array_min_return;
}

function array_remove_value(array, value) {
    for (let index = 0; index < array.length; index++) {
        const choice = array[index];
        if (choice == value) {
            const index = array.indexOf(choice);
            array.splice(index, 1);
        }
    }
}

function go_to_page(number) {
    console.log("----------------");
    console.log("start--going_to_page_" + number + "...");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("choices-container").innerHTML = this.responseText;
            var app_page = document.getElementById("app-" + number);
            var choice_images = document.getElementsByClassName("choice-image");
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
            previous_page = array_max(visited_pages.slice(0, -1));
            add_pending_pages();
            load_local_data(number);
            console.log("log--pending_pages: " + pending_pages);
            console.log("log--next_page: " + next_page);
            console.log("log--visited_pages: " + visited_pages);
            console.log("log--previous_page: " + previous_page);
            console.log("end--going_to_page_" + number + "...");
        }
    };
    xhttp.open("GET", "app-" + number + ".html", true);
    xhttp.send();
}

function load_local_data(number) {
    console.log("start--loading_local_data...");
    var current_app = document.getElementById("app-" + number);
    if (localStorage.getItem("app-" + number)) {
        var localStorage_item = localStorage.getItem("app-" + number);
        var choices = document.getElementsByClassName('choice');
        var input = document.getElementsByClassName("input")[0];
        if (current_app.classList.contains("radio-choices")) {
            for (let index = 0; index < choices.length; index++) {
                const choice = choices[index];
                if (index + 1 == localStorage_item) {
                    update_app(choice);
                }
            }
        } else if (current_app.classList.contains("multiple-choices")) {
            console.log(localStorage_item);
            for (let index = 0; index < choices.length; index++) {
                const choice = choices[index];
                for (let index2 = 0; index2 < localStorage_item.length; index2++) {
                    const element = localStorage_item[index2];
                    if (index + 1 == element) {
                        update_app(choice);
                        break;
                    }
                }
            }
        } else if (current_app.classList.contains("input-choice")) {
            input.value = localStorage_item;
        }
    }
    add_pending_pages();
    console.log("log--pending_pages: " + pending_pages);
    console.log("log--next_page: " + next_page);
    console.log("end--loading_local_data...");
}


function add_pending_pages() {
    console.log("start--adding_pending_pages...");
    var current_app = document.getElementById("app-" + current_app_page);
    var choices = document.getElementsByClassName('choice');
    if (current_app.dataset.evident_next_page != "" && !pending_pages.includes(current_app.dataset.evident_next_page)) {pending_pages.push(current_app.dataset.evident_next_page);}
    if (current_app.classList.contains("radio-choices") || current_app.classList.contains("multiple-choices")) {
        for (let index = 0; index < choices.length; index++) {
            const choice = choices[index];
            array_remove_value(pending_pages, choice.dataset.go_to);
            console.log("--removing_" + choice.dataset.go_to);
        }
        for (let index = 0; index < choices.length; index++) {
            const choice = choices[index];
            if (choice.dataset.go_to != "" && choice.classList.contains("choice-selected") && !pending_pages.includes(choice.dataset.go_to)) {
                pending_pages.push(choice.dataset.go_to);
                console.log("--adding_" + choice.dataset.go_to);
            }
        }
    }
    next_page = array_min(pending_pages);
    console.log("log--pending_pages: " + pending_pages);
    console.log("log--next_page: " + next_page);
    console.log("end--adding_pending_pages...");
}

function remove_pending_pages() {
    console.log("start--removing_pending_pages...");
    var current_app = document.getElementById("app-" + current_app_page);
    var choices = document.getElementsByClassName('choice');
    array_remove_value(pending_pages, current_app.dataset.evident_next_page);
    console.log("--removing_" + pending_pages, current_app.dataset.evident_next_page);
    for (let index = 0; index < choices.length; index++) {
        const choice = choices[index];
        array_remove_value(pending_pages, choice.dataset.go_to);
        console.log("--removing_" + choice.dataset.go_to);
    }
    next_page = array_min(pending_pages);
    console.log("log--pending_pages: " + pending_pages);
    console.log("log--next_page: " + next_page);
    console.log("end--removing_pending_pages...");
}

function update_app(e) {
    console.log("----------------");
    console.log("start--update...");
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
            if (!selected_choices_values.includes(e.dataset.order)) {selected_choices_values.push(e.dataset.order);}
        } else {
            array_remove_value(selected_choices_values, e.dataset.order);
        }
        localStorage.setItem("app-" + current_app_page, selected_choices_values);
    } else if (e.classList.contains("input")) {
        localStorage.setItem("app-" + current_app_page, e.value);
    }
    add_pending_pages();
    console.log("log--pending_pages: " + pending_pages);
    console.log("log--next_page: " + next_page);
    console.log("end--loading_local_data...");
}

function left_button_action() {
    console.log("----------------");
    go_to_page(previous_page);
    array_remove_value(visited_pages, array_max(visited_pages));
    remove_pending_pages();
    selected_choices_values = [];
}

function right_button_action() {
    console.log("----------------");
    go_to_page(array_min(pending_pages));
    array_remove_value(pending_pages, array_min(pending_pages));
    visited_pages.push(next_page);
    selected_choices_values = [];
}

go_to_page(next_page);