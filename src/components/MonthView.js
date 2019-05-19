import React from 'react';
import SchedulerManager from '../utils/SchedulerManager';
import { TURNS } from '../utils/scheduler';
import CalendarView from './CalendarView';
import { Grid, Label } from 'semantic-ui-react';

export default function MonthView(props) {
  const schedulerManager = new SchedulerManager(props.configurations);

  const addDayInfo = ({ date }) => {
    const sch = schedulerManager.getSchedulerForDay(
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    );

    const turn = sch ? sch.getDay(date.getDate(), date.getMonth(), date.getFullYear()).turn : null;

    const className =
      turn === null
        ? 'disabled'
        : turn === TURNS.FREE
        ? 'free'
        : turn === TURNS.MORNING
        ? 'morning'
        : turn === TURNS.EVENING
        ? 'evening'
        : 'partial';

    return className;
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <CalendarView
            tileClassName={addDayInfo}
            startDate={schedulerManager.getFirstScheduler().getSchedulerDate()}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Label circular className="morning" empty key="morning" />
          Mañanas
          <Label circular className="evening" empty key="evening" />
          Tardes
          <Label circular className="partial" empty key="partial" />
          Partido
          <Label circular className="free" empty key="free" />
          Libre
          <Label circular className="disabled" empty key="disabled" />
          sin información
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
