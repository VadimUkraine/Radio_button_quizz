import React, { FC, useCallback, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/rootReducer';
import Question from '../Question';
import ExerciseHints from '../ExerciseHints';
import ModalUserScore from '../../../../elements/ModalUserScore';
import { SelectedChoices, QuizzElement } from '../../types';
import {
  VERTICAL,
  HORIZONTAL,
  CHOICE_ALIGNMENT,
  TRY_AGAIN,
  CLEAR_OPTION,
  KEEP_OPTION,
  FREEZE_OPTION,
} from '../../constants';

import './Questionnaire.scss';

export const Questionnaire: FC = () => {
  const quizz = useSelector((state: RootState) => state.quizz.data.elements);
  const correctAnswers = useSelector(
    (state: RootState) => state.quizz.data.responseDeclaration
  );
  const options = useSelector((state: RootState) => state.quizz.data.options);
  const [selectedChoices, setSelectedChoices] = useState<SelectedChoices[]>([]);
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);
  const [isValidationMode, setIsValidationMode] = useState<boolean>(false);
  const [againMode, setAgainMode] = useState<string>('');
  const [answeredQuestions, setAnsweredQuestions] = useState<SelectedChoices[]>(
    []
  );

  const choiceAlignmentOption = useMemo(() => {
    const option = options.find((el) => el.type === CHOICE_ALIGNMENT);
    if (option?.value === HORIZONTAL) {
      return HORIZONTAL;
    }

    return VERTICAL;
  }, [options]);

  const tryAgainOption = useMemo(() => {
    const option = options.find((el) => el.type === TRY_AGAIN);

    return option?.value || CLEAR_OPTION;
  }, [options]);

  const handleCheckAnswers = useCallback(() => {
    const score = correctAnswers.reduce((total, el) => {
      const correctAnswer = selectedChoices.find(
        (item) =>
          item.questionIdentifier === el.identifier &&
          item.choice === el.correctResponse.value
      );

      return correctAnswer ? total + 1 : total;
    }, 0);
    const newScore = Math.round((score / correctAnswers.length) * 100);

    setUserScore(newScore);
    setIsModalShow(true);
    setIsValidationMode(true);
  }, [
    setIsModalShow,
    setUserScore,
    selectedChoices,
    correctAnswers,
    setIsValidationMode,
  ]);

  const toggleUserModal = useCallback(() => {
    setIsModalShow(!isModalShow);
  }, [setIsModalShow, isModalShow]);

  const shuffle = (array: QuizzElement[]) => {
    array.forEach((arr) => {
      for (let i = arr.choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = arr.choices[i];
        arr.choices[i] = arr.choices[j];
        arr.choices[j] = t;
      }
    });
  };

  const collectAnsweredQuestions = () =>
    selectedChoices
      .map((item) => {
        const correctChoice = correctAnswers.find(
          (el) =>
            el.identifier === item.questionIdentifier &&
            el.correctResponse.value === item.choice
        );

        return correctChoice ? item : null;
      })
      .filter(Boolean) as SelectedChoices[];

  const handleResetExercise = useCallback(() => {
    if (tryAgainOption === CLEAR_OPTION) {
      setSelectedChoices([]);
    }

    if (tryAgainOption === FREEZE_OPTION || tryAgainOption === KEEP_OPTION) {
      setAnsweredQuestions(collectAnsweredQuestions());
      setSelectedChoices(collectAnsweredQuestions());
    }

    setAgainMode(tryAgainOption);
    setIsValidationMode(false);
    shuffle(quizz);
  }, [
    setSelectedChoices,
    setIsValidationMode,
    shuffle,
    tryAgainOption,
    setAgainMode,
    setAnsweredQuestions,
  ]);

  const handleSelectChoice = useCallback(
    (questionIdentifier: string, choice: string) => () => {
      if (isValidationMode) return;

      const index = selectedChoices.findIndex(
        (el) => el.questionIdentifier === questionIdentifier
      );

      if (index < 0) {
        selectedChoices.push({ questionIdentifier, choice });
      } else {
        selectedChoices[index].choice = choice;
      }

      setSelectedChoices([...selectedChoices]);
    },
    [setSelectedChoices, selectedChoices, isValidationMode]
  );

  return (
    <div className="questionnaire">
      {quizz.map((item, index) => (
        <Question
          questionNumber={index}
          inquiry={item}
          key={`${item.responseIdentifier}_${item.question}`}
          handleSelectChoice={handleSelectChoice}
          responseIdentifier={item.responseIdentifier}
          selectedChoices={selectedChoices}
          isValidationMode={isValidationMode}
          correctAnswers={correctAnswers}
          choiceAlign={choiceAlignmentOption}
          againMode={againMode}
          answeredQuestions={answeredQuestions}
        />
      ))}
      <ExerciseHints
        isCheckIconShow={selectedChoices.length > 0}
        handleCheckAnswers={handleCheckAnswers}
        isValidationMode={isValidationMode}
        handleResetExercise={handleResetExercise}
      />
      {isModalShow && (
        <ModalUserScore
          toggleUserModal={toggleUserModal}
          userScore={userScore}
        />
      )}
    </div>
  );
};
