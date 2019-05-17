import React, { useState } from "react";
import CalendarView from "./CalendarView";
import { Dropdown, Button, Container, Grid } from "semantic-ui-react";
import { TURNS } from "../utils/scheduler";
import ConfigurationView from "./ConfigurationView";

export default function Configuration(props) {
  const [dateConf, setDateConf] = useState(new Date());
  const [daysInCicle, setDaysInCicle] = useState(4);
  const [restDays, setRestDays] = useState(2);
  const [turnCicle, setTurnCicle] = useState(TURNS.MORNING);
  const [configurations, setConfigurations] = useState(
    props.configurations ? props.configurations : []
  );

  const onChangeDate = date => setDateConf(date);
  const onChangeWorkingDays = ({ value }) => setDaysInCicle(value);
  const onChangeRestDays = ({ value }) => setRestDays(value);
  const onChangeTurn = ({ value }) => setTurnCicle(value);
  const onSaveConfiguration = () => {
    const confs = [...configurations];

    confs.push({
      date: dateConf,
      workingDays: daysInCicle,
      restDays: restDays,
      turn: turnCicle
    });

    setConfigurations(confs);
  };

  const onRemoveConfiguration = index => {
    const confs = [...configurations];

    confs.splice(index, 1);

    setConfigurations(confs);
  };

  const numberOfDays = [
    {
      key: 1,
      value: 1,
      text: 1
    },
    {
      key: 2,
      value: 2,
      text: 2
    },
    {
      key: 3,
      value: 3,
      text: 3
    },
    {
      key: 4,
      value: 4,
      text: 4
    },
    {
      key: 5,
      value: 5,
      text: 5
    },
    {
      key: 6,
      value: 6,
      text: 6
    },
    {
      key: 7,
      value: 7,
      text: 7
    }
  ];

  const turns = [
    {
      key: TURNS.MORNING,
      value: TURNS.MORNING,
      text: "Mañanas"
    },
    {
      key: TURNS.EVENING,
      value: TURNS.EVENING,
      text: "Tardes"
    }
  ];

  return (
    <Container textAlign="center">
      <Grid verticalAlign="middle" columns={2}>
        <Grid.Row columns={1}>
          <Grid.Column>
            <h1>Elige el primer día de inicio de un ciclo</h1>
            <CalendarView
              className="scheduler-center-align"
              onChange={onChangeDate}
              date={dateConf}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="right">
            ¿Cuántos días laborables tiene el ciclo?
          </Grid.Column>
          <Grid.Column textAlign="left">
            <Dropdown
              selection
              options={numberOfDays}
              value={daysInCicle}
              onChange={(evt, data) => onChangeWorkingDays(data)}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="right">
            ¿Qué turno tiene el ciclo?
          </Grid.Column>
          <Grid.Column textAlign="left">
            <Dropdown
              selection
              options={turns}
              value={turnCicle}
              onChange={(evt, data) => onChangeTurn(data)}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="right">
            ¿Cuántos días festivos tiene el ciclo?
          </Grid.Column>
          <Grid.Column textAlign="left">
            <Dropdown
              selection
              options={numberOfDays}
              value={restDays}
              onChange={(evt, data) => onChangeRestDays(data)}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Button primary size="large" onClick={onSaveConfiguration}>
              Añadir
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              secondary
              size="large"
              disabled={!configurations.length}
              onClick={() => props.onExit(configurations)}
            >
              Siguiente
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <h1>Configuración actual</h1>
            {configurations.length ? (
              <ConfigurationView
                configurations={configurations}
                onRemoveConfiguration={onRemoveConfiguration}
              />
            ) : (
              <span>No hay configuración</span>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
