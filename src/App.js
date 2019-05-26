import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from 'components/Login';
import Logged from 'components/Logged';
import Database from 'utils/database';
import { parseConfigurations } from 'utils/parsers';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import 'style/style.less';

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

const database = new Database(firebase);

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userUid, setUserUid] = useState(null);
  const [data, setData] = useState([]);

  const onLoginSuccess = ({ user }) => {
    database
      .getConfigurationsbyUser(user.uid)
      .then(({ configs }) => {
        setData(parseConfigurations(configs));
        setUserUid(user.uid);
        setIsLogged(true);
      })
      .catch(() => {
        setUserUid(user.uid);
        setIsLogged(true);
      });
  };

  return (
    <>
      {isLogged ? (
        <Logged
          firebase={firebase}
          onLoginSuccess={onLoginSuccess}
          userUid={userUid}
          data={data}
          database={database}
        />
      ) : (
        <Login firebase={firebase} onLoginSuccess={onLoginSuccess} />
      )}
    </>
  );
}

export default App;
