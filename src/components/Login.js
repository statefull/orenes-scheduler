import React, { useState } from 'react';
import { Container, Grid, Header, Button, Input } from 'semantic-ui-react';
import Email from 'components/Email';
import Captcha from 'components/Captcha';

const IS_PHONE_NUMBER = /\+346\d{8}$/;

export default function Login(props) {
  const [isMobile, setIsMobile] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [phoneCode, setPhoneCode] = useState(null);
  const [isSMSSent, setIsSMSSent] = useState(false);

  const onLoginSuccess = (user) => props.onLoginSuccess && props.onLoginSuccess(user);
  const onLoginFail = (error) => props.onLoginFail && props.onLoginFail(error);

  const onSignInSubmit = (appVerifier) => {
    props.firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setIsSMSSent(true);
      })
      .catch(function(error) {
        appVerifier.render().then((widgetId) => {
          props.firebase.auth.grecaptcha.reset(widgetId);
        });

        isSMSSent && setIsSMSSent(false);
      });
  };

  const checkPhoneAdded = (phone) => {
    const updatedPhone = `+34${phone.trim()}`;

    if (IS_PHONE_NUMBER.test(updatedPhone)) {
      setPhoneNumber(updatedPhone);
      setIsPhoneNumberValid(true);
    }
  };

  const checkAccessCode = () => {
    window.confirmationResult
      .confirm(phoneCode)
      .then((result) => onLoginSuccess(result))
      .catch((error) => onLoginFail(error));
  };

  const saveCode = (code) => setPhoneCode(code);

  const onCaptchaValid = (newAppVerifier) => onSignInSubmit(newAppVerifier);

  return (
    <Container className="scheduler-login" textAlign="center">
      <Grid>
        {!isMobile ? (
          <Grid.Row>
            <Grid.Column>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h1" className="scheduler-login-header">
                    Inicia sessión
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button.Group>
                    <Email
                      firebase={props.firebase}
                      onLoginSuccess={onLoginSuccess}
                      onLoginFail={onLoginFail}
                    />
                    <Button.Or />
                    <Button
                      size="massive"
                      onClick={() => setIsMobile(true)}
                      icon="mobile alternate"
                    />
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        ) : !isPhoneNumberValid ? (
          <Grid.Row>
            <Grid.Column>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h1" className="scheduler-login-header">
                    Introduce tu número de móvil
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Input label="+34" onChange={(event, { value }) => checkPhoneAdded(value)} />
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        ) : !isSMSSent ? (
          <Grid.Row>
            <Grid.Column>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h1" className="scheduler-login-header">
                    Verifica que eres humano
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Captcha firebase={props.firebase} onCaptchaValid={onCaptchaValid} />
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        ) : (
          <Grid.Row>
            <Grid.Column>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h1" className="scheduler-login-header">
                    Introduce el código de verificación
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Input onChange={(event, { value }) => saveCode(value)} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button size="huge" onClick={checkAccessCode}>
                    Verificar código
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Container>
  );
}
