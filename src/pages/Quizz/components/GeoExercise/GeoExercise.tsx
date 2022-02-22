import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store/rootReducer';
import Title from '../../../../elements/Title';
import SubTitle from '../../../../elements/SubTitle';
import WorldMap from '../../../../elements/WorldMap';
import Questionnaire from '../Questionnaire';
import { getQuizzAction } from '../../redux/actions';
import './GeoExercise.scss';

export const GeoExercise: FC = () => {
  const dispatch = useDispatch();
  const title = useSelector((state: RootState) => state.quizz.data.title);
  const subtitle = useSelector((state: RootState) => state.quizz.data.subtitle);
  const isFetching = useSelector((state: RootState) => state.quizz.isFetching);

  useEffect(() => {
    dispatch(getQuizzAction());
  }, []);

  if (isFetching) {
    return <div className="loader">Data is loading...</div>;
  }

  return (
    <div className="geo-exercise">
      <Title content={title} />
      <SubTitle content={subtitle} />
      <WorldMap />
      <Questionnaire />
    </div>
  );
};
