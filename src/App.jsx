// src/App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/404';
import Spinner from './components/Spinner';

const Home = lazy(() => import('./pages/Home'));
const AddCitizen = lazy(() => import('./pages/AddCitizen'));
const CitizenList = lazy(() => import('./pages/CitizenList'));

function App() {
  return (
    <div>
      <Header />
      <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/citizens' element={<CitizenList />} />
            <Route path='/create' element={<AddCitizen />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
