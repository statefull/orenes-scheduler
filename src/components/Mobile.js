import React, { useState } from 'react';
import { Container, Modal, Button, Icon, Input } from 'semantic-ui-react';
import Captcha from './Captcha';
import is from 'is_js';

const IS_PHONE_NUMBER = /\+346\d{8}$/;

export default function Mobile(props) {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [isSMSSent, setIsSMSSent] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [phoneCode, setPhoneCode] = useState(null);

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
      .then(function(result) {
        // User signed in successfully.

        console.log('VALID', result);
      })
      .catch(function(error) {
        // User couldn't sign in (bad verification code?)
        console.log('INVALID', error);
      });
  };

  const saveCode = (code) => setPhoneCode(code);

  const onCaptchaValid = (newAppVerifier) => onSignInSubmit(newAppVerifier);

  return (
    <Container>
      <Button size="massive" onClick={() => setOpenModal(true)}>
        <Icon name="mobile alternate" />
        Recibe un código en tú móvil
      </Button>
      <Modal dimmer="blurring" closeOnDimmerClick={false} open={openModal} size="tiny">
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            {isPhoneNumberValid ? (
              !isSMSSent ? (
                <Captcha firebase={props.firebase} onCaptchaValid={onCaptchaValid} />
              ) : (
                <Container>
                  <Input onChange={(event, { value }) => saveCode(value)} />
                  <Button onClick={checkAccessCode}>Verficar código</Button>
                </Container>
              )
            ) : (
              <Container>
                <Input
                  label="+34"
                  placeholder="Introduce tu número de móvil"
                  onChange={(event, { value }) => checkPhoneAdded(value)}
                />
              </Container>
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpenModal(false)}>
            Cerrar
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
}
