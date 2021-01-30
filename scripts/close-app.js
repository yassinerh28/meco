var collected_data;
function save_clear_localStorage() {
    collected_data = JSON.parse(JSON.stringify(localStorage));
    localStorage.clear();
}
