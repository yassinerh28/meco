function cancel_app() {
    console.log("----------------");
    next_page = 31;
    go_to_page(next_page);
    visited_pages.push(next_page);
    selected_choices_values = [];
    button_right.setAttribute("onclick", "right_button_action()");
}