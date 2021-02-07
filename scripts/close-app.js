var collected_data;
function save_clear_localStorage() {
    collected_data = JSON.parse(JSON.stringify(localStorage));
    collected_data["28"] = JSON.parse(collected_data["28"]);
    collected_data["29"] = JSON.parse(collected_data["29"]);
    localStorage.clear();
    send_message(JSON_to_HTML(collected_data));
}

function send_message(message) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "../php/send-mail.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 || this.status === 200){ 
            console.log("message-received: " + this.responseText);
        }       
    };
    xmlhttp.send("message=" + message);
}

function JSON_to_HTML(json_object) {
    var html_return = "";
    for (let index = 0; index < Object.keys(json_object).length; index++) {
        const key = Object.keys(json_object)[index];
        html_return += "<div id='field_" + key + "'>" + JSON.stringify(json_object[key]) + "</div>"
    }
    return html_return;
}