'use client'

import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { Answer, Question } from "../types/test";
import { Button, Card, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { MultipleAnswersQuestion } from "./MultipleAnswersQuestion";

export const TestAttempt = ({ questions, timePossible, testName }: { questions: Question[], timePossible: number, testName: string }) => {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const question = questions[currentQuestion];
    const [remaningTime, setCurrentRemainingTime] = useState(timePossible);
    const matches = useMediaQuery('(min-width:600px)');
    
    useEffect(() => {
        const endTime = new Date().getTime() + timePossible * 60 * 1000;
        const interval = setInterval(() => setCurrentRemainingTime(Math.floor((endTime - new Date().getTime()) / 1000 / 60)), 50);
        return () => clearInterval(interval);
    }, []);

    const goToReview = (answer?: Answer) => {
        const reviewUrl = `/tests/${testName}/review`;
        history.pushState({ correctAnswers: correctAnswers + Number(Boolean(answer?.correct)), correctAnswersPossible: questions.length, timeSpent: timePossible - remaningTime, timePossible }, "", reviewUrl);
        router.push(reviewUrl);
    };

    return <Container disableGutters={!matches}>
        <Grid pt={7} container>
            <Grid pb={3} alignContent="center" item xs={3}>
                <Button variant="contained" color="error" onClick={() => goToReview()}>{matches? 'Завершити спробу': 'Завер. спроб.'}</Button>
            </Grid>
            <Grid pb={5} item xs={6}>
                <Typography align="center" variant="h6">Залишилось хвилин {remaningTime}/{timePossible}</Typography>
            </Grid>
            <Grid pb={matches? 5: 1} item xs={3}>
                <Typography align="center" variant="h6">Питання {currentQuestion + 1}/{questions.length}</Typography>
            </Grid>
            <MultipleAnswersQuestion question={question} onCorrectAnswer={() => setCorrectAnswers(prevVal => prevVal += 1)} />
        </Grid>
        <Grid pt={3} item direction="column">
            <Button onClick={() => {
                if (currentQuestion === questions.length - 1) {
                    return goToReview()
                }
                return setCurrentQuestion(prevVal => prevVal += 1)
            }} variant="contained">Наступне питання</Button>
        </Grid>
    </Container>
};