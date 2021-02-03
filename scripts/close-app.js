var collected_data;
function save_clear_localStorage() {
    collected_data = JSON.parse(JSON.stringify(localStorage));
    collected_data.info = JSON.parse(collected_data.info);
    collected_data.contact = JSON.parse(collected_data.contact);
    localStorage.clear();
}
