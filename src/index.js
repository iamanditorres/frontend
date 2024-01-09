import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
// import { WorkoutsContextProvider } from './context/WorkoutContext';
import { TweetsContextProvider } from './context/TweetContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TweetsContextProvider>
      <App />
    </TweetsContextProvider>
  </React.StrictMode>
);