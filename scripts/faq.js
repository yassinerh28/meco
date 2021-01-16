var questions = document.getElementsByClassName("faq-question");
var answers = document.getElementsByClassName("faq-answer");
function show_answer(order) {
    var question_id = "faq-question-" + order;
    var answer_id = "faq-answer-" + order;
    var question = document.getElementById(question_id);
    var answer = document.getElementById(answer_id);
    for (let index = 0; index < questions.length; index++) {
        const question_element = questions[index];
        const answer_element = answers[index];
        question_element.classList.remove("faq-question-active");
        answer_element.classList.remove("faq-answer-active");
    }
    question.classList.add("faq-question-active");
    answer.classList.add("faq-answer-active");
}