'use client'

import React, { createRef, RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Answer, Question } from "../types/test";
import { Box, Button, Card, Checkbox, Container, FormControlLabel, Grid, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

const correctAnswer = (answer: Answer) => answer.correct;

type AnswerData = {
    answer: Answer,
    nodeRef: RefObject<HTMLDivElement>
}

export const MultipleAnswersQuestion = ({ question, onCorrectAnswer }: { question: Question, onCorrectAnswer: () => void }) => {
    const correctAnswerRefs: Array<React.RefObject<HTMLDivElement>> = [];
    const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false);
    const correctAnswers = new Set(question.answers.filter(correctAnswer));
    const multipleAnswers = question.answers.filter(correctAnswer).length != 1;
    const [currentAnswers, setCurrentAnswers] = useState<Array<AnswerData>>([]);
    const answerRefs = useMemo(() => question.answers.map(answer => ({ answer, nodeRef: createRef<HTMLDivElement>() })), [question]);
    const matches = useMediaQuery('(min-width:600px)');

    useEffect(() => {
        setCurrentAnswers([]);
        setCurrentQuestionAnswered(false);
    }, [question]);

    const addAnswerToCurrent = (answerData: AnswerData) => {
        setCurrentAnswers((currentAnswers: Array<AnswerData>) => [...currentAnswers, answerData])
    };
    const removeAnswerFromCurrent = useCallback(({ answer, nodeRef }: AnswerData) =>
        setCurrentAnswers(currentAnswers.filter((answerData) => answerData.nodeRef !== nodeRef)), [currentAnswers]);

    const onAnswerClick = useCallback(() => {
        const allAnswersCorrect = Boolean(currentAnswers.filter(({ answer }) => !correctAnswer(answer)).length === 0 && currentAnswers.length === correctAnswers.size);
        currentAnswers.forEach(({ answer, nodeRef }) => {
            let highlightColor = 'red';
            if (answer.correct && allAnswersCorrect) {
                highlightColor = 'green';
            } else if (answer.correct && !allAnswersCorrect) {
                highlightColor = 'yellow';
            }
            nodeRef.current?.animate([
                { backgroundColor: highlightColor }
            ], { duration: 700, fill: 'forwards' });
        });
        if (allAnswersCorrect) {
            onCorrectAnswer()
        }
        if (!allAnswersCorrect && !multipleAnswers) {
            answerRefs.forEach(({ nodeRef, answer }) => answer.correct && nodeRef.current?.animate([
                { backgroundColor: 'green' }
            ], { duration: 700, fill: 'forwards' }));
        }
    }, [currentAnswers, correctAnswers, multipleAnswers]);

    useEffect(() => {
        if (!multipleAnswers && currentQuestionAnswered) {
            onAnswerClick();
        }
    }, [currentQuestionAnswered]);

    const answerButton = (answer: Answer, nodeRef: RefObject<HTMLDivElement>) => {
        return (<Grid key={answer.text} item xs={6}>
            <Card ref={nodeRef}
                sx={{ cursor: currentQuestionAnswered ? 'cursor' : 'pointer', pointerEvents: currentQuestionAnswered ? 'none' : 'auto' }}
                onClick={() => {
                    setCurrentQuestionAnswered(true);
                    addAnswerToCurrent({ answer, nodeRef });
                }}>
                <Typography p={matches ? 4 : 1} variant={matches ? 'h6' : 'inherit'} >
                    {answer.text}
                </Typography>
            </Card>
        </Grid>);
    };

    const answerCheckbox = (answer: Answer, nodeRef: RefObject<HTMLDivElement>) => {
        const answerData = { answer, nodeRef };
        return (<Grid key={answer.text} direction="column" item xs={6}>
            <Card ref={nodeRef}>
                <Typography p={matches ? 4 : 1} variant={matches ? 'h6' : 'inherit'}>
                    <Checkbox onChange={(e) => e.target.checked ? addAnswerToCurrent(answerData) : removeAnswerFromCurrent(answerData)} />
                    {answer.text}
                </Typography>
            </Card>
        </Grid>);
    }


    return <Container>
        <Grid pt={matches? 7: 0} container>
            <Typography variant={matches ? "h5" : "h6"}>{question.text}
            </Typography>
            <Grid pt={matches ? 15 : 5} container spacing={matches ? 4 : 2}>
                {question.answers.map((answer, index) => {
                    const nodeRef = answerRefs[index].nodeRef;
                    if (answer.correct) {
                        correctAnswerRefs.push(nodeRef);
                    }
                    if (multipleAnswers) {
                        return answerCheckbox(answer, nodeRef);
                    }
                    return answerButton(answer, nodeRef)
                })}
            </Grid>
        </Grid>

        <Grid pt={3} onClick={() => onAnswerClick()}>
            {multipleAnswers && <Button variant="contained">Відповісти</Button>}
        </Grid>
    </Container>
};