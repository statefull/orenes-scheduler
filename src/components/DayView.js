import React, { useState } from 'react';
import SchedulerManager from '../utils/SchedulerManager';
import CalendarView from './CalendarView';
import { Button, Grid } from 'semantic-ui-react';

export default function DayView(props) {
  const [currentDay, setCurrentDay] = useState(null);

  const schedulerManager = new SchedulerManager(props.configurations);

  const onChange = (date) => {
    const sch = schedulerManager.getSchedulerForDay(
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    );

    sch
      ? setCurrentDay(sch.getDay(date.getDate(), date.getMonth(), date.getFullYear()))
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
          <CalendarView
            onChange={onChange}
            minDate={schedulerManager.getFirstScheduler().getSchedulerDate()}
            startDate={schedulerManager.getFirstScheduler().getSchedulerDate()}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          {currentDay ? <GetDay day={currentDay} /> : 'No hemos encontrado un ciclo para este día'}
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
        {props.day.turn === undefined ? 'Descanso' : props.day.turn === 0 ? 'Mañanas' : 'Tardes'}
      </span>
    </p>
  );
}
