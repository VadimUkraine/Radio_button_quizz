import React, { FC, ReactElement } from 'react';
import './Title.scss';

export type TitleProps = {
  content: string;
};

export const Title: FC<TitleProps> = ({
  content,
}: TitleProps): ReactElement => <h1 className="title">{content}</h1>;
