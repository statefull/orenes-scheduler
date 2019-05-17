import React from "react";
import { Card, Button } from "semantic-ui-react";
import { TURNS } from "../utils/scheduler";

export default function ConfigurationView(props) {
  const configurations = props.configurations.map((conf, index) => {
    return (
      <Card key={index}>
        <Card.Content>
          <Card.Header>Ciclo {index + 1}</Card.Header>
          <Card.Meta>
            {index + 1}/{props.configurations.length}
          </Card.Meta>
          <Card.Description>
            <p>
              Fecha:
              <strong>
                {conf.date.getDate()}/{conf.date.getMonth() + 1}/
                {conf.date.getFullYear()}
              </strong>
            </p>
            <p>
              Turno:
              <strong>
                {conf.turn === TURNS.MORNING ? "mañanas" : "tardes"}
              </strong>
            </p>
            <p>
              Días laborables:
              <strong>{conf.workingDays}</strong>
            </p>
            <p>
              Días de descanso:
              <strong>{conf.restDays}</strong>
            </p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              basic
              color="red"
              onClick={() => props.onRemoveConfiguration(index)}
            >
              Eliminar
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  });

  return <Card.Group centered>{configurations}</Card.Group>;
}
