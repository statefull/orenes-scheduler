import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Logged from './components/Logged';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './style/configuration.css';
import './style/calendarView.css';
import './style/login.css';
import './style/logged.css';
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
  const [isLogged, setIsLogged] = useState(false);

  const onLoginSuccess = (user) => {
    setIsLogged(true);
  };

  return (
    <Container>
      {isLogged ? (
        <Logged firebase={firebase} onLoginSuccess={onLoginSuccess} />
      ) : (
        <Login firebase={firebase} onLoginSuccess={onLoginSuccess} />
      )}
    </Container>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
