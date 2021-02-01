function set_answers_height() {

    var page = document.getElementById("page");

    var answers = document.getElementsByClassName("faq-answer");
    if (window.innerWidth <= 830) {
        page.classList.add("page-mobile");
        for (let index = 0; index < answers.length; index++) {
            const answer = answers[index];
            answer.style.height = "100%";
        }
        return false;
    }
    page.classList.remove("page-mobile");
    for (let index = 0; index < answers.length; index++) {
        const answer = answers[index];
        answer.style.height = document.getElementById("faq-questions-list").offsetHeight + "px";
    }
}
window.onresize = set_answers_height;
set_answers_height();