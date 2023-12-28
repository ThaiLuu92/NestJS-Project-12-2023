import React, { ChangeEvent, useEffect, useState } from "react";
import { getDataById } from "../../Apis/API";
import {  QUESTION } from "../../Apis/common";
import {  I_Question } from "../../Types/formData.type";
import "./Lesson.scss";

function Lesson({
  currentLesson,
  onSubmit,
}: {
  currentLesson: any;
  onSubmit: Function;
}) {
  const [questions, setQuestion] = useState<I_Question[]>([]);
  const [answers, setAnswer] = useState<
    { questionId: string; answerId: string | null }[]
  >([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      const lessonId = currentLesson.lesson_id;
      if (lessonId) {
        const questionData = (await getDataById(
          QUESTION,
          lessonId
        )) as I_Question[];
        setQuestion(questionData);
        const answers = questionData.map((question) => ({
          questionId: question.id,
          answerId: null,
        }));
        setAnswer(answers);
      }
    };
    fetchQuestion();
  }, [currentLesson]);

  const handleRadioChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => { 
    const { name, value } = event.target;
    const answersArray = answers.map((result) => {
      if (result.questionId == name) {
        result.answerId = value;
      }
      return result;
    });
    setAnswer(answersArray);
  };

  return (
    <div>
      <>
        <iframe
          width={800}
          height={450}
          src={currentLesson.lesson_video}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />

        {/* <h3>Bài kiểm traa</h3>
        <img width={800} src={currentLesson.lessons_exercise} /> */}
        <h3>Bài Test</h3>
        {questions.map((question, index) => (
          <>
            <p key={question.id}>
              <b>
                {index + 1},{question.question_text}
              </b>
            </p>
            {question.answers.map((answer) => { 
              return(
              <div className="lesson-item">
                <input
                  type="radio"
                  name={question.id}
                  id={"answer_" + answer.id}
                  value={answer.id}
                  onChange={handleRadioChange}
                  checked={answers[index].answerId == answer.id}
                />
                <label htmlFor={"answer_" + answer.id}>
                  {answer.answer_text}
                </label>
              </div>
            )})}
          </>
        ))}
        <button onClick={()=>onSubmit(answers)}>Nộp bài</button>
      </>
    </div>
  );
}

export default Lesson;
