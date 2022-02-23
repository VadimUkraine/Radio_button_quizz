import React, { FC, ReactElement, useMemo } from 'react';
import './Choice.scss';
import {
  QuizzChoice,
  ChoiceOrder,
  SelectedChoices,
  ResponseDeclaration,
} from '../../pages/Quizz/types';
import { CheckMarkIcon } from '../../assets/icons/CheckMarkIcon';
import { CrossMarkIcon } from '../../assets/icons/CrossMarkIcon';

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
  const rightSelectedChoice = useMemo(
    () =>
      selectedChoices.find(
        (el) =>
          el.choice ===
          correctAnswers.filter(
            (item) => item.identifier === responseIdentifier
          )[0].correctResponse.value
      ),
    [correctAnswers, selectedChoices, responseIdentifier]
  );

  const isCorrectChoiceSelected = useMemo(() => {
    if (
      isValidationMode ||
      ((isFreezeSelection || isKeepSelection) && !isValidationMode)
    ) {
      return rightSelectedChoice?.choice === choice.identifier;
    }

    return false;
  }, [
    isValidationMode,
    isFreezeSelection,
    isKeepSelection,
    choice,
    rightSelectedChoice,
  ]);

  const isSelected = useMemo(
    () => !!selectedChoices.find((el) => el.choice === choice.identifier),
    [selectedChoices]
  );

  const choiceContentClasses = useMemo(() => {
    if (isSelected && !isCorrectChoiceSelected) {
      return 'choice__content choice__content--selected';
    }

    if (isSelected && isCorrectChoiceSelected) {
      return 'choice__content choice__content--selected-correctly';
    }

    return 'choice__content';
  }, [isSelected, isCorrectChoiceSelected]);

  const isSelectedWrongly = useMemo(() => {
    if (isValidationMode) {
      return isSelected && !rightSelectedChoice;
    }

    return false;
  }, [isValidationMode, rightSelectedChoice, isSelected]);

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
      {isSelectedWrongly && <CrossMarkIcon />}
    </p>
  );
};
