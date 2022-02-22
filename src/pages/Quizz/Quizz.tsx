import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import GeoExercise from './components/GeoExercise';

export const Quizz: FC = () => (
  <>
    <Helmet>
      <meta name="description" content="Quizz with React and Typescript" />
      <meta name="theme-color" content="#F4F4F4" />
      <link rel="canonical" href="http://localhost:4200" />
      <title>Quizz</title>
    </Helmet>
    <GeoExercise />
  </>
);
