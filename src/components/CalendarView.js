import React, { useState } from "react";
import Calendar from "react-calendar";

export default function CalendarView(props) {
  const [date, setDate] = useState(props.date);

  const onChange = date => {
    setDate(date);
    props.onChange && props.onChange(date);
  };

  return (
    <Calendar
      className="app-center-align"
      onChange={onChange}
      value={date}
      activeStartDate={props.startDate}
      tileClassName={props.tileClassName}
      view={props.view}
    />
  );
}
