import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainRouter from '@src/MainRouter';
import chapterOneOne from '@src/1-1';

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={MainRouter} />
      <Route path="/1-1" Component={chapterOneOne} />
    </Routes>
  );
};

export default App;
