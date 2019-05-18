import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';

export default function Captcha(props) {
  const createAppVerifier = (appVerifier) => {
    appVerifier && appVerifier.clear();

    const newAppVerifier = new props.firebase.auth.RecaptchaVerifier('captcha', {
      size: 'normal',
      callback: (_) => props.onCaptchaValid && props.onCaptchaValid(newAppVerifier),
      'expired-callback': () => createAppVerifier(newAppVerifier),
    });

    newAppVerifier.render();
  };

  useEffect(() => {
    createAppVerifier();
  }, [props.firebase]);

  return <Container id="captcha" textAlign="center" />;
}
