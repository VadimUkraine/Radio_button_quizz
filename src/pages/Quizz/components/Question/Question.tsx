import React, { FC, useMemo } from 'react';
import './Question.scss';
import {
  QuizzElement,
  SelectedChoices,
  ResponseDeclaration,
} from '../../types';
import {
  HORIZONTAL,
  MAX_CHOICES,
  KEEP_OPTION,
  FREEZE_OPTION,
} from '../../constants';
import Choice from '../../../../elements/Choice';

export type QuestionProps = {
  inquiry: QuizzElement;
  questionNumber: number;
  responseIdentifier: string;
  handleSelectChoice: (
    responseIdentifier: string,
    choice: string
  ) => () => void;
  selectedChoices: SelectedChoices[];
  isValidationMode: boolean;
  correctAnswers: ResponseDeclaration[];
  choiceAlign: string;
  againMode: string;
  answeredQuestions: SelectedChoices[];
};

export const Question: FC<QuestionProps> = ({
  inquiry,
  questionNumber,
  responseIdentifier,
  handleSelectChoice,
  selectedChoices,
  isValidationMode,
  correctAnswers,
  choiceAlign,
  againMode,
  answeredQuestions,
}) => {
  const choicesListClasses = useMemo(() => {
    if (choiceAlign === HORIZONTAL) {
      return 'question__choice-list question__choice-list--horizontal';
    }

    return 'question__choice-list';
  }, [choiceAlign]);

  const isQuestionAnswered = useMemo(
    () =>
      !!answeredQuestions.find(
        (el) => el.questionIdentifier === inquiry.responseIdentifier
      ),
    [inquiry.responseIdentifier, answeredQuestions]
  );

  const isFreezeSelection = useMemo(
    () => againMode === FREEZE_OPTION && isQuestionAnswered,
    [againMode, isQuestionAnswered]
  );

  const isKeepSelection = useMemo(
    () => againMode === KEEP_OPTION && isQuestionAnswered,

    [againMode, isQuestionAnswered]
  );

  return (
    <div>
      <p className="question__title">
        <span className="question__number">{questionNumber + 1}.</span>
        <span>{inquiry.question}</span>
      </p>
      <div className={choicesListClasses}>
        {inquiry.choices.map((item, index) => (
          <Choice
            choice={item}
            key={item.identifier}
            choiceOrder={questionNumber * MAX_CHOICES + index}
            handleSelectChoice={handleSelectChoice}
            responseIdentifier={responseIdentifier}
            selectedChoices={selectedChoices}
            isValidationMode={isValidationMode}
            correctAnswers={correctAnswers}
            isFreezeSelection={isFreezeSelection}
            isKeepSelection={isKeepSelection}
          />
        ))}
      </div>
    </div>
  );
};
