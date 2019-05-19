import React from 'react';
import { Container, Grid, Icon } from 'semantic-ui-react';
import Email from './Email';
import Mobile from './Mobile';

export default function Login(props) {
  const onLoginSuccess = (user) => props.onLoginSuccess && props.onLoginSuccess(user);
  const onLoginFail = (error) => props.onLoginFail && props.onLoginFail(error);

  return (
    <Container className="scheduler-login" textAlign="center">
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Icon name="user circle" size="massive" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Email
              firebase={props.firebase}
              onLoginSuccess={onLoginSuccess}
              onLoginFail={onLoginFail}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Mobile
              firebase={props.firebase}
              onLoginSuccess={onLoginSuccess}
              onLoginFail={onLoginFail}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
