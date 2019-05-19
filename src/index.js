import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Configuration from './components/Configuration';
import DayView from './components/DayView';
import MonthView from './components/MonthView';
import Captcha from './components/Captcha';
import Email from './components/Email';
import Mobile from './components/Mobile';
import 'semantic-ui-css/semantic.min.css';
import './style/configuration.css';
import './style/calendarView.css';
import './style/app.css';

const firebase = require('firebase');

const firebaseConfig = {
  apiKey: 'AIzaSyAEmLf8HlMhi3KsVnOz5wWmzT_dVzsRo1U',
  authDomain: 'horario-43e7b.firebaseapp.com',
  databaseURL: 'https://horario-43e7b.firebaseio.com',
  projectId: 'horario-43e7b',
  storageBucket: 'horario-43e7b.appspot.com',
  messagingSenderId: '750092599551',
  appId: '1:750092599551:web:a74eedc4fed64b79',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().useDeviceLanguage();

function App() {
  const [configurations, setConfigurations] = useState([]);
  const [isConfiguring, setIsConfiguring] = useState(true);

  const onExitConfiguring = (confs) => {
    setConfigurations(confs);
    setIsConfiguring(false);
  };

  // return (
  //   <>
  //     <Email firebase={firebase} onLoginSuccess={(result) => console.log('email', result)} />
  //     <Mobile firebase={firebase} />{' '}
  //   </>
  // );
  return (
    <>
      {isConfiguring ? (
        <Configuration onExit={onExitConfiguring} configurations={configurations} />
      ) : (
        <MonthView onConfigure={() => setIsConfiguring(true)} configurations={configurations} />
      )}
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
