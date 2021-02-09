var collected_data;
function save_clear_localStorage() {
    collected_data = JSON.parse(JSON.stringify(localStorage));
    collected_data.info = JSON.parse(collected_data.info);
    collected_data.contact = JSON.parse(collected_data.contact);
    localStorage.clear();
    send_message(JSON_to_HTML(collected_data));
}

function send_message(message) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "../php/send.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 || this.status === 200){ 
            console.log(this.responseText);
        }       
    };
    xmlhttp.send("message=" + message);
}

function JSON_to_HTML(json_object) {
    var html_return = "";
    for (let index = 0; index < Object.keys(json_object).length; index++) {
        const key = Object.keys(json_object)[index];
        html_return += "<div id='field_" + key + "'>" + JSON.stringify(json_object[key]) + "</div>";
    }
    return html_return;
}