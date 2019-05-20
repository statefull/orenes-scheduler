import React, { useState } from 'react';
import { Tab, Container } from 'semantic-ui-react';
import Configuration from './Configuration';
import MonthView from './MonthView';

export default function Logged(props) {
  const [configurations, setConfigurations] = useState(props.data);
  const [activeIndex, setActiveIndex] = useState(0);

  const onExitConfiguring = (confs) => {
    setConfigurations(confs);
    props.database.setConfigurationsToUser(props.userUid, confs);
    confs.length === 0 && setActiveIndex(0);
  };

  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);

  const panes = [
    {
      menuItem: 'Configuración',
      render: () => (
        <Tab.Pane>
          <Configuration onExit={onExitConfiguring} configurations={configurations} />
        </Tab.Pane>
      ),
    },
  ];

  if (configurations.length !== 0) {
    panes.push({
      menuItem: 'Horario',
      render: () => (
        <Tab.Pane>
          <MonthView configurations={configurations} />
        </Tab.Pane>
      ),
    });
    panes.push({
      menuItem: 'Ciclos configurados',
      render: () => (
        <Tab.Pane>
          <Configuration onExit={onExitConfiguring} configurations={configurations} view={true} />
        </Tab.Pane>
      ),
    });
  }

  return (
    <Container fluid className="scheduler-container-logged">
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
    </Container>
  );
}
