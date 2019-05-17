import React, { useState } from "react";
import Scheduler, { TURNS } from "../utils/scheduler";
import CalendarView from "./CalendarView";
import { Button, Grid } from "semantic-ui-react";

export default function PrincipalView(props) {
  const [currentScheduler, setCurrentScheduler] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  let schedulers = {};

  props.configurations.forEach(conf => {
    const timestamp = new Date(
      conf.date.getFullYear(),
      conf.date.getMonth(),
      conf.date.getDate()
    ).getTime();

    schedulers[timestamp] = new Scheduler(
      conf.date,
      conf.turn,
      conf.workingDays,
      conf.restDays
    );
  });

  const onChange = date => {
    const sch = findScheduler(
      schedulers,
      date.getDate(),
      date.getMonth(),
      date.getFullYear()
    );

    setCurrentScheduler(sch);

    sch
      ? setCurrentDay(
          sch.getDay(date.getDate(), date.getMonth(), date.getFullYear())
        )
      : setCurrentDay(null);
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column textAlign="right">
          <Button circular icon="setting" onClick={props.onConfigure} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <CalendarView onChange={onChange} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          {currentDay ? (
            <GetDay day={currentDay} />
          ) : (
            "No hemos encontrado un ciclo para este día"
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function GetDay(props) {
  return (
    <p>
      <span>Day: {props.day.day}</span>
      <span>
        {props.day.turn === undefined
          ? "Descanso"
          : props.day.turn === 0
          ? "Mañanas"
          : "Tardes"}
      </span>
    </p>
  );
}

function findScheduler(schedulers, day, month, year) {
  const dateTime = new Date(year, month, day).getTime();
  const sch = Object.keys(schedulers).filter(key => key <= dateTime);

  const scheduler = sch.length
    ? sch.reduce((max, current) => (max > current ? max : current), sch[0])
    : null;

  const theScheduler = scheduler ? schedulers[scheduler] : null;

  return theScheduler;
}
