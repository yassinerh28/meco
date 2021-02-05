var collected_data;
function save_clear_localStorage() {
    collected_data = JSON.parse(JSON.stringify(localStorage));
    collected_data.info = JSON.parse(collected_data.info);
    collected_data.contact = JSON.parse(collected_data.contact);
    localStorage.clear();
}

function JSON_to_HTML(json_object) {
    var html_return = "";
    for (let index = 0; index < Object.keys(json_object).length; index++) {
        const key = Object.keys(json_object)[index];
        html_return += "<div id='field_" + key + "'>" + json_object[key] + "</div>"
    }
    return html_return;
}