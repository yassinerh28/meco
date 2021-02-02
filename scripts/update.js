
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
                choice_image.style.backgroundImage = "url(../images/app/" + choice_image.dataset.image_src + "-hover.svg)";
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
            if (number == 29) {
                var contact_date_input = document.getElementById("contact-date-input");
                var today = new Date();
                var date_drop_down = "";
                var max_day = 7;
                for (let index = 0; index < max_day; index++) {
                    const date = new Date(today)
                    date.setDate(date.getDate() + index);
                    if (date.getDay() == 0) {
                        max_day++;
                        continue;
                    }
                    var dd = String(date.getDate()).padStart(2, '0');
                    var mm = String(date.getMonth() + 1).padStart(2, '0');
                    var yyyy = date.getFullYear();
                    date_string = yyyy + "-" + mm + "-" + dd;
                    date_drop_down += '<option class="input-drop-down-choice text-clickable" value="' + date_string + '">&nbsp;&nbsp;' + format_date(date) +'</option>';
                }
                contact_date_input.innerHTML += date_drop_down;
            }
            var current_app_name = document.getElementById("app-" + number).getAttribute("name");
            load_local_data(current_app_name);
            if (document.getElementsByClassName("input-increment")[0]) {
                update_arrows(document.getElementsByClassName("input-increment")[0]);
            }
            if (number == 30) {
                var info_box_date = document.getElementById("info-box-date");
                var info_box_time = document.getElementById("info-box-time");
                var date = new Date(JSON.parse(collected_data.contact).jour);
                info_box_date.innerHTML = format_date(date);
                info_box_time.innerHTML = JSON.parse(collected_data.contact).duree;
            }
            right_button_update(current_app_name);
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

function format_date(date) {
    return get_day_name(date.getDay()) + " " + date.getDate() + " " + get_month_name(date.getMonth()) + " " + date.getFullYear();
}

function get_day_name(day) {
    console.log("****" + day);
    days_names = ["Dimanche", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Lundi"];
    return days_names[day];
}

function get_month_name(month) {
    months_names = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    return months_names[month];
}


function load_local_data(app_name) {
    console.log("start--loading_local_data...");
    var current_app = document.getElementById("app-" + current_app_page);
    if (localStorage.getItem(app_name)) {
        var localStorage_item = localStorage.getItem(app_name);
        var choices = document.getElementsByClassName('choice');
        var inputs = document.getElementsByClassName("input");
        if (current_app.classList.contains("radio-choices") || current_app.classList.contains("multiple-choices")) {
            for (let index = 0; index < choices.length; index++) {
                const choice = choices[index];
                if (localStorage_item == choice.getAttribute("value") || localStorage_item.includes(choice.getAttribute("value"))) {
                    update_app(choice);
                }
            }
        } else if (current_app.classList.contains("input-multiple-choice")) {
            for (let index = 0; index < inputs.length; index++) {
                const input = inputs[index];
                var json_localStorage_item = JSON.parse(localStorage_item);
                input.value = json_localStorage_item[input.getAttribute("name")];
            }
        } else {
                inputs[0].value = localStorage_item;
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
    if (current_app.dataset.evident_next_page != "" && !pending_pages.includes(current_app.dataset.evident_next_page)) {
        pending_pages.push(current_app.dataset.evident_next_page);
        console.log("--adding_" + current_app.dataset.evident_next_page);
    }
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

function right_button_update() {
    var current_app = document.getElementById("app-" + current_app_page);
    if (current_app.classList.contains("radio-choices") || current_app.classList.contains("multiple-choices")) {
        var choices = document.getElementsByClassName("choice");
        for (let index = 0; index < choices.length; index++) {
            const choice = choices[index];
            if (choice.classList.contains("choice-selected")) {
                button_right.disabled = false;
                return false;
            }
        }
        button_right.disabled = true;
    } else {
        var inputs = document.getElementsByClassName("input");
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            if (!input.checkValidity() || input.value == "") {
                button_right.disabled = true;
                return false;
            }
        }
        button_right.disabled = false;
    }
}

function update_app(e) {
    console.log("----------------");
    console.log("start--update...");
    var current_app = document.getElementById("app-" + current_app_page);
    if (e.classList.contains("radio-choice")) {
        var choices = document.getElementsByClassName("choice");
        for (let index = 0; index < choices.length; index++) {
            const choice = choices[index];
            choice.classList.remove("choice-selected");
        }
        localStorage.setItem(current_app.getAttribute("name"), e.getAttribute("value"));
        e.classList.add("choice-selected");
    } else if (e.classList.contains("multiple-choice")) {
        var choices = document.getElementsByClassName("choice");
        e.classList.toggle("choice-selected");
        if (e.classList.contains("choice-selected")) {
            if (!selected_choices_values.includes(e.getAttribute("value"))) {selected_choices_values.push(e.getAttribute("value"));}
        } else {
            array_remove_value(selected_choices_values, e.getAttribute("value"));
        }
        localStorage.setItem(current_app.getAttribute("name"), selected_choices_values);
    } else if (e.classList.contains("input") && current_app.classList.contains("input-multiple-choice")) {
        var inputs = document.getElementsByClassName("input");
        selected_choices_values = {};
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            var input_name = input.getAttribute("name");
            var input_value = input.value;
            selected_choices_values[input_name] = input_value;
        }
        localStorage.setItem(current_app.getAttribute("name"), JSON.stringify(selected_choices_values));
    } else if (e.classList.contains("input")) {
        localStorage.setItem(current_app.getAttribute("name"), e.value);
    }

    add_pending_pages();

    right_button_update();

    console.log("log--pending_pages: " + pending_pages);
    console.log("log--next_page: " + next_page);
    console.log("end--update...");
}

function left_button_action() {
    var current_app = document.getElementById("app-" + current_app_page);
    var button_left = document.getElementById("button-left");
    if (current_app.dataset.button_left_function) {
        button_left.setAttribute("onclick", current_app.dataset.button_left_function);
        button_left.click();
        return false;
    }
    console.log("----------------");
    remove_pending_pages();
    go_to_page(previous_page);
    array_remove_value(visited_pages, array_max(visited_pages));
    selected_choices_values = [];
    button_left.setAttribute("onclick", "left_button_action()");
}

function right_button_action() {
    var current_app = document.getElementById("app-" + current_app_page);
    var button_right = document.getElementById("button-right");
    if (current_app.dataset.button_right_function) {
        button_right.setAttribute("onclick", current_app.dataset.button_right_function);
        button_right.click();
        return false;
    }
    console.log("----------------");
    go_to_page(array_min(pending_pages));
    array_remove_value(pending_pages, array_min(pending_pages));
    visited_pages.push(next_page);
    selected_choices_values = [];
    button_right.setAttribute("onclick", "right_button_action()");
}

go_to_page(next_page);