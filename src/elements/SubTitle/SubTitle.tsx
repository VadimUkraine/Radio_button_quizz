import React, { FC, ReactElement } from 'react';
import './SubTitle.scss';

export type SubTitleProps = {
  content: string;
};

export const SubTitle: FC<SubTitleProps> = ({
  content,
}: SubTitleProps): ReactElement => <h2 className="subtitle">{content}</h2>;
