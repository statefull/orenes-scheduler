import React from "react";
import SchedulerManager from "../utils/SchedulerManager";
import { TURNS } from "../utils/scheduler";
import CalendarView from "./CalendarView";
import { Button, Grid } from "semantic-ui-react";

export default function MonthView(props) {
  const schedulerManager = new SchedulerManager(props.configurations);

  const addDayInfo = ({ date }) => {
    const sch = schedulerManager.getSchedulerForDay(
      date.getDate(),
      date.getMonth(),
      date.getFullYear()
    );

    const turn = sch
      ? sch.getDay(date.getDate(), date.getMonth(), date.getFullYear()).turn
      : null;

    const className =
      turn === null
        ? "disabled"
        : turn === TURNS.FREE
        ? "free"
        : turn === TURNS.MORNING
        ? "morning"
        : "evening";

    return className;
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
            tileClassName={addDayInfo}
            startDate={schedulerManager.getFirstScheduler().getSchedulerDate()}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
