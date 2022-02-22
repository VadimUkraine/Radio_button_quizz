import React, { FC, ReactElement, useEffect } from 'react';
import Button from '../Button';
import './ModalUserScore.scss';

export type UserScoreProps = {
  toggleUserModal: () => void;
  userScore: number;
};

export const ModalUserScore: FC<UserScoreProps> = ({
  toggleUserModal,
  userScore,
}: UserScoreProps): ReactElement => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modal-wrapper" onClick={toggleUserModal}>
      <div className="modal-body">
        <div className="modal-body__header">You scored</div>
        <div className="modal-body__user-score">{userScore}%</div>
        <Button
          customText="Close"
          onClick={toggleUserModal}
          buttonClass="close"
        />
      </div>
    </div>
  );
};
