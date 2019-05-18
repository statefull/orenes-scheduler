import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default function Email(props) {
  const openPopup = () => {
    props.firebase
      .auth()
      .signInWithPopup(new props.firebase.auth.GoogleAuthProvider())
      .then((result) => props.onLoginSuccess && props.onLoginSuccess(result))
      .catch((error) => props.onLoginError && props.onLoginError(error));
  };

  return (
    <Button color="google plus" size="massive" onClick={openPopup}>
      <Icon name="google" /> Google
    </Button>
  );
}
