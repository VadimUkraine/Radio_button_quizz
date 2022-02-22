import React, { FC } from 'react';
import ReactTooltip from 'react-tooltip';
import { CheckListIcon } from '../../../../assets/icons/CheckListIcon';
import { UndoArrowIcon } from '../../../../assets/icons/UndoArrowIcon';

import './ExerciseHints.scss';

export type ExerciseHintsProps = {
  isCheckIconShow: boolean;
  handleCheckAnswers: () => void;
  isValidationMode: boolean;
  handleResetExercise: () => void;
};

export const ExerciseHints: FC<ExerciseHintsProps> = ({
  isCheckIconShow,
  handleCheckAnswers,
  isValidationMode,
  handleResetExercise,
}) => (
  <div className="hints">
    {isCheckIconShow && !isValidationMode && (
      <div
        data-for="check-answers"
        data-tip="Check answers"
        className="check-answers"
        onClick={handleCheckAnswers}
      >
        <CheckListIcon />
        <ReactTooltip
          id="check-answers"
          place="left"
          type="dark"
          effect="solid"
        >
          Check answers
        </ReactTooltip>
      </div>
    )}
    {isValidationMode && (
      <div
        data-for="try-again"
        data-tip="Try again"
        className="try-again"
        onClick={handleResetExercise}
      >
        <UndoArrowIcon />
        <ReactTooltip id="try-again" place="left" type="dark" effect="solid">
          Try again
        </ReactTooltip>
      </div>
    )}
  </div>
);
