import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainRouter from '@src/MainRouter';
import chapterOneOne from '@src/1-1';
import chapterOneThree from '@src/1-3';
import chapterOneFour from './src/1-4';

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={MainRouter} />
      <Route path="/1-1" Component={chapterOneOne} />
      <Route path="/1-3" Component={chapterOneThree} />
      <Route path="/1-4" Component={chapterOneFour} />
    </Routes>
  );
};

export default App;
