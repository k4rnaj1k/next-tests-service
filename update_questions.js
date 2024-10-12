const { readdirSync, readFileSync, writeFileSync } = require("fs")

const loadExistingQuestions = (fileName) => {
    console.log('tests/' + fileName);
    const questionsData = readFileSync('tests/' + fileName);
    return JSON.parse(questionsData.toString());
}

const loadNewQuestions = () => {
    const newQuestionsFolder = readdirSync('new_questions');
    const resultingQuestions = loadExistingQuestions('inf_tech.json');
    const newQuestions = loadExistingQuestions('inf_tech.json');
    newQuestions.questions = [];
    newQuestionsFolder.forEach(fileName => {
        const newQuestionFile = readFileSync('new_questions/' + fileName);
        const newQuestionsData = JSON.parse(newQuestionFile.toString());
        console.log(resultingQuestions.questions.length)
        resultingQuestions.questions.push(...newQuestionsData.map(questionData => ({...questionData, type: 'correct_answer', image: '' })));
        newQuestions.questions.push(...newQuestionsData.map(questionData => ({...questionData, type: 'correct_answer', image: '' })));
    });
    writeFileSync('tests/only_new_inf_tech.json', JSON.stringify(newQuestions, null, 4), { flag: 'a'});
    writeFileSync('tests/inf_tech.json', JSON.stringify(resultingQuestions, null, 4), { flag: 'a'});

}
loadNewQuestions();