import React, { FC, ReactElement, useMemo } from 'react';
import './Choice.scss';
import {
  QuizzChoice,
  ChoiceOrder,
  SelectedChoices,
  ResponseDeclaration,
} from '../../pages/Quizz/types';
import { CheckMarkIcon } from '../../assets/icons/CheckMarkIcon';

export type ChoiceProps = {
  choice: QuizzChoice;
  choiceOrder: number;
  handleSelectChoice: (
    responseIdentifier: string,
    choice: string
  ) => () => void;
  responseIdentifier: string;
  selectedChoices: SelectedChoices[];
  isValidationMode: boolean;
  correctAnswers: ResponseDeclaration[];
  isFreezeSelection: boolean;
  isKeepSelection: boolean;
};

export const Choice: FC<ChoiceProps> = ({
  choice,
  choiceOrder,
  handleSelectChoice,
  responseIdentifier,
  selectedChoices,
  isValidationMode,
  correctAnswers,
  isFreezeSelection,
  isKeepSelection,
}: ChoiceProps): ReactElement => {
  const isCorrectChoiceSelected = useMemo(() => {
    if (
      isValidationMode ||
      ((isFreezeSelection || isKeepSelection) && !isValidationMode)
    ) {
      const selectedChoice = selectedChoices.find(
        (el) =>
          el.choice ===
          correctAnswers.filter(
            (item) => item.identifier === responseIdentifier
          )[0].correctResponse.value
      );

      return selectedChoice?.choice === choice.identifier;
    }

    return false;
  }, [correctAnswers, selectedChoices, isValidationMode, isFreezeSelection]);

  const isSelected = useMemo(() => {
    const selectedChoice = selectedChoices.find(
      (el) => el.choice === choice.identifier
    );
    if (selectedChoice) {
      return true;
    }

    return false;
  }, [selectedChoices]);

  const choiceContentClasses = useMemo(() => {
    if (isSelected && !isCorrectChoiceSelected) {
      return 'choice__content choice__content--selected';
    }

    if (isSelected && isCorrectChoiceSelected) {
      return 'choice__content choice__content--selected-correctly';
    }

    return 'choice__content';
  }, [isSelected, isCorrectChoiceSelected]);

  return (
    <p
      className="choice"
      onClick={
        isFreezeSelection
          ? undefined
          : handleSelectChoice(responseIdentifier, choice.identifier)
      }
    >
      <span className={choiceContentClasses}>
        <strong className="choice__content-order">
          {ChoiceOrder[choiceOrder]})
        </strong>
        {choice.text}
      </span>
      {isCorrectChoiceSelected && <CheckMarkIcon />}
    </p>
  );
};
